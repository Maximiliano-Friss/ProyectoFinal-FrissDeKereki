const pokemon1 = JSON.parse(localStorage.getItem('POKEMON_ELEGIDO'));
const pokemon2 = JSON.parse(localStorage.getItem('POKEMON_ENEMIGO'));
let {nombre, salud, poderes} = pokemon1;
const nombrePokemon1 = document.createElement('p');
nombrePokemon1.innerHTML = `${nombre}`;
nombrePokemon1.classList.add('p-pokemon1', 'animate__animated', 'animate__fadeInRight');
const nombrePokemon2 = document.createElement('p');
nombrePokemon2.innerHTML = `${pokemon2.nombre}`;
nombrePokemon2.classList.add('p-pokemon2', 'animate__animated', 'animate__fadeInLeft');
const USUARIO = localStorage.getItem('USUARIO');
const ENEMIGO = localStorage.getItem('ENEMIGO');
const imgUsuario = document.getElementById('battle-Usuario');
const imgEnemigo = document.getElementById('battle-Enemigo');
const pokeballsUsuario = document.getElementById('battle-pokeballs-usuario');
const pokeballsEnemigo = document.getElementById('battle-pokeballs-enemigo');
const containerInfoUsuario = document.getElementById('battle-container-infoUsuario');
const containerInfoEnemigo = document.getElementById('battle-container-infoEnemigo');
const infoUsuario = document.createElement('img');
infoUsuario.src = '../img/battleInfoUsuario.png';
infoUsuario.classList.add('animate__animated', 'animate__fadeInRight');

const vidaContainerUsuario = document.createElement('div');
const vidaContainerEnemigo = document.createElement('div');
vidaContainerUsuario.classList.add('vidaContainerUsuario');
vidaContainerEnemigo.classList.add('vidaContainerEnemigo');
const vidaUsuarioFilling = document.createElement('div');
const vidaEnemigoFilling = document.createElement('div');
vidaContainerUsuario.appendChild(vidaUsuarioFilling);
vidaContainerEnemigo.appendChild(vidaEnemigoFilling);
vidaUsuarioFilling.classList.add('vidaUsuarioFilling');
vidaEnemigoFilling.classList.add('vidaEnemigoFilling');

const infoEnemigo = document.createElement('img');
infoEnemigo.src = '../img/battleInfoEnemigo.png';
infoEnemigo.classList.add('animate__animated', 'animate__fadeInLeft');
const battleTexto = document.querySelector('.battle-texto');
const infoPoder = document.createElement('p');
const backPokemon1 = document.createElement('img');
backPokemon1.src = '';
backPokemon1.classList.add('battle-pokemon1', 'animate__animated', 'animate__fadeInUp');
const frontPokemon2 = document.createElement('img');
frontPokemon2.src = '';
frontPokemon2.classList.add('battle-pokemon2', 'animate__animated', 'animate__fadeInUp');
const battleContainer = document.querySelector('.battle-container');
const btnContinue = document.querySelector('.btn-Continue');
const msg0 = document.getElementById('msg-0');
let poder1 = '';
let poder2 = '';
let f1 = 1;
let f2 = 1;
let totalDamage1 = 0;
let totalDamage2 = 0;
btnContinue.style.cursor = 'pointer';
const pokemonVivos = () => vidaRestanteUsuario > 0 && vidaRestanteEnemigo > 0;
const poderAlAzar = (poke) => Math.floor(Math.random()*poke.poderes.length);

class barraVida {
    constructor (elemento, vidaRestante, vidaInicial, clase) {
        this.fillElemento = elemento.querySelector(clase);
        this.vidaJugador = vidaInicial;
        this.setValor(vidaRestante);   
        }
        setValor(nuevoValor) {
            if(nuevoValor < 0) {
                nuevoValor = 0;
            } else if(nuevoValor > 100) {
                nuevoValor = 100;
            } else if(nuevoValor <= 50 && nuevoValor > 25) {
                this.fillElemento.style.background = 'yellow';
            } else if(nuevoValor <= 25) {
                this.fillElemento.style.background = 'red';
            }

            this.valor = nuevoValor;
            this.actualizar();
        }
        actualizar() {
            const porcentaje = 100*(this.valor/this.vidaJugador) + '%';
            this.fillElemento.style.width = porcentaje;
        }
}

vidaRestanteUsuario = salud;
vidaRestanteEnemigo = pokemon2.salud;
const vida1 = new barraVida(vidaContainerUsuario, vidaRestanteUsuario, salud, '.vidaUsuarioFilling');
const vida2 = new barraVida(vidaContainerEnemigo, vidaRestanteEnemigo, pokemon2.salud, '.vidaEnemigoFilling');

const vidaPokemon1 = document.createElement('p');
vidaPokemon1.classList.add('p-vida1');
vidaPokemon1.innerHTML = `${vidaRestanteUsuario}/${salud}`;



start();

function start() {
    msg0.innerHTML = `${ENEMIGO} te ha desafiado a una batalla Pokémon!`;
    showPokemon();
}

function showPokemon() {
    btnContinue.onclick = () => {
    msg0.innerHTML = `${nombre} yo te elijo!`;
        imgUsuario.classList.add('animate__animated', 'animate__fadeOutLeft');
        imgEnemigo.classList.add('animate__animated', 'animate__zoomOutLeft');
        pokeballsUsuario.classList.add('animate__animated', 'animate__fadeOutRight');
        pokeballsEnemigo.classList.add('animate__animated', 'animate__fadeOutLeft');

        setTimeout(() => {
            imgUsuario.remove();
            imgEnemigo.remove();
            pokeballsUsuario.remove();
            pokeballsEnemigo.remove();

            async function showBack1() {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
                const data = await response.json();
                const {back_default} = data.sprites;
                backPokemon1.src = back_default;
                battleContainer.appendChild(backPokemon1);
            }
            showBack1();

            async function showFront2() {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2.nombre.toLowerCase()}`);
                const data = await response.json();
                const {front_default} = data.sprites;
                frontPokemon2.src = front_default;
                battleContainer.appendChild(frontPokemon2);
            }
            showFront2();

            containerInfoUsuario.appendChild(infoUsuario);
            containerInfoUsuario.appendChild(nombrePokemon1);
            containerInfoUsuario.appendChild(vidaContainerUsuario);
            containerInfoUsuario.appendChild(vidaPokemon1);
            containerInfoEnemigo.appendChild(infoEnemigo);
            containerInfoEnemigo.appendChild(nombrePokemon2);
            containerInfoEnemigo.appendChild(vidaContainerEnemigo);
            clearTextBox();
        }, 1000);
    }
}

function clearTextBox() {
    btnContinue.onclick = () => {
        btnContinue.remove();
        msg0.innerHTML = '';
        battleTexto.src = '../img/battlePoderesBox.png';
        juegaUsuario();  
    }
}

function clearPowers(){
    const infoPowers = document.querySelector('.p-infoPoder');
    const btnPower0 = document.querySelector('.btn-power-0');
    const btnPower1 = document.querySelector('.btn-power-1');
    const btnPower2 = document.querySelector('.btn-power-2');
    const btnPower3 = document.querySelector('.btn-power-3');
    infoPowers.remove();
    btnPower0.remove();
    btnPower1.remove();
    btnPower2.remove();
    btnPower3.remove();
}

function juegaEnemigo() {
    poder2 = pokemon2.poderes[poderAlAzar(pokemon2)];
    btnContinue.onclick = () => {
        msg0.innerHTML = `${pokemon2.nombre} enemigo usó ${poder2.identificador}!`;
        totalDamage2 = Math.round(f2*(poder2.damage/pokemon1.defensa));
        if(lograAtacar(poder2, pokemon2, ENEMIGO)){
            enemigoAtaca();
        } else {
            clearTextBox();
        }
    }
}

function enemigoAtaca() {
    btnContinue.onclick = () => {
        vidaRestanteUsuario -= totalDamage2;
        vidaRestanteUsuario = vidaRestanteUsuario > 0 ? vidaRestanteUsuario : 0;
        vida1.setValor(vidaRestanteUsuario);
        vidaPokemon1.innerHTML = `${vidaRestanteUsuario}/${salud}`;
        f1 *= poder2.efectoEnAtaqueEnemigo;
        pokemon2.defensa *= poder2.efectoEnDefensaPropia;
        poderes[poderAlAzar(pokemon1)].probabilidadExito *= poder2.efectoEnExitoEnemigo;
        msg0.innerHTML = `${nombre} recibe ${totalDamage2} de daño!`;
        checkStatus2();
    }
}

function usuarioAtaca() {
    btnContinue.onclick = () => {
        totalDamage1 = Math.round(f1*(poder1.damage/pokemon2.defensa));
        vidaRestanteEnemigo -= totalDamage1;
        vidaRestanteEnemigo = vidaRestanteEnemigo > 0 ? vidaRestanteEnemigo : 0;
        vida2.setValor(vidaRestanteEnemigo);
        f2 *= poder1.efectoEnAtaqueEnemigo;
        pokemon1.defensa *= poder1.efectoEnDefensaPropia;
        pokemon2.poderes[poderAlAzar(pokemon2)].probabilidadExito *= poder1.efectoEnExitoEnemigo;
        msg0.innerHTML = `${pokemon2.nombre} enemigo recibe ${totalDamage1} de daño!`;
        checkStatus1();
    }
}

function checkStatus1() {
    if(pokemonVivos()){
        juegaEnemigo();
    } else {
        batallaFinalizada();
    }
}

function checkStatus2() {
    if(pokemonVivos()){
        clearTextBox();
    } else {
        batallaFinalizada();
    }
}


function batallaFinalizada(){
    btnContinue.onclick = () => {
        msg0.innerHTML = `La batalla ha finalizado! ${salud > pokemon2.salud ? `${USUARIO} ha ganado!` : `${ENEMIGO} ha ganado!`}`;
        reiniciar();
    }
}

function juegaUsuario() {
    for (const poder of poderes){
        const btnPower = document.createElement('button');
        btnPower.innerHTML = poder.identificador;
        battleContainer.appendChild(btnPower);
        btnPower.classList.add(`btn-power-${poderes.indexOf(poder)}`);
    
        btnPower.onmouseover = () => {
            battleContainer.appendChild(infoPoder);
            infoPoder.classList.add('p-infoPoder');
            infoPoder.innerHTML = `TIPO: ${poder.type}`;
        }

        btnPower.onmouseleave = () => {
            infoPoder.innerHTML = '';
        }
    
        btnPower.onclick = () => {
            poder1 = poder;
            clearPowers();
            battleTexto.src = '../img/battleTextBox.png';
            msg0.innerHTML = `${nombre} usó ${poder1.identificador}!`;
            battleContainer.appendChild(btnContinue);
            if(lograAtacar(poder1, pokemon1, USUARIO)){
                usuarioAtaca();
            } else {
                juegaEnemigo();
            }
        }
    }
}

function lograAtacar(poder, poke, jugador){
    let fallar = Math.random();
    if(fallar < poder.probabilidadExito) {
            return true;
        } else {
            msg0.innerHTML = `${poke.nombre} de ${jugador} usó ${poder.identificador}... pero falló!`;
            return false;
    }
}

function reiniciar() {
    btnContinue.onclick = () => {
        swal({
            text: "Qué deseas hacer ahora?",
            icon: "success",
            buttons: ["Terminar", "Volver a empezar"],
        })
        .then((volverAEmpezar) => {
        if (volverAEmpezar) {
            location.href = "../index.html";
        } else {
            swal("Gracias por jugar Batalla Pokémon.");
        }
        });
    }
}
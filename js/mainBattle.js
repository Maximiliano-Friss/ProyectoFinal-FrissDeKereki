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
const battleTheme = new Audio('../audio/BattleMusic.mp3');
battleTheme.setAttribute('muted', 'muted');
battleTheme.setAttribute('autoplay', 'true');
const audioOff = document.querySelector('.audioOff');
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
let f1 = 1; //f1 y f2 son factores que afectan el ataque enemigo
let f2 = 1;
let t0 = 1; //t1 factor afectado por los tipos de ataques y pokemon
let totalDamage1 = 0;
let totalDamage2 = 0;
btnContinue.style.cursor = 'pointer';
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
const vidaPokemon2 = document.createElement('p');
vidaPokemon2.classList.add('p-vida2');
vidaPokemon2.innerHTML = `${vidaRestanteEnemigo}/${pokemon2.salud}`;
nombrePokemon1.classList.add('animate__animated', 'animate__fadeInRight');
vidaContainerUsuario.classList.add('animate__animated', 'animate__fadeInRight');
vidaPokemon1.classList.add('animate__animated', 'animate__fadeInRight');

nombrePokemon2.classList.add('animate__animated', 'animate__fadeInLeft');
vidaContainerEnemigo.classList.add('animate__animated', 'animate__fadeInLeft');
vidaPokemon2.classList.add('animate__animated', 'animate__fadeInLeft');

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
        pokeballsUsuario.classList.add('animate__animated', 'animate__zoomOutDown');
        pokeballsEnemigo.classList.add('animate__animated', 'animate__zoomOutDown');
        
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

        setTimeout(() => {
            imgUsuario.remove();
            imgEnemigo.remove();
            pokeballsUsuario.remove();
            pokeballsEnemigo.remove();
            containerInfoUsuario.appendChild(infoUsuario);
            containerInfoUsuario.appendChild(nombrePokemon1);
            containerInfoUsuario.appendChild(vidaContainerUsuario);
            containerInfoUsuario.appendChild(vidaPokemon1);
            containerInfoEnemigo.appendChild(infoEnemigo);
            containerInfoEnemigo.appendChild(nombrePokemon2);
            containerInfoEnemigo.appendChild(vidaContainerEnemigo);
            containerInfoEnemigo.appendChild(vidaPokemon2);
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

function efectoPorTipo(tipoDePoder, tipoDePokemonAtacado) {
    if(tipoDePoder == tipoDePokemonAtacado) {
        t0 = 1;
    } else {
        switch(tipoDePoder) {
            case 'FUEGO':
                switch(tipoDePokemonAtacado) {
                    case 'AGUA':
                        t0 = 0.5;
                        break;
                    case 'PLANTA':
                        t0 = 1.5;
                        break;
                };
                break;
            case 'AGUA':
                switch(tipoDePokemonAtacado) {
                    case 'PLANTA':
                        t0 = 0.5;
                        break;
                    case 'FUEGO':
                        t0 = 1.5;
                        break;
                };
                break;
            case 'PLANTA':
                switch(tipoDePokemonAtacado) {
                    case 'FUEGO':
                        t0 = 0.5;
                        break;
                    case 'AGUA':
                        t0 = 1.5;
                        break;
                };
                break;
        }
    }
}

function juegaEnemigo() {
    poder2 = pokemon2.poderes[poderAlAzar(pokemon2)];
    btnContinue.onclick = () => {
        msg0.innerHTML = `${pokemon2.nombre} enemigo usó ${poder2.identificador}!`;
        efectoPorTipo(poder2.type, pokemon1.tipo);
        totalDamage2 = Math.round(f2*t0*(poder2.damage/pokemon1.defensa));
        if(lograAtacar(poder2, pokemon2, ENEMIGO)){
            enemigoAtaca();
        } else {
            clearTextBox();
        }
    }
}

function enemigoAtaca() {
    btnContinue.onclick = () => {
        vidaUsuarioPreAtaque = vidaRestanteUsuario;
        vidaRestanteUsuario -= totalDamage2;
        vidaRestanteUsuario = vidaRestanteUsuario > 0 ? vidaRestanteUsuario : 0;
        vida1.setValor(vidaRestanteUsuario);
        reducirVida(vidaUsuarioPreAtaque, vidaRestanteUsuario, salud, vidaPokemon1);
        f1 *= poder2.efectoEnAtaqueEnemigo;
        pokemon2.defensa *= poder2.efectoEnDefensaPropia;
        poderes[poderAlAzar(pokemon1)].probabilidadExito *= poder2.efectoEnExitoEnemigo;
        msg0.innerHTML = `${nombre} recibe ${totalDamage2} de daño!`;
        checkStatus2();
    }
}

function usuarioAtaca() {
    btnContinue.onclick = () => {
        vidaEnemigoPreAtaque = vidaRestanteEnemigo;
        efectoPorTipo(poder1.type, pokemon2.tipo);
        totalDamage1 = Math.round(f1*t0*(poder1.damage/pokemon2.defensa));
        vidaRestanteEnemigo -= totalDamage1;
        vidaRestanteEnemigo = vidaRestanteEnemigo > 0 ? vidaRestanteEnemigo : 0;
        vida2.setValor(vidaRestanteEnemigo);
        reducirVida(vidaEnemigoPreAtaque, vidaRestanteEnemigo, pokemon2.salud, vidaPokemon2);
        f2 *= poder1.efectoEnAtaqueEnemigo;
        pokemon1.defensa *= poder1.efectoEnDefensaPropia;
        pokemon2.poderes[poderAlAzar(pokemon2)].probabilidadExito *= poder1.efectoEnExitoEnemigo;
        msg0.innerHTML = `${pokemon2.nombre} enemigo recibe ${totalDamage1} de daño!`;
        checkStatus1();
    }
}

function reducirVida(i, vidaActualizada, vidaInicial, elemento) {
    if (i >= vidaActualizada) {
        elemento.innerHTML = `${i}/${vidaInicial}`;
        setTimeout(function() {
            reducirVida(i - 1, vidaActualizada, vidaInicial, elemento);
        }, 20);
    }
}

function checkStatus1() {
    if(vidaRestanteEnemigo > 0){
        juegaEnemigo();
    } else {
        batallaFinalizada();
    }
}

function checkStatus2() {
    if(vidaRestanteUsuario > 0){
        clearTextBox();
    } else {
        batallaFinalizada();
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
            infoPoder.innerHTML = `TIPO: ${poder.type}
            <p class='p-infoPoder2'>${poder.descripcion}<p>`;
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

function batallaFinalizada(){
    btnContinue.onclick = () => {
        if(vidaRestanteUsuario > vidaRestanteEnemigo){
            msg0.innerHTML = `La batalla ha finalizado! ${USUARIO} ha ganado!`;
            frontPokemon2.classList.remove('animate__fadeInUp');
            frontPokemon2.classList.add('animate__fadeOutDown');
        }else{
            msg0.innerHTML = `La batalla ha finalizado! ${ENEMIGO} ha ganado!`;
            backPokemon1.classList.remove('animate__fadeInUp');
            backPokemon1.classList.add('animate__fadeOutDown');
        }
        reiniciar();
    }
}

function reiniciar(){
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

//MUSICA
audioOff.onclick = () => {
    const currentSound = localStorage.getItem('SOUND2');
    if (parseInt(currentSound) || currentSound === null) {
        localStorage.setItem('SOUND2', 0);
        battleTheme.pause()
        audioOff.setAttribute('src', '../img/audioOff.png');
    } else {
        localStorage.setItem('SOUND2', 1);
        battleTheme.play()
        audioOff.setAttribute('src', '../img/audioOn.png');
    }
};
audioOff.style.cursor = 'pointer';
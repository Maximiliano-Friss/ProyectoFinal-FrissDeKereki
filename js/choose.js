const mainContainer2 = document.getElementById('main-container2');
const logoPokemonContainer = document.getElementById('logoPokemon-container')
const theme = new Audio('../audio/RedTheme.mp3');
theme.setAttribute('muted', 'muted');
theme.setAttribute('autoplay', 'true');
const welcomeContainer = document.getElementById('welcome-container');
const welcomeContainerNombres = document.getElementById('welcome-container-nombres');
const footerContainer = document.getElementById('footer-container');
const audioOff = document.querySelector('.audioOff');
const logoPokemonImg = document.createElement('img');
const profOak = document.createElement('img');
const msgWelcome = document.createElement('p');
const btnNext = document.createElement('button');
const formularioNombres = document.createElement('form');
const inputUsuario = document.createElement('input');
const inputEnemigo = document.createElement('input');
const submitNombres = document.createElement('input');
const msgName = document.createElement('p');
const btnLab = document.createElement('button');
const labContainer = document.createElement('div');
const labContainerPokeballs = document.createElement('div');
const labContainerPokemon = document.createElement('div');
const labTitulo = document.createElement ('h2');
const labSubtitulo = document.createElement('p');
const labPokemonElegido = document.createElement('p');
labPokemonElegido.classList.add('lab-p-pokemonElegido');

//CLASE Poder

class Poder{
constructor(identificador, damage, type, probabilidadExito, efectoEnAtaqueEnemigo, efectoEnDefensaPropia, efectoEnExitoEnemigo) {
    this.identificador = identificador;
    this.damage = damage;
    this.type = type;
    this.probabilidadExito = probabilidadExito;
    this.efectoEnAtaqueEnemigo = efectoEnAtaqueEnemigo;
    this.efectoEnDefensaPropia = efectoEnDefensaPropia;
    this.efectoEnExitoEnemigo = efectoEnExitoEnemigo;
    }
}

//PODERES
const ASCUAS = new Poder('ASCUAS', 20, 'FUEGO', 0.95, 1, 1, 1);
const GRUNIDO = new Poder('GRUÑIDO', 0, 'NORMAL', 0.90, 0.95, 1, 1); //Baja ataque del enemigo. Se resta del ataque.
const LANZALLAMAS = new Poder('LANZALLAMAS', 31, 'FUEGO', 0.75, 1, 1, 1);
const CUCHILLADA = new Poder('CUCHILLADA', 15, 'NORMAL', 1, 1, 1, 1);
const PLACAJE = new Poder('PLACAJE', 18, 'NORMAL', 0.95, 1, 1, 1);
const BURBUJA = new Poder('BURBUJA', 22, 'AGUA', 0.92, 1, 1, 1);
const REFUGIO = new Poder('REFUGIO', 0, 'NORMAL', 0.9, 1, 1.1, 1);   //Aumenta la defensa propia.
const HIDROPULSO = new Poder('HIDROPULSO', 32, 'AGUA', 0.85, 1, 1, 0.95) //Baja prob Exito enemigo.
const LATIGO_CEPA = new Poder('LÁTIGO CEPA', 19, 'PLANTA', 0.94, 1, 1, 1);
const HOJA_AFILADA = new Poder('HOJA AFILADA', 15, 'PLANTA', 1, 1, 1, 1);

//CLASE Pokemon
class Pokemon{
    constructor(nombre, salud, defensa, tipo, probabilidadCritico, poderes, entrenador){
        this.nombre = nombre;
        this.salud = salud;
        this.defensa = defensa;
        this.tipo = tipo;
        this.probabilidadCritico = probabilidadCritico;
        this.poderes = poderes;
        this.entrenador = entrenador;
        this.source = `../img/choose${this.nombre}.gif`;
    }
}

const CHARMANDER = new Pokemon('CHARMANDER', 88, 1, 'FUEGO', 0.15, [ASCUAS, GRUNIDO, LANZALLAMAS, CUCHILLADA], localStorage.getItem('USUARIO'));
const CHARMANDER2 = new Pokemon('CHARMANDER', 88, 1, 'FUEGO', 0.15, [ASCUAS, GRUNIDO, LANZALLAMAS, CUCHILLADA], localStorage.getItem('ENEMIGO'));
const SQUIRTLE = new Pokemon ('SQUIRTLE', 90, 1, 'AGUA', 0.15, [PLACAJE, BURBUJA, REFUGIO, HIDROPULSO], localStorage.getItem('USUARIO'));
const SQUIRTLE2 = new Pokemon ('SQUIRTLE', 90, 1, 'AGUA', 0.15, [PLACAJE, BURBUJA, REFUGIO, HIDROPULSO], localStorage.getItem('ENEMIGO'));
const BULBASAUR = new Pokemon ('BULBASAUR', 89, 1, 'PLANTA', 0.15, [PLACAJE, GRUNIDO, LATIGO_CEPA, HOJA_AFILADA], localStorage.getItem('USUARIO'));
const BULBASAUR2 = new Pokemon ('BULBASAUR', 89, 1, 'PLANTA', 0.15, [PLACAJE, GRUNIDO, LATIGO_CEPA, HOJA_AFILADA], localStorage.getItem('ENEMIGO'));
const CHOOSE_POKEMON = [CHARMANDER, SQUIRTLE, BULBASAUR];
const OPCIONES_POKEMON = [CHARMANDER2, SQUIRTLE2, BULBASAUR2];

//SELECCION POKEMON ENEMIGO
const OPONENTE_AL_AZAR = Math.floor(Math.random()*OPCIONES_POKEMON.length);
localStorage.setItem('POKEMON_ENEMIGO', JSON.stringify(OPCIONES_POKEMON[OPONENTE_AL_AZAR]));



setTimeout(function () {
    logoPokemonImg.setAttribute('src', '../img/pokemonLogo.gif');
    logoPokemonContainer.appendChild(logoPokemonImg);
    logoPokemonImg.classList.add('animate__animated', 'animate__fadeInDown', 'animate__slower');
    
    setTimeout(function () {
        logoPokemonImg.classList.remove('animate__fadeInDown');
        logoPokemonImg.classList.add('animate__fadeOutDown');
    }, 7000);
    
    setTimeout(function () {
        logoPokemonContainer.remove();
        welcomeContainer.classList.add('cuadroGrande');
        mainContainer2.appendChild(welcomeContainerNombres);
        mainContainer2.appendChild(profOak);
        profOak.setAttribute('src', '../img/profOak.png');
        profOak.classList.add('profOak', 'animate__animated', 'animate__zoomIn');
        welcomeContainerNombres.appendChild(msgWelcome);
        msgWelcome.innerHTML = `Hola!<br>Soy el Profesor Oak.<br> Todo listo para comenzar?`;
        msgWelcome.classList.add('textos', 'animate__animated', 'animate__zoomIn');
        welcomeContainerNombres.appendChild(btnNext);
        btnNext.innerHTML = 'Continuar';
        btnNext.classList.add('textos', 'btn-Next', 'animate__animated', 'animate__zoomIn');
    }, 10000);
}, 4000);

btnNext.addEventListener('click', () => {
    msgWelcome.classList.remove('animate__zoomIn');
    btnNext.classList.remove('animate__zoomIn');
    msgWelcome.classList.add('animate__zoomOut');
    btnNext.classList.add('animate__zoomOut');
    logoPokemonImg.remove();

    setTimeout(function () {
        msgWelcome.remove();
        btnNext.remove();
        welcomeContainerNombres.appendChild(formularioNombres);
        formularioNombres.appendChild(inputUsuario);
        formularioNombres.appendChild(inputEnemigo);
        formularioNombres.appendChild(submitNombres);
        inputUsuario.type = 'text';
        inputUsuario.id = 'nombreUsuario';
        inputUsuario.placeholder = 'Tu nombre';
        inputUsuario.required = true;
        inputUsuario.className = 'inputNombres';
        inputUsuario.autocomplete = "off";
        inputEnemigo.type = 'text';
        inputEnemigo.id = 'nombreEnemigo';
        inputEnemigo.placeholder = 'Nombre de tu oponente';
        inputEnemigo.required = true;
        inputEnemigo.className = 'inputNombres';
        inputEnemigo.autocomplete = "off";
        submitNombres.type = 'submit';
        submitNombres.id = 'btn-submit';
        submitNombres.value = 'Continuar';
        submitNombres.className = 'btn-Next';
    },1000);
});

formularioNombres.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const nombreUsuario = document.getElementById('nombreUsuario').value.toUpperCase();
    const nombreEnemigo = document.getElementById('nombreEnemigo').value.toUpperCase();
    localStorage.setItem('USUARIO', nombreUsuario);
    localStorage.setItem('ENEMIGO', nombreEnemigo);
    inputUsuario.classList.add('animate__animated', 'animate__fadeOutDown');
    inputEnemigo.classList.add('animate__animated', 'animate__fadeOutDown');
    submitNombres.classList.add('animate__animated', 'animate__fadeOutDown');

    setTimeout(function () {
        formularioNombres.remove();
        welcomeContainerNombres.appendChild(msgName);
        welcomeContainerNombres.appendChild(btnLab);
        msgName.classList.add('textos', 'animate__animated', 'animate__zoomIn');
        btnLab.classList.add('btn-Next', 'animate__animated', 'animate__zoomIn');
        msgName.innerHTML = `Te doy la bienvenida ${localStorage.getItem('USUARIO')}! <br> Todo listo para seleccionar<br>a tu Pokémon?`;
        btnLab.innerHTML = 'Ir al laboratorio';
    }, 1800);
}, 1500);

btnLab.onclick = () => {
    msgName.classList.remove('animate__zoomIn');
    btnLab.classList.remove('animate__zoomIn');
    profOak.classList.remove('animate__zoomIn');
    msgName.classList.add('animate__zoomOut');
    btnLab.classList.add('animate__zoomOut');
    profOak.classList.add('animate__zoomOut');

    setTimeout(function () {
        welcomeContainerNombres.remove();
        profOak.remove();
        welcomeContainer.classList.remove('cuadroGrande');
        welcomeContainer.classList.add('cuadroGrandeLab', 'animate__animated', 'animate__fadeIn');

        setTimeout(function(){
            mainContainer2.appendChild(labContainer);
            mainContainer2.appendChild(labContainerPokemon);
            labContainer.appendChild(labContainerPokeballs);
            labContainer.appendChild(labTitulo);
            labTitulo.innerHTML = 'Escoge una Poké Ball';
            labTitulo.classList.add('textos');
            labContainer.classList.add('lab-container', 'animate__animated', 'animate__fadeIn');
            labContainerPokemon.classList.add('lab-container-pokemon', 'animate__animated', 'animate__fadeIn');
            labContainerPokeballs.classList.add('lab-container-pokeballs', 'animate__animated', 'animate__fadeIn');
            mostrarPokeballs();
        }, 1000);
    }, 1800);
}

function mostrarPokeballs() {
    for(const pok of CHOOSE_POKEMON) {
        const imgPokeball = document.createElement('img');
        imgPokeball.src = '../img/choosepokeball.png';
        labContainerPokeballs.appendChild(imgPokeball);
        
        imgPokeball.onmouseenter = () => {
            imgPokeball.style.cursor = 'pointer';
            labContainerPokemon.innerHTML ='';
            imgPokeball.classList.add('animate__animated', 'animate__bounce');
            const imgPokemon = document.createElement('img');
            imgPokemon.src = pok.source;
            imgPokemon.classList.add('animate__animated', 'animate__bounceIn');
            labContainerPokemon.appendChild(imgPokemon);
            mainContainer2.appendChild(labPokemonElegido);
            labPokemonElegido.innerHTML = `Haz click para escoger a ${pok.nombre}!`;
        }

        imgPokeball.onmouseleave = () => {
            imgPokeball.classList.remove('animate__animated', 'animate__bounce');
            labPokemonElegido.innerHTML = '';
        }

        imgPokeball.onclick = () => {

            const fadeTheme = setInterval(() => {
                if (theme.volume >= 0.2) {
                    theme.volume -= 0.2;
                }
                else {
                    clearInterval(fadeTheme);
                    location.href = "./battle.html";
                    localStorage.setItem('POKEMON_ELEGIDO', JSON.stringify(pok));
                }
            }, 200);
        }
    }
}

//MUSICA

audioOff.onclick = () => {
    const currentSound = localStorage.getItem('SOUND');
    if (parseInt(currentSound) || currentSound === null) {
        localStorage.setItem('SOUND', 0);
        theme.pause()
        audioOff.setAttribute('src', '../img/audioOff.png');
    } else {
        localStorage.setItem('SOUND', 1);
        theme.play()
        audioOff.setAttribute('src', '../img/audioOn.png');
    }
};
audioOff.style.cursor = 'pointer';
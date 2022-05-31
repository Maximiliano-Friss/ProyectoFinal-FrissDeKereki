const pokeballSound = new Audio('../audio/pokeballSoundEffect.mp3');
const footerContainer = document.getElementById('footer-container');
const circleNegro = document.getElementById('circle-negro');
const circleBlanco = document.getElementById('circle-blanco');
const pokeballRojo = document.getElementById('pokeball-rojo');
const pokeballNegro = document.getElementById('pokeball-negro');
const pokeballBlanco = document.getElementById('pokeball-blanco');
const btnPokeball = document.getElementById('btn-pokeball');


btnPokeball.addEventListener('click', () => {
    pokeballSound.play();
    circleNegro.classList.add('animate__animated', 'animate__bounceOut');
    btnPokeball.classList.add('animate__animated', 'animate__bounceOut');
    circleBlanco.classList.add('animate__animated', 'animate__bounceOut');
    setTimeout(function () {
        pokeballRojo.classList.add('animate__animated', 'animate__fadeOutUp');
        pokeballNegro.classList.add('animate__animated', 'animate__fadeOutRightBig');
        pokeballBlanco.classList.add('animate__animated', 'animate__fadeOutDown');
    }, 1000);
    setTimeout(function () {
        pokeballNegro.remove();
        pokeballBlanco.remove();
    }, 1800);
    setTimeout(function () {
        location.href = "./pages/choose.html";
    }, 3000);
});

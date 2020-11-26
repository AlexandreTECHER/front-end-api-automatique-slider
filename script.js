window.addEventListener("DOMContentLoaded", (event) => {

    ////////////// Elements nécessaire pour obtenir la date et l'heure.

    let dateContainer = document.querySelector(".date #date");
    let hourContainer = document.querySelector(".date #hour");
    let ladate = new Date();
    dateContainer.innerHTML = "Nous sommes le : " + ladate.getDate() + " / " + (ladate.getMonth() + 1) + " / " + ladate.getFullYear();
    hourContainer.innerHTML = "Il est actuellement : " + ladate.getHours() + " h " + ladate.getMinutes();


    ////////////// Elements nécessaire pour obtenir la météo du jour.

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Lyon&appid=01e60162006c3ac9666560e3e0944887')
        .then(function (response) {
            if(response.ok){
                return response.json();
            }
        })
        .then(function (data) {
            let weatherPicture = document.querySelector('.meteo');
            let currentWeather = data.weather[0].main;

            let newPic = document.createElement('img');
            if(currentWeather = 'Mist'){
                newPic.setAttribute('src', 'pics/fog.png');
            }else{
                newPic.setAttribute('src', 'pics/' + currentWeather.toLowerCase() + '.png');
            }
            newPic.setAttribute('alt', 'temps actuel à Lyon');
            newPic.setAttribute('width', '100%');
            weatherPicture.appendChild(newPic);

        })  

    
    
});

////////////// Elements nécessaire pour créer le carousel.

let slideIndex = 0;

function carousel(){

    let carouselSpan = document.querySelectorAll('.slide');
    let videoClass = document.querySelector('.slide.video');
    let webcamClass = document.querySelector('.slide.webcam');
    let webCamPicture = document.querySelector('.webcam-pic');

    if(webCamPicture.classList.contains('transform')){
        webCamPicture.classList.remove('transform');
    }

    for(let i = 0; i < carouselSpan.length; i++){
        carouselSpan[i].style.display = 'none';
    }

    slideIndex++;

    if(slideIndex > carouselSpan.length) {
        slideIndex = 1;
    }
    
    // console.log(slideIndex); Index érroné lors du deuxième cycle du slider 

    carouselSpan[slideIndex - 1].style.display = 'block';

    let setTime = setTimeout(carousel, 15000);
    
    if(carouselSpan[slideIndex - 1].classList == videoClass.classList){

        // Si les classes de l'élément retournées par le tableau carouselSpan, sont similaires à videoClass, cela signifie, qu'il s'agit du container où se situe la vidéo, je stop le délai initialisé, le temps de la vidéo.
        clearTimeout(setTime);

        // Script dédié à l'affichage de la vidéo hébergée sur youtube. 
        // Documentation : https://developers.google.com/youtube/iframe_api_reference?hl=fr

        onYouTubeIframeAPIReady()
  
        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '260',
                width: '480',
                videoId: 'nLv3FTdhGWA',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
  
        function onPlayerReady(event) {
            event.target.playVideo();
        }
  
        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                resetDelay();
                setTimeout(destroyVideo, 15000);
            }
        }

        function destroyVideo(){
            player.destroy()
        }

        function resetDelay(e) {
            setTimeout(carousel, 15000);
        }
    }

    if(carouselSpan[slideIndex - 1].classList == webcamClass.classList){

        // Le container étant de base initié à "none", il est nécessaire d'initier le déclenchement de l'animation seulement lorsque le statut du container est renseigné comme "block", (le DOM doit avoir terminé son travail, sinon l'animation ne sera pas prise en compte).
        window.setTimeout(function(){
            webCamPicture.classList.add('transform'); // J'ajoute la classe "transform" contenant l'animation voulue, définie dans "style.css"
        }, 50);
    }
    
}

carousel();

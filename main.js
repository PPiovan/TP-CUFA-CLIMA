const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');


search.addEventListener('click', () => {
    const APIKey = '899b64acf3b986f8660e32e13fe9a456';
    const city = document.querySelector('.search-box input').value;
    if(city === '') 
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '555px';
            error404.classList.remove('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');





            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description= document.querySelector('.weather-box .description');
            const humidity= document.querySelector('.weather-details .humidity span');
            const wind= document.querySelector('.weather-details .wind span');
        
        

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'imgs/yellow-sun.png';
                    break;
                case 'Rain':
                    image.src = 'imgs/lluvia.png';
                    break;
                case 'Snow':
                    image.src = 'imgs/nieve.png';
                    break;
                case 'Clouds':
                    image.src = 'imgs/nublado.png';
                    break;
                case 'Mist':
                    image.src = 'imgs/niebla.png';
                    break;
                case 'Thunderstorm':
                    image.src = 'imgs/tormenta.png';
                    break;
                default:
                    image.src = 'imgs/yellow-sun.png';
                
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
           

            
        });
});
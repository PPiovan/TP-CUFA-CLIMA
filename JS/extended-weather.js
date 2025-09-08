const container = document.querySelector('.extended-weather-container');
const APIKey = 'TZDYGMAETJPQ3VZHZAMJAAFMC';
const lastLat = localStorage.getItem('lastLat');
const lastLon = localStorage.getItem('lastLon');

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lastLat},${lastLon}?unitGroup=metric&lang=es&key=${APIKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const totalDays = data.days.length;
        
        for(let i = 0; i < totalDays-1 ; i++){
            weatherBox = document.createElement('div')
            weatherBox.classList.add('weather-box')
            container.appendChild(weatherBox)
            
            const titleContainer = document.createElement('div')
            titleContainer.classList.add('title-container')
            weatherBox.appendChild(titleContainer)
            
            const infoWeatherContainer = document.createElement('div')
            infoWeatherContainer.classList.add('info-weather-container')
            weatherBox.appendChild(infoWeatherContainer)
            
            const title = document.createElement('h2')
            title.classList.add('title')
            title.textContent = i === 0 ? 'Hoy' : new Date(data.days[i+1].datetime).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
            titleContainer.appendChild(title)
            const shortDescriptionDaily = document.createElement('div')
            shortDescriptionDaily.classList.add('short-description-daily')
            shortDescriptionDaily.innerHTML = data.days[i+1].conditions
            titleContainer.appendChild(shortDescriptionDaily)

            const weatherIcon = document.createElement('img')
            weatherIcon.classList.add('weather-icon')
            weatherIcon.src = `https://raw.githubusercontent.com/VisualCrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${data.days[i].icon}.png`
            infoWeatherContainer.appendChild(weatherIcon)

            const temperatureContainer = document.createElement('p')
            temperatureContainer.classList.add('temperature-container')
            temperatureContainer.innerHTML = `${Math.round(data.days[i+1].temp)}<span>°C</span>`
            infoWeatherContainer.appendChild(temperatureContainer)

            const temperatureMin = document.createElement('div')
            temperatureMin.classList.add('temperature-min')
            const temperatureMax = document.createElement('div')
            temperatureMax.classList.add('temperature-max')
            temperatureContainer.appendChild(temperatureMax)
            temperatureContainer.appendChild(temperatureMin)

            temperatureMax.innerHTML = `Maxima: ${data.days[i+1].tempmax}<span>°C</span>`
            temperatureMin.innerHTML = `Minima: ${data.days[i+1].tempmin}<span>°C</span>`

            const precipHumidityContainer = document.createElement('div')
            const precipProb = document.createElement('div')
            precipProb.classList.add('precip-prob')
            precipProb.innerHTML = `Probabilidad de lluvia: ${data.days[i+1].precipprob}<span>%</span>`
            const humidity = document.createElement('div')
            humidity.classList.add('humidity')
            humidity.innerHTML = `Humedad: ${data.days[i+1].humidity}<span>%</span>`
            precipHumidityContainer.appendChild(precipProb)
            precipHumidityContainer.appendChild(humidity)
            infoWeatherContainer.appendChild(precipHumidityContainer)

            const windSpeed = document.createElement('div')
            windSpeed.classList.add('wind-speed')
            windSpeed.innerHTML = `Viento: a ${data.days[i+1].windspeed}<span>km/h</span>`
            precipHumidityContainer.appendChild(windSpeed)

            const descriptionWeatherContainer = document.createElement('div')
            descriptionWeatherContainer.classList.add
            ('description-weather-container')
            weatherBox.appendChild(descriptionWeatherContainer)
            const longDescriptionDaily = document.createElement('div')
            longDescriptionDaily.classList.add('long-description-daily')
            longDescriptionDaily.innerHTML = `${data.days[i+1].description}`
            descriptionWeatherContainer.appendChild(longDescriptionDaily)

            
        }
    })





const container = document.querySelector('.extended-weather-container');
const APIKey = 'TZDYGMAETJPQ3VZHZAMJAAFMC';
const lastLat = localStorage.getItem('lastLat');
const lastLon = localStorage.getItem('lastLon');

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lastLat},${lastLon}?key=${APIKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const totalDays = data.days.length;
        
        for(let i = 0; i < totalDays ; i++){
            weatherBox = document.createElement('div')
            weatherBox.classList.add('weather-box')
            container.appendChild(weatherBox)
            

        }
    })





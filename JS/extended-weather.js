const container = document.querySelector('.extended-weather-container');
const APIKey = '899b64acf3b986f8660e32e13fe9a456';
const lastLat = localStorage.getItem('lastLat');
const lastLon = localStorage.getItem('lastLon');

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lastLat}&lon=${lastLon}&units=metric&lang=es&appid=${APIKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Agrupamos por día
    const daysMap = {};
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
      if (!daysMap[date]) {
        daysMap[date] = {
          min: item.main.temp_min,
          max: item.main.temp_max,
          humidity: item.main.humidity,
          wind: item.wind.speed,
          weather: item.weather[0],
        };
      } else {
        daysMap[date].min = Math.min(daysMap[date].min, item.main.temp_min);
        daysMap[date].max = Math.max(daysMap[date].max, item.main.temp_max);
      }
    });

    // Convertimos a array para iterar
    const daysArray = Object.entries(daysMap);

    daysArray.forEach(([date, info], i) => {
      const weatherBox = document.createElement('div');
      weatherBox.classList.add('weather-box');
      container.appendChild(weatherBox);

      const titleContainer = document.createElement('div');
      titleContainer.classList.add('title-container');
      weatherBox.appendChild(titleContainer);

      const title = document.createElement('h2');
      title.classList.add('title');
      title.textContent = i === 0 ? 'Hoy' : date;
      titleContainer.appendChild(title);

      const shortDescriptionDaily = document.createElement('div');
      shortDescriptionDaily.classList.add('short-description-daily');
      shortDescriptionDaily.innerHTML = info.weather.main;
      titleContainer.appendChild(shortDescriptionDaily);

      const infoWeatherContainer = document.createElement('div');
      infoWeatherContainer.classList.add('info-weather-container');
      weatherBox.appendChild(infoWeatherContainer);

      const weatherIcon = document.createElement('img');
      weatherIcon.classList.add('weather-icon');
      weatherIcon.src = `https://openweathermap.org/img/wn/${info.weather.icon}@2x.png`;
      infoWeatherContainer.appendChild(weatherIcon);

      const temperatureContainer = document.createElement('p');
      temperatureContainer.classList.add('temperature-container');
      infoWeatherContainer.appendChild(temperatureContainer);

      const temperatureMax = document.createElement('div');
      temperatureMax.classList.add('temperature-max');
      temperatureMax.innerHTML = `Máxima: ${Math.round(info.max)}<span>°C</span>`;

      const temperatureMin = document.createElement('div');
      temperatureMin.classList.add('temperature-min');
      temperatureMin.innerHTML = `Mínima: ${Math.round(info.min)}<span>°C</span>`;

      temperatureContainer.appendChild(temperatureMax);
      temperatureContainer.appendChild(temperatureMin);

      const precipHumidityContainer = document.createElement('div');
      infoWeatherContainer.appendChild(precipHumidityContainer);

      const humidity = document.createElement('div');
      humidity.classList.add('humidity');
      humidity.innerHTML = `Humedad: ${info.humidity}<span>%</span>`;
      precipHumidityContainer.appendChild(humidity);

      const windSpeed = document.createElement('div');
      windSpeed.classList.add('wind-speed');
      windSpeed.innerHTML = `Viento: a ${info.wind}<span> km/h</span>`;
      precipHumidityContainer.appendChild(windSpeed);

      const descriptionWeatherContainer = document.createElement('div');
      descriptionWeatherContainer.classList.add('description-weather-container');
      weatherBox.appendChild(descriptionWeatherContainer);

      const longDescriptionDaily = document.createElement('div');
      longDescriptionDaily.classList.add('long-description-daily');
      longDescriptionDaily.innerHTML = info.weather.description;
      descriptionWeatherContainer.appendChild(longDescriptionDaily);
    });
  })
  .catch(err => console.error(err));

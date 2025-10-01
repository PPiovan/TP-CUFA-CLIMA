const APIKey = '899b64acf3b986f8660e32e13fe9a456';

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-3.7038, 40.4168]),
    zoom: 4
  })
});

// Capas meteorológicas
const precipLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${APIKey}`
  }),
  visible: false
});
const windLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${APIKey}`
  }),
  visible: false
});
const tempLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${APIKey}`
  }),
  visible: false
});

// ...existing code...
map.addLayer(precipLayer);
map.addLayer(windLayer);
map.addLayer(tempLayer); //

// Botones para mostrar/ocultar capas
document.getElementById('precip').onclick = () => {
  precipLayer.setVisible(true);
  windLayer.setVisible(false);
  tempLayer.setVisible(false);
};
document.getElementById('wind').onclick = () => {
  precipLayer.setVisible(false);
  windLayer.setVisible(true);
  tempLayer.setVisible(false);
};
document.getElementById('temperature').onclick = () => { 
  precipLayer.setVisible(false);
  windLayer.setVisible(false);
  tempLayer.setVisible(true);
};
// ...existing code...

const toggleDarkMode = document.querySelector('.logo-image')
const bodyContainer = document.querySelector('body')

let temaActual = localStorage.getItem('tema') || 'claro'
bodyContainer.classList.remove('claro', 'oscuro')
bodyContainer.classList.add(temaActual)

// también seteo la imagen según el tema guardado
if (temaActual === 'oscuro') {
    toggleDarkMode.src = "/imgs/icons/despejado-noche.png"  // ruta para modo oscuro
} else {
    toggleDarkMode.src = "/imgs/icons/despejado.png"    // ruta para modo claro
}

toggleDarkMode.addEventListener('click', () => {

    toggleDarkMode.classList.add('rotate');
    setTimeout(() => {
        toggleDarkMode.classList.remove('rotate');
    }, 600); 


    if (temaActual === 'claro') {
        temaActual = 'oscuro'
        toggleDarkMode.src = "/imgs/icons/despejado-noche.png"
    } else {
        temaActual = 'claro'
        toggleDarkMode.src = "/imgs/icons/despejado.png"
    }

    bodyContainer.classList.remove('claro', 'oscuro')
    bodyContainer.classList.add(temaActual)

    localStorage.setItem('tema', temaActual)
})
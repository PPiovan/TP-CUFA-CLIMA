const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

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
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  // La geolocalización no es compatible con este navegador.
  console.log("La geolocalización no es compatible con este navegador.");
}
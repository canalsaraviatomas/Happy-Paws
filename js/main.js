// API pets
function loadPet() {
  return fetch("https://huachitos.cl/api/animales")
    .then((response) => response.json())
    .then((data) => {
      const animales = data.data; // array completo de animales
      const randomIndex = Math.floor(Math.random() * animales.length);
      const animalRandom = animales[randomIndex];
      return `
        <img src="${animalRandom.imagen}" alt="pet" />
        <p class="name-pet">${animalRandom.nombre}</p>
        <p> ${animalRandom.edad} <br> ${animalRandom.genero} </p>
      `;
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API:", error);
      return "";
    });
}

export function loadPetsIntoDOM() {
  const petElements = document.querySelectorAll(".pet");
  petElements.forEach((petElement) => {
    loadPet().then((petHTML) => {
      petElement.innerHTML = petHTML;
    });
  });
}

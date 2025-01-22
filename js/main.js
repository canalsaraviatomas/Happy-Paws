// API pets
function loadPet() {
  return fetch("https://huachitos.cl/api/animales")
    .then((response) => response.json())
    .then((data) => {
      const animales = data.data; // array completo de animales
      const randomIndex = Math.floor(Math.random() * animales.length);
      const animalRandom = animales[randomIndex];
      return animalRandom;
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
      petElement.innerHTML = `
        <img src="${petHTML.imagen}" alt="pet" />
        <p class="name-pet">${petHTML.nombre}</p>
        <p> ${petHTML.edad} <br> ${petHTML.genero} </p>
      `;
      petElement.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
          <div class="modal-content">
            <img src="${petHTML.imagen}" alt="pet" />
            <div class="text-content">
              <span class="close-button">&times;</span>
              <p class="name-pet">${petHTML.nombre}</p>
              <p class="details">${petHTML.genero} | ${petHTML.edad}</p>
              <p> ${petHTML.desc_personalidad} ${petHTML.desc_adicional} </p>
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close-button");
        closeButton.addEventListener("click", () => {
          document.body.removeChild(modal);
        });

        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            document.body.removeChild(modal);
          }
        });
      });
    });
  });
}

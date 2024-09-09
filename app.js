let pets = [];  // Aquí almacenaremos las mascotas
let isEditing = false;
let currentPetIndex = -1; // Índice de la mascota que se está editando

document.addEventListener('DOMContentLoaded', () => {
    const addPetBtn = document.getElementById('addPetBtn');
    const petModal = document.getElementById('petModal');
    const closeModal = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const petForm = document.getElementById('petForm');
    const petCardsContainer = document.getElementById('petCardsContainer');
    const modalTitle = document.getElementById('modalTitle');
    const savePetBtn = document.getElementById('savePetBtn');

    // Mostrar el modal para agregar mascota
    addPetBtn.addEventListener('click', () => {
        isEditing = false;
        currentPetIndex = -1;
        modalTitle.textContent = 'Agregar Mascota';
        petForm.reset();
        petModal.style.display = 'flex';
    });

    // Cerrar el modal
    closeModal.addEventListener('click', () => {
        petModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        petModal.style.display = 'none';
    });

    // Agregar o editar una mascota
    petForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newPet = {
            name: document.getElementById('name').value,
            apellido: document.getElementById('apellido').value,
            raza: document.getElementById('raza').value,
            telefono: document.getElementById('telefono').value,
            pais: document.getElementById('pais').value,
            fotoUrl: document.getElementById('fotoUrl').value,
            descripcion: document.getElementById('descripcion').value,
        };

        if (isEditing) {
            // Actualizar mascota
            pets[currentPetIndex] = newPet;
        } else {
            // Agregar nueva mascota
            pets.push(newPet);
        }

        renderCards();
        petModal.style.display = 'none';
        petForm.reset();
    });

    function renderCards() {
        petCardsContainer.innerHTML = '';
        pets.forEach((pet, index) => {
            const petCard = document.createElement('div');
            petCard.classList.add('card');

            petCard.innerHTML = `
                <div class="edit-delete">
                    <button onclick="editPet(${index})">✏️</button>
                    <button onclick="deletePet(${index})">❌</button>
                </div>
                <img src="${pet.fotoUrl}" alt="${pet.name}">
                <h3>${pet.name} ${pet.apellido}</h3>
                <p>${pet.telefono} | ${pet.pais}</p>
                <p>${pet.descripcion}</p>
            `;

            petCardsContainer.appendChild(petCard);
        });
    }
});

// Función para editar mascotas
function editPet(index) {
    const petModal = document.getElementById('petModal');
    const modalTitle = document.getElementById('modalTitle');

    // Cambiar estado a modo edición
    isEditing = true;
    currentPetIndex = index;

    // Obtener la mascota seleccionada
    const pet = pets[index];

    // Llenar el formulario con los datos de la mascota
    document.getElementById('name').value = pet.name;
    document.getElementById('apellido').value = pet.apellido;
    document.getElementById('raza').value = pet.raza;
    document.getElementById('telefono').value = pet.telefono;
    document.getElementById('pais').value = pet.pais;
    document.getElementById('fotoUrl').value = pet.fotoUrl;
    document.getElementById('descripcion').value = pet.descripcion;

    // Cambiar el título del modal
    modalTitle.textContent = 'Editar Mascota';

    // Mostrar el modal
    petModal.style.display = 'flex';
}

// Función para eliminar mascotas
function deletePet(index) {
    pets.splice(index, 1);
    document.getElementById('petCardsContainer').innerHTML = '';
    renderCards();
}

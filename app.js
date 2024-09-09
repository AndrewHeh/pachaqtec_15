let pets = [];  
let isEditing = false;
let currentPetIndex = -1; 

document.addEventListener('DOMContentLoaded', () => {
    const addPetBtn = document.getElementById('addPetBtn');
    const petModal = document.getElementById('petModal');
    const closeModal = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancelBtn');
    const petForm = document.getElementById('petForm');
    const petCardsContainer = document.getElementById('petCardsContainer');
    const modalTitle = document.getElementById('modalTitle');
    const savePetBtn = document.getElementById('savePetBtn');

    
    addPetBtn.addEventListener('click', () => {
        isEditing = false;
        currentPetIndex = -1;
        modalTitle.textContent = 'Agregar Mascota';
        petForm.reset();
        petModal.style.display = 'flex';
    });

    
    closeModal.addEventListener('click', () => {
        petModal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        petModal.style.display = 'none';
    });

    
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
            
            pets[currentPetIndex] = newPet;
        } else {
            
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


function editPet(index) {
    const petModal = document.getElementById('petModal');
    const modalTitle = document.getElementById('modalTitle');

    
    isEditing = true;
    currentPetIndex = index;

    
    const pet = pets[index];

    
    document.getElementById('name').value = pet.name;
    document.getElementById('apellido').value = pet.apellido;
    document.getElementById('raza').value = pet.raza;
    document.getElementById('telefono').value = pet.telefono;
    document.getElementById('pais').value = pet.pais;
    document.getElementById('fotoUrl').value = pet.fotoUrl;
    document.getElementById('descripcion').value = pet.descripcion;

    
    modalTitle.textContent = 'Editar Mascota';

    
    petModal.style.display = 'flex';
}


function deletePet(index) {
    pets.splice(index, 1);
    document.getElementById('petCardsContainer').innerHTML = '';
    renderCards();
}

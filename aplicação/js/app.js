import { Storage } from './modules/storage.js';
import { UI } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  UI.renderHome();
  UI.renderJardim();

  // Navegação por Abas (Bottom Bar)
  const navItems = document.querySelectorAll('.nav-item');
  const tabs = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-tab');
      
      navItems.forEach(i => i.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Evento de Adicionar Planta
  document.getElementById('form-add-plant').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('plant-name').value;
    const species = document.getElementById('plant-species').value;
    const location = document.getElementById('plant-location').value;

    if (Storage.addPlant({ name, species, location, lastWatered: new Date().toISOString().split('T')[0] })) {
      alert('Planta adicionada com sucesso!');
      UI.renderHome();
      UI.renderJardim();
    }
  });
});

window.markWatered = (id) => {
  const plants = Storage.getPlants();
  const plant = plants.find(p => p.id === id);
  if (plant) {
    plant.lastWatered = new Date().toISOString().split('T')[0];
    Storage.savePlants(plants);
    UI.renderHome();
    alert(`Rega registada para ${plant.name}!`);
  }
};
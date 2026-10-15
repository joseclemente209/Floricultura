import { Storage } from './storage.js';

export const UI = {
  renderHome() {
    const plants = Storage.getPlants();
    const list = document.getElementById('home-watering-list');
    list.innerHTML = '';

    plants.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>🌿 ${p.name} (${p.species})</h3>
        <p><strong>Localização:</strong> ${p.location}</p>
        <p><strong>Última rega:</strong> ${p.lastWatered}</p>
        <button class="btn" style="margin-top:8px;" onclick="window.markWatered(${p.id})">💧 Marcar como Regada</button>
      `;
      list.appendChild(card);
    });
  },

  renderJardim(filter = 'Todas') {
    const plants = Storage.getPlants();
    const list = document.getElementById('jardim-list');
    list.innerHTML = '';

    const filtered = filter === 'Todas' ? plants : plants.filter(p => p.location === filter);

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p><em>${p.species}</em></p>
        <p>Divisão: ${p.location}</p>
      `;
      list.appendChild(card);
    });
  }
};
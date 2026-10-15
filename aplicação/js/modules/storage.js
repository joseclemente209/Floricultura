// Gestão do Estado e Dados Locais da FloriApp
const INITIAL_PLANTS = [
  { id: 1, name: 'Marta', species: 'Monstera Deliciosa', location: 'Sala', daysInterval: 7, lastWatered: '2026-10-01' },
  { id: 2, name: 'Zen Pothos', species: 'Epipremnum Aureum', location: 'Cozinha', daysInterval: 5, lastWatered: '2026-10-05' }
];

export const Storage = {
  getPlants() {
    const data = localStorage.getItem('floriapp_plants');
    return data ? JSON.parse(data) : INITIAL_PLANTS;
  },

  savePlants(plants) {
    localStorage.setItem('floriapp_plants', JSON.stringify(plants));
  },

  addPlant(plant) {
    const plants = this.getPlants();
    if (plants.length >= 5) {
      alert('⚠️ Limite de 5 plantas atingido no Plano Gratuito! Atualize para o Plano Premium.');
      return false;
    }
    plants.push({ ...plant, id: Date.now() });
    this.savePlants(plants);
    return true;
  }
};
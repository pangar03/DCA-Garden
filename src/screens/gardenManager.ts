import { Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class GardenManager extends HTMLElement {
    connectedCallback() {
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                .garden {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    padding: 20px;
                }
            </style>
            <div class="garden-container">
                <button id="go-to-garden">Go Back to Garden</button>
                <h1>Garden Manager</h1>
                <h2>Available Plants</h2>
                <ul class="garden" id="available"></ul>
                <h2>Your Plants</h2>
                <ul class="garden" id="current"></ul>
            </div>
        `;

        const manageButton = this.shadowRoot.querySelector('#go-to-garden');
        if (manageButton) {
            manageButton.addEventListener('click', () => {
                screenActions.changeScreen(Screen.GARDEN);
            });
        }

        const availableList = this.shadowRoot.querySelector('#available');
        if (availableList) {
            state.plantList.forEach((plant, index) => {
                const plantCard = document.createElement('garden-plant-card');
                plantCard.setAttribute('commonname', plant.common_name);
                plantCard.setAttribute('sciname', plant.scientific_name);
                plantCard.setAttribute('image', plant.img);
                plantCard.setAttribute('type', plant.type);
                plantCard.setAttribute('origin', plant.origin);
                plantCard.setAttribute('season', plant.flowering_season);
                plantCard.setAttribute('sunexposure', plant.sun_exposure);
                plantCard.setAttribute('watering', plant.watering);

                availableList.appendChild(plantCard);
            });
        }

        const currentList = this.shadowRoot.querySelector('#current');
        if (currentList) {
            state.garden.plants.forEach((plant, index) => {
                const plantCard = document.createElement('garden-plant-card');
                plantCard.setAttribute('index', index.toString());
                plantCard.setAttribute('commonname', plant.common_name);
                plantCard.setAttribute('sciname', plant.scientific_name);
                plantCard.setAttribute('image', plant.img);
                plantCard.setAttribute('type', plant.type);
                plantCard.setAttribute('origin', plant.origin);
                plantCard.setAttribute('season', plant.flowering_season);
                plantCard.setAttribute('sunexposure', plant.sun_exposure);
                plantCard.setAttribute('watering', plant.watering);

                currentList.appendChild(plantCard);
            });
        }
    }
};

export default GardenManager;
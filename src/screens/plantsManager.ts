import { Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class PlantsManager extends HTMLElement {
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
                <h1>Available Plants!</h1>
                <ul class="garden"></ul>
            </div>
        `;

        const manageButton = this.shadowRoot.querySelector('#go-to-garden');
        if (manageButton) {
            manageButton.addEventListener('click', () => {
                screenActions.changeScreen(Screen.GARDEN);
            });
        }

        const plantList = this.shadowRoot.querySelector('.garden');
        if (plantList) {
            state.plantList.forEach((plant, index) => {
                const plantCard = document.createElement('admin-plant-card');
                plantCard.setAttribute('index', index.toString());
                plantCard.setAttribute('commonname', plant.common_name);
                plantCard.setAttribute('sciname', plant.scientific_name);
                plantCard.setAttribute('image', plant.img);
                plantCard.setAttribute('type', plant.type);
                plantCard.setAttribute('origin', plant.origin);
                plantCard.setAttribute('season', plant.flowering_season);
                plantCard.setAttribute('sunexposure', plant.sun_exposure);
                plantCard.setAttribute('watering', plant.watering);

                plantList.appendChild(plantCard);
            });
        }
    }
};

export default PlantsManager;
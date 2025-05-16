import { gardenActions, Screen, screenActions, screenActionType } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Garden extends HTMLElement{
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
                <button id="manage-garden">Manage Garden</button>
                <button id="manage-plants">Manage Available Plants</button>
                <h1>${state.garden.name}</h1>
                <button id="change-garden-name">Change Garden Name</button>
                <form id="name-form" style="display: none;">
                    <input type="text" id="new-garden-name" placeholder="New Garden Name" />
                    <button type="submit">Change</button>
                </form>
                <ul class="garden"></ul>
            </div>
        `;

        const changeNameBtn = this.shadowRoot.querySelector('#change-garden-name');
        if (changeNameBtn) {
            changeNameBtn.addEventListener('click', () => {
                const form = this.shadowRoot?.querySelector('#name-form') as HTMLFormElement;
                if (form) {
                    form.style.display = 'block';

                    form.addEventListener('submit', (event) => {
                        event.preventDefault();
                        const newNameInput = this.shadowRoot?.querySelector('#new-garden-name') as HTMLInputElement;
                        if (newNameInput) {
                            const newName = newNameInput.value;
                            gardenActions.changeName(newName);
                            form.style.display = 'none';
                            newNameInput.value = '';
                        }
                    });
                }
            });
        }

        const manageGardenBtn = this.shadowRoot.querySelector('#manage-garden');
        if (manageGardenBtn) {
            manageGardenBtn.addEventListener('click', () => {
                screenActions.changeScreen(Screen.GARDEN_MANAGER);
            });
        }

        const managePlantsBtn = this.shadowRoot.querySelector('#manage-plants');
        if (managePlantsBtn) {
            managePlantsBtn.addEventListener('click', () => {
                screenActions.changeScreen(Screen.PLANTS_MANAGER);
            });
        }

        const gardenList = this.shadowRoot.querySelector('.garden');
        if (gardenList) {
            state.garden.plants.forEach((plant, index) => {
                const plantCard = document.createElement('plant-card');
                plantCard.setAttribute('index', index.toString());
                plantCard.setAttribute('commonname', plant.common_name);
                plantCard.setAttribute('sciname', plant.scientific_name);
                plantCard.setAttribute('image', plant.img);
                plantCard.setAttribute('type', plant.type);
                plantCard.setAttribute('origin', plant.origin);
                plantCard.setAttribute('season', plant.flowering_season);
                plantCard.setAttribute('sunexposure', plant.sun_exposure);
                plantCard.setAttribute('watering', plant.watering);

                gardenList.appendChild(plantCard);
            });
        }
    }
};

export default Garden;
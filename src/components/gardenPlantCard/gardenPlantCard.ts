import { gardenActions } from "../../flux/Actions";
import { State, store } from "../../flux/Store";
import { Plant } from "../../services/Plants";

class GardenPlantCard extends HTMLElement{
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

        const index = this.getAttribute("index") || -1;
        const commonName = this.getAttribute('commonname') || "";
        const sciName = this.getAttribute('sciname') || "";
        const image = this.getAttribute('image') || "";
        const type = this.getAttribute('type') || "";
        const origin = this.getAttribute('origin') || "";
        const season = this.getAttribute('season') || "";
        const sunExposure = this.getAttribute('sunexposure') || "";
        const watering = this.getAttribute('watering') || "";

        this.shadowRoot.innerHTML = `
            <style>
                .plant-card {
                    width: 400px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 16px;
                    text-align: center;
                }
                .plant-image {
                    width: 400px;
                    height: auto;
                    border-radius: 8px;
                }
                .manage-button {
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin-top: 10px;
                    cursor: pointer;
                }
                #remove-button {
                    background-color:rgb(175, 104, 76);
                }
                #add-button {
                    background-color:rgb(76, 175, 104);
                }   
            </style>
            <div class="plant-card">
                <img src="${image}" alt="${commonName}" class="plant-image"/>
                <h3>${commonName}</h3>
                <h4>${sciName}</h4>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Origin:</strong> ${origin}</p>
                <p><strong>Season:</strong> ${season}</p>
                <p><strong>Sun Exposure:</strong> ${sunExposure}</p>
                <p><strong>Watering:</strong> ${watering}</p>
                ${
                    index !== -1
                        ? `<button class="manage-button" id="remove-button">Remove</button>`
                        : `<button class="manage-button" id="add-button">Add</button>`
                }
            </div>
        `;
        
        const button = this.shadowRoot.querySelector('.manage-button');
        if (button) {
            button.addEventListener('click', () => {
                if (index !== -1) {
                    gardenActions.removeFromGarden(parseInt(index));
                } else {
                    const newPlant = state.plantList.find((plant) => plant.common_name === commonName) as Plant;
                    gardenActions.addToGarden(newPlant);
                }
            });
        }
    }
};

export default GardenPlantCard;
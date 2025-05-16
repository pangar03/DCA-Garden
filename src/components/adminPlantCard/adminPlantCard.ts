import { gardenActions, plantsManagerAction } from "../../flux/Actions";
import { State, store } from "../../flux/Store";
import { Plant } from "../../services/Plants";

class AdminPlantCard extends HTMLElement{
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
                #edit-button {
                    background-color: rgb(76, 175, 165);
                }
                #submit-button {
                    background-color: rgb(76, 175, 104);
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
                <form id="plant-form" style="display: none;">
                    <input name="commonname" id="commonname" placeholder="Common Name" value="${commonName}">
                    <input name="sciname" id="sciname" placeholder="Scientific Name" value="${sciName}">
                    <input name="image" id="image" placeholder="Image URL" value="${image}">
                    <input name="type" id="type" placeholder="Type" value="${type}">
                    <input name="origin" id="origin" placeholder="Origin" value="${origin}">
                    <input name="season" id="season" placeholder="Season" value="${season}">
                    <input name="sunexposure" id="sunexposure" placeholder="Sun Exposure" value="${sunExposure}">
                    <input name="watering" id="watering" placeholder="Watering" value="${watering}">
                    <button type="submit" id="submit-button" class="manage-button">Submit</button>
                </form>
                <button id="edit-button" class="manage-button">Edit</button>
            </div>
        `;

        const editButton = this.shadowRoot.querySelector('#edit-button');
        if (editButton) {
            editButton.addEventListener('click', () => {
                const form = this.shadowRoot?.querySelector('#plant-form');
                form?.setAttribute('style', 'display: block;');

                form?.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const commonName = (this.shadowRoot?.querySelector('#commonname') as HTMLInputElement).value;
                    const sciName = (this.shadowRoot?.querySelector('#sciname') as HTMLInputElement).value;
                    const image = (this.shadowRoot?.querySelector('#image') as HTMLInputElement).value;
                    const type = (this.shadowRoot?.querySelector('#type') as HTMLInputElement).value;
                    const origin = (this.shadowRoot?.querySelector('#origin') as HTMLInputElement).value;
                    const season = (this.shadowRoot?.querySelector('#season') as HTMLInputElement).value;
                    const sunExposure = (this.shadowRoot?.querySelector('#sunexposure') as HTMLInputElement).value;
                    const watering = (this.shadowRoot?.querySelector('#watering') as HTMLInputElement).value;
                    const plant: Plant = {
                        common_name: commonName,
                        scientific_name: sciName,
                        img: image,
                        type: type,
                        origin: origin,
                        flowering_season: season,
                        sun_exposure: sunExposure,
                        watering: watering
                    };

                    console.log("NEW PLANT", plant);
                    plantsManagerAction.modifyPlant(plant, Number(index));
                });
            });
        }
    }
};

export default AdminPlantCard;
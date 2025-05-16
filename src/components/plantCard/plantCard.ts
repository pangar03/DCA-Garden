import { State, store } from "../../flux/Store";

class PlantCard extends HTMLElement {
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
            </div>
        `;
    }
};

export default PlantCard;
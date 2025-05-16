import { gardenActions, plantsManagerAction, Screen } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    handleChange(state: State) {
        this.render(state);
    }

    async connectedCallback() {
        store.load();
        store.subscribe((state: State) => this.handleChange(state));
        await plantsManagerAction.getPlants();
        console.log(store.getState());
        this.render(store.getState());
    }
    
    async render(state = store.getState()) {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = ``;

        switch (state.screen) {
            case Screen.GARDEN:
                this.shadowRoot.innerHTML = `
                    <garden-component></garden-component>
                `;
                break;
            
            case Screen.PLANTS_MANAGER:
                this.shadowRoot.innerHTML = `
                    <plants-manager></plants-manager>
                `;
                break;

            case Screen.GARDEN_MANAGER:
                this.shadowRoot.innerHTML = `
                    <garden-manager></garden-manager>
                `;
                break;

            default:
                break;
        }
    }
}

export default Root;

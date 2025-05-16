import Root from "./Root/Root";

customElements.define('root-element', Root);
export default Root;

import Garden from "./screens/garden";
import PlantsManager from "./screens/plantsManager";
import GardenManager from "./screens/gardenManager";

import PlantCard from "./components/plantCard/plantCard";
import GardenPlantCard from "./components/gardenPlantCard/gardenPlantCard";
import AdminPlantCard from "./components/adminPlantCard/adminPlantCard";

customElements.define('garden-component', Garden);
customElements.define('plants-manager', PlantsManager);
customElements.define('garden-manager', GardenManager);

customElements.define('plant-card', PlantCard);
customElements.define('garden-plant-card', GardenPlantCard);
customElements.define('admin-plant-card', AdminPlantCard);

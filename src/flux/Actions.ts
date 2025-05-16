import { AppDispatcher } from './Dispatcher';
import { plantsData } from "../services/Plants";
import { Plant } from '../services/Plants';

export const garden = {
  ADD_TO_GARDEN: 'ADD_TO_GARDEN',
  REMOVE_FROM_GARDEN: 'REMOVE_FROM_GARDEN',
  CHANGE_NAME: 'CHANGE_NAME',
};


export enum Screen {
  GARDEN = 'GARDEN',
  PLANTS_MANAGER = 'PLANTS_MANAGER',
  GARDEN_MANAGER = 'GARDEN_MANAGER',
}

export const screenActionType = {
  CHANGE_SCREEN: 'CHANGE_SCREEN',
};

export const plantsManager = {
  GET_PLANTS: 'GET_PLANTS',
  MODIFY_PLANT: 'MODIFY_PLANT',
}

export const plantsManagerAction = {
  getPlants: async () => {
    const plants = plantsData;
    AppDispatcher.dispatch({
      type: plantsManager.GET_PLANTS,
      payload: plants
    });
  },
  modifyPlant: async (plant: Plant, index: Number) => {
    console.log("Plant in Action:", plant);
    AppDispatcher.dispatch({
      type: plantsManager.MODIFY_PLANT,
      payload: { plant, index}
    });
  }
}

export const screenActions = {
  changeScreen: (newScreen: Screen) => {
    AppDispatcher.dispatch({
      type: screenActionType.CHANGE_SCREEN,
      payload: newScreen
    });
  }
}

export const gardenActions = {
  addToGarden: async(plant: Plant) => {
    AppDispatcher.dispatch({
      type: garden.ADD_TO_GARDEN,
      payload: plant
    });
  },
  removeFromGarden: (plantIndex: number) => {
    AppDispatcher.dispatch({
      type: garden.REMOVE_FROM_GARDEN,
      payload: plantIndex
    });
  },
  changeName: (name: string) => {
    AppDispatcher.dispatch({
      type: garden.CHANGE_NAME,
      payload: name
    });
  }
};
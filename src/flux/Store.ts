import { AppDispatcher } from './Dispatcher';
import { Action } from './Dispatcher';
import { Plant } from  '../services/Plants';
import { garden, plantsManager, Screen, screenActionType } from './Actions';

type Callback = () => void;

export type Garden = {
  plants: Plant[],
  name: string,
}

export type State = {
  plantList: Plant[],
  garden: Garden,
  screen: Screen,
}

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
      plantList: [],
      garden: {
        plants: [],
        name: 'My Garden',
      },
      screen: Screen.GARDEN,
  }

  private _listeners: Listener[] = [];

  constructor() {
      AppDispatcher.register(this._handleActions.bind(this)); // Bind the context of this method to the Store instance
  }

  getState() {
      return this._myState;
  }

  _handleActions(action: Action): void {
    switch (action.type) {
      case garden.ADD_TO_GARDEN:
        this._myState.garden.plants.push(action.payload as Plant);
        this._emitChange();
        break;
      case garden.REMOVE_FROM_GARDEN:
        this._myState.garden.plants.splice(action.payload as number, 1);
        this._emitChange();
        break;
      case garden.CHANGE_NAME:
        this._myState.garden.name = action.payload as string;
        this._emitChange();
        break;
      case screenActionType.CHANGE_SCREEN:
        this._myState.screen = action.payload as Screen;
        this._emitChange();
        break;
      case plantsManager.GET_PLANTS:
        this._myState.plantList = action.payload as Plant[];
        this._emitChange();
        break;
      case plantsManager.MODIFY_PLANT:
        const { plant, index } = action.payload as { plant: Plant, index: number };
        this._myState.garden.plants = this._myState.garden.plants.map((gardenPlant) => {
          if(gardenPlant.scientific_name === plant.scientific_name) {
            gardenPlant = plant;
          }
          return gardenPlant;
        });
        this._myState.plantList[index] = plant;
        this._emitChange();
        break;
      default:
        break;
    }
    this.persist();
  }

  private _emitChange(): void {
    const state = this.getState();
    for (const listener of this._listeners) {
        listener(state);
    }
  }

  // Permite a los componentes suscribirse al store
  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState()); // Emitir estado actual al suscribirse
  }

  // Permite quitar la suscripción
  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      this._myState = JSON.parse(persistedState);
      this._emitChange(); // Emitir el nuevo estado
    }
  }
}
export const store = new Store();

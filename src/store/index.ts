// tambien llamado store

import { reducer } from './reducer';
//importo del storage
import { PersistanceKeys } from '../utils/storage';
import storage from '../utils/storage';

export let emptyState = {
  //aqui van todas las variables que quiero que esten de forma global
	//aqui pone como inicia, puede iniciar vacio incluso
  screen: 'LOGIN',
};

//aqui uso el get de storage
//el defaultvalue es nuestro estado inicial o emptyState
export let appState = storage.get({key: PersistanceKeys.STORE, defaultValue: emptyState});

//De aquí hacia abajo no se lo aprendan de memoria, siempre va a estar ahí el archivo, esto es configuración
let observers: any = [];

const persistStore = (state: any) =>
  storage.set({ key: PersistanceKeys.STORE, value: state, session: false }); //si pongo session en true se agrega al session y no al local

const notifyObservers = () => observers.forEach((o:any) => o.render());

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	//cambia lo del nuevo estado para usarlo con el estado global
	const newState=reducer(action, clone);
	appState = newState
	observers.forEach((o: any) => o.render());


	persistStore(newState);
  notifyObservers();
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
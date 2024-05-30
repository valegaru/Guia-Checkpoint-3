// recuerda importar las screens
import './screens/dashboard'
import './screens/login'

//importar la screen como componente
import {Login} from './screens/login'
import { Dashboard } from './screens/dashboard'


import "./components/export"
import { addObserver,appState } from "./store"; //importar observers y appState

class AppContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"})
        addObserver(this)//le estoy diciendo que appContainer va a tener un observador el cual avisa cuando el appState cambia
    }

    connectedCallback() {
        this.render()
    }

	render() {
        //logica para cambiar de screen en el render
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		switch (appState.screen) {
			case 'LOGIN':
				const login = this.ownerDocument.createElement('app-login') as Login;
				this.shadowRoot?.appendChild(login);
				break;

			case 'DASHBOARD':
				const dashboard = this.ownerDocument.createElement('app-dashboard') as Dashboard;
				this.shadowRoot?.appendChild(dashboard);
				break;

			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);
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
        const something = this.ownerDocument.createElement('div');
        this.shadowRoot?.appendChild(something);
    }
}

customElements.define('app-container', AppContainer)
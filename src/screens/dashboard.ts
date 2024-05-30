import { addObserver, dispatch } from '../store/index';
import { navigate } from '../store/actions';

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		const button = this.shadowRoot?.querySelector('button');
		button?.addEventListener('click', () => {
			dispatch(navigate('LOGIN'));
		});
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '<h1>Dashboard</h1><button>Click</button>';
	}
}

customElements.define('app-dashboard', Dashboard);
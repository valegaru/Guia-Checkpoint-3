import { addObserver, appState, dispatch } from '../store/index';
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
		if (this.shadowRoot) this.shadowRoot.innerHTML = '<h1>Dashboard</h1><button>Click</button>'

		//asi renderizo todo lo que haya en un array en el appState

		// appState.cartShopping.forEach((product:any) => {
		// 	const card = this.ownerDocument.createElement('my-product');
		// 	card.setAttribute(AttributeProduct.image, product.image);
		// 	card.setAttribute(AttributeProduct.utitle, product.title);
		// 	card.setAttribute(AttributeProduct.category, product.category);
		// 	card.setAttribute(AttributeProduct.description, product.description);
		// 	card.setAttribute(AttributeProduct.price, product.price);
		// 	card.setAttribute(AttributeProduct.rating, product.rating.rate);
		// 	this.shadowRoot?.appendChild(card);
		//});;
	}
}

customElements.define('app-dashboard', Dashboard);
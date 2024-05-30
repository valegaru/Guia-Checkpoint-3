import { addObserver, dispatch } from '../store/index';
import { navigate } from '../store/actions';
import { Product } from '../types/products';
import firebase from '../services/firebase';

const formData: Omit<Product, "id"> = {
  name: "",
  price: 0,
};

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

	submitForm() {
    console.log(formData);
    firebase.addProduct(formData);
  }

  changeName(e: any) {
    formData.name = e?.target?.value;
  }

  changePrice(e: any) {
    formData.price = Number(e?.target?.value);
  }

	async render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '<h1>Dashboard</h1><button>Click</button>';

		const title = this.ownerDocument.createElement("h1");
    title.innerText = "Añade producto";
    this.shadowRoot?.appendChild(title);

    const pName = this.ownerDocument.createElement("input");
    pName.placeholder = "nombre del producto";
    pName.addEventListener("change", this.changeName);
    this.shadowRoot?.appendChild(pName);

    const pPrice = this.ownerDocument.createElement("input");
    pPrice.placeholder = "price";
    // pPrice.type = "number";
    pPrice.addEventListener("change", this.changePrice);
    this.shadowRoot?.appendChild(pPrice);

    const save = this.ownerDocument.createElement("button");
    save.innerText = "Guardar";
    save.addEventListener("click", this.submitForm);
    this.shadowRoot?.appendChild(save);

    const products = await firebase.getProducts();
    products.forEach((p: Product) => {
      const container = this.ownerDocument.createElement("section");
      const name = this.ownerDocument.createElement("h3");
      name.innerText = p.name;
      container.appendChild(name);

      const price = this.ownerDocument.createElement("h3");
      price.innerText = String(p.price);
      container.appendChild(price);

      this.shadowRoot?.appendChild(container);
    });
	}
}

customElements.define('app-dashboard', Dashboard);
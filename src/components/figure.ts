export enum AttributeFigure {
  'anime' = 'anime',
  'url' = 'url',
}

export default class Figure extends HTMLElement {
  anime?: string;
  url?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    const attrs: Record<AttributeFigure, null> = {
      anime: null,
      url: null,
    };
    return Object.keys(attrs);
  }
  attributeChangedCallback(propname: AttributeFigure, oldValue: string | undefined, newValue: string | undefined) {
    switch (propname) {
      default:
        this[propname] = newValue;
        break;
    }
  }
  //propname:AttributeFigure, oldValue: string|undefined, newValue: string|undefined
  connectedCallback() {
    this.render();
  }

  render() {
    const something = this.ownerDocument.createElement('div');
    this.shadowRoot?.appendChild(something);
  }
}

customElements.define('my-figure', Figure);

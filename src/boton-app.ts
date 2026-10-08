import estilos from './boton-app.css?inline';

export class BotonApp extends HTMLElement {
  private boton: HTMLButtonElement | null = null;

  static get observedAttributes() {
    return ['variante', 'deshabilitado'];
  }

  constructor() {
    super();
    const sombra = this.attachShadow({ mode: 'open' });
    sombra.innerHTML = `
      <style>${estilos}</style>
      <button class="secundario"><slot>Vaciar</slot></button>
    `;
    this.boton = sombra.querySelector('button');
  }

  connectedCallback() {
    this.actualizar();
  }

  attributeChangedCallback() {
    this.actualizar();
  }

  private actualizar() {
    if (!this.boton) return;

    const variante = this.getAttribute('variante') || 'secundario';
    this.boton.className = variante;

    const deshabilitado = this.hasAttribute('deshabilitado');
    this.boton.disabled = deshabilitado;
  }
}

customElements.define('boton-app', BotonApp);

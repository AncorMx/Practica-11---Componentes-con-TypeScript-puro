import './boton-app';
import estilos from './tarjeta-producto.css?inline';
import type { DetalleAgregar } from './tipos';

const pesos = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

export class TarjetaProducto extends HTMLElement {
  static get observedAttributes() {
    return ['producto-id', 'nombre', 'precio', 'imagen', 'existencia'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot && this.isConnected) {
      this.render();
    }
  }

  private render() {
    const id = this.getAttribute('producto-id') || '';
    const nombre = this.getAttribute('nombre') || '';
    const precio = Number(this.getAttribute('precio')) || 0;
    const imagen = this.getAttribute('imagen') || '';
    const existencia = Number(this.getAttribute('existencia')) || 0;
    const agotado = existencia <= 0;

    this.shadowRoot!.innerHTML = `
      <style>${estilos}</style>
      <article class="tarjeta">
        <img src="${imagen}" alt="${nombre}">
        <div class="cuerpo">
          <h3>${nombre}</h3>
          <p class="precio">${pesos.format(precio)}</p>
          <p class="existencia ${agotado ? 'agotado' : ''}">${agotado ? 'Agotado' : `${existencia} disponibles`}</p>
          <boton-app variante="primario" ${agotado ? 'deshabilitado' : ''}>Agregar al carrito</boton-app>
        </div>
      </article>
    `;

    const boton = this.shadowRoot!.querySelector('boton-app');
    boton?.addEventListener('click', () => {
      if (agotado) return;
      this.dispatchEvent(
        new CustomEvent<DetalleAgregar>('agregar', {
          detail: { id, nombre, precio },
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define('tarjeta-producto', TarjetaProducto);

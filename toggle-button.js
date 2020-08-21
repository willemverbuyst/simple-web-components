class ToggleContainer extends HTMLElement {
  constructor() {
    super();
    this._isVisible = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
          display: none;
        }
      </style>
      <button>Show</button>
      <p id='info-box'>
        <slot>This works!!!</slot>
      <p>
      `;
    this._infoEl = this.shadowRoot.querySelector('p');
    this._button = this.shadowRoot.querySelector('button');
    this._button.addEventListener('click', this._toggleText.bind(this));
  }

  connectedCallback() {
    if (this.hasAttribute('is-visible')) {
      if (this.getAttribute('is-visible') === 'true') {
        this._isVisible = true;
        this._infoEl.style.display = 'block';
        this._button.textContent = 'Hide';
      }
    }
  }

  _toggleText() {
    this._isVisible = !this._isVisible;
    this._infoEl.style.display = this._isVisible ? 'block' : 'none';
    this._button.textContent = this._isVisible ? 'Hide' : 'Show';
  }
}

customElements.define('uc-toggle-container', ToggleContainer);

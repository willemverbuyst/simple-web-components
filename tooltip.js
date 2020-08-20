class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummy tooltip text';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <slot>Some default</slot>
      <span> (?) </span>
      `;
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showToolTip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideToolTip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }
  // _ indicates private property
  _showToolTip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.backgroundColor = '#000';
    this._tooltipContainer.style.color = '#fff';
    this._tooltipContainer.style.zIndex = 10;
  }

  _hideToolTip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);

class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummy tooltip text';
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?) ';
    tooltipIcon.addEventListener('mouseenter', this._showToolTip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideToolTip.bind(this));
    this.appendChild(tooltipIcon);
  }
  // _ indicates private property
  _showToolTip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);
  }

  _hideToolTip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);

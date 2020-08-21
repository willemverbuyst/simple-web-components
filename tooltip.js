class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummy tooltip text';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>    
        div {
          font-weight: normal;
          position: absolute;
          top: 1.5rem;
          left: .75rem;
          background-color: #000;
          color: #fff;
          z-index: 10; 
          padding: .15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0, 0.26)
        }

        :host(.important) {
          background: var(--color-primary, #ccc);
          padding: 3px;
        }

        :host-context(p) {
          font-weight: 800;
        }

        .highlight {
          background-color: green;
        }

        ::slotted(.highlight) {
          // background-color: azure !important; 
          border-bottom: 1px dotted red;
        }

        .icon {
          background-color: #000;
          color: #fff;
          padding: .15rem .5rem;
          border-radius: 50%;
        }
      </style>
      <slot>Some default</slot>
      <span class="icon">?</span>
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
  }

  _hideToolTip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('uc-tooltip', Tooltip);

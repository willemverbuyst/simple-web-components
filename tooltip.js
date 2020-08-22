class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = 'Some dummy tooltip text';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>    
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        }

        :host {
          position: relative;
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

    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showToolTip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideToolTip.bind(this)
    );
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['text'];
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener('mouseenter', this._showToolTip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideToolTip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showToolTip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideToolTip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('uc-tooltip', Tooltip);

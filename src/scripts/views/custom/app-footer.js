class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.tampilkanFooter();
  }

  tampilkanFooter() {
    this.shadowDOM.innerHTML = `
    <style>
    :host{
        display:block;
        font-size:12px;
        text-align:center;
    }
    p {
        text-align: center;
        color: #444;
    }
    </style>
    <p tabindex="0">Kafe Asik &#169; 2021</p>`;
  }
}
customElements.define('app-footer', AppFooter);

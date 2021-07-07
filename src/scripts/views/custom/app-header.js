import DrawerInitiator from '../../utils/drawer-initiator';

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.tampilkanHeader();
    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this.shadowRoot.querySelector('#hamburgerButton'),
      drawer: this.shadowRoot.querySelector('#navigationDrawer'),
      content: document.querySelector('body'),
    });
  }

  tampilkanHeader() {
    this.shadowDOM.innerHTML = `
    <style>
    :host {
        padding: 0px 16px !important;
        background-color: white;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 10px;
        position: sticky;
        top: 0;
        z-index: 99;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }

    li {
        list-style-type: none;
    }
    
    .app-bar__menu {
        display: flex;
        align-items: center;
    }
    
    .app-bar__menu button {
        background-color: transparent;
        border: none;
        font-size: 28px;
        padding: 16px;
        cursor: pointer;
    }
    
    .app-bar__brand {
        display: flex;
        align-items: center;
    }
    
    .app-bar__brand h1 {
        text-transform: uppercase;
        user-select: none;
    }
    
    .app-bar__brand h1 a {
        font-size: 32px;
        color: #db0000;
        text-decoration: none;
    }
    
    .app-bar__navigation {
        position: absolute;
        top: 50px;
        left: -180px;
        width: 150px;
        transition: all 0.3s;
        padding: 8px;
        background-color: white;
        overflow: hidden;
    }
    
    .app-bar__navigation.open {
        left: 0;
    }
    
    .app-bar__navigation ul li a {
        display: inline-block;
        text-decoration: none;
        color: black;
        padding: 10px;
        margin-bottom: 5px;
        width: 100%;
    }
    @media screen and (min-width: 960px) {
        :host {
            grid-template-columns: 1fr auto;
            padding: 0px 32px !important;
        }
    
        .app-bar__menu {
            display: none;
        }
    
        .app-bar__navigation {
            position: static;
            width: 100%;
        }
    
        .app-bar__navigation ul li {
            display: inline-block;
        }
    
        .app-bar__navigation ul li a {
            display: inline-block;
            width: 120px;
            text-align: center;
            margin: 0;
        }
    }
    </style>
    <div class="app-bar__menu">
        <button tabindex="0" aria-label="Menu navigasi" id="hamburgerButton">☰</button>
    </div>
    <div class="app-bar__brand">
        <h1><a href="#/" title="Beranda">Kafe Asik</a></h1>
    </div>
    <nav id="navigationDrawer" class="app-bar__navigation">
        <ul>
            <li><a href="#/list">Daftar Kafe</a></li>
            <li><a href="#/search">Pencarian</a></li>
            <li><a href="#/suka">Kafe Favorit</a></li>
            <li><a href="https://www.linkedin.com/in/simopunkc/" rel="noopener" title="About Us" target="_blank">About Us</a></li>
        </ul>
    </nav>
    `;
  }
}
customElements.define('app-header', AppHeader);

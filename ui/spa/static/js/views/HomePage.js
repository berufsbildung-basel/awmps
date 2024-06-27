import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Homepage");
    }

    async getHtml() {
        return `
        <header>
        <div class="logo" onclick="toggleNav()">
            <img src="/images/awmps_logo.png" alt="AWMPS Logo">
        </div>
        <h1>AWMPS</h1>  
        <button data-open-modal class="settings-button">
            <div class="settings-logo">
                <img src="/spa/static/images/settings_icon.png" alt="Settings">
            </div> 
        </button>    
        <dialog data-modal class="dialog">
            <button data-close-modal>Close</button>
            <button>Add pot</button>
        </dialog>
        </header>
        <div class="main-content">
            <div class="pot-container">
                <div class="pot" onclick="window.location.href ='pots.html'" id="pot1">Topf 1</div>
                <div class="pot" id="pot2">Topf 2</div>
                <div class="pot" id="pot3">Topf 3</div>
                <div class="pot" id="pot4">Topf 4</div> 
            </div>
            <div id="settingsMenu" class="settings-menu">
                <dialog id="dialog">I'm a dialog</dialog>
                <button onclick="toggleDialog()">This button toggles a dialog</button>
            </div>
        </div>
        <footer>
            <div class="humidity">
                <span class="status-icon humidity-icon"></span>
                <span class="status-value">55%</span>
                <span class="status-label">humidity</span>
            </div>
            <div class="temperature">
                <span class="status-icon temperature-icon"></span>
                <span class="status-value">15°C</span>
            </div>
            <div class="light">
                <span class="status-icon sunlight-icon"></span>
                <span class="status-value">200lx</span>
            </div>
        </footer>
        `;
    }
}
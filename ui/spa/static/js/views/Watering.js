import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Watering");
    }

    async getHtml() {
        return `
        <header>
        <div class="logo" onclick="toggleNav()">
            <img src="/images/awmps_logo.png" alt="AWMPS Logo">
        </div>
        <h1>Watering</h1>
        <div class="settings-logo" onclick="toggleSettings()">
            <img src="/images/settings_icon.png" alt="Settings">
        </div>
        </header>
        <div class="main-content">
            <div class="wrapper"></div>
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

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
        <header><h1>AWMPS</h1></header>
        <div id="data-container" class="data-container"></div>
        <div class="wrapper">
            <div class="form-box login">
                <h2>Sign in</h2>
                <form action="#" id="loginForm" onsubmit="return validateForm()">
                    <div class="input-box">
                        <input type="email" id="email" required>
                        <label>Email</label>
                    </div>
                    <div class="input-box">
                        <input type="password" id="myInput" required>
                        <span class="icon" onclick="myFunction()"><ion-icon name="eye-outline"></ion-icon></span>
                        <label>Password</label>
                    </div>
                    <button type="submit" class="btn">Sign in</button>
                </form>
            </div>
        </div>
        <div class="logo">
            <img src="/images/awmps_logo.png" alt="">
        </div>
        `;
    }
}

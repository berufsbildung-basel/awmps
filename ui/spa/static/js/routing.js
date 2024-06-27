import HomePage from "./views/HomePage.js";
import Watering from "./views/Watering.js";
import Notifications from "./views/Notifications.js";
import Users from "./views/Users.js";
import Account from "./views/Account.js";
import Login from "./views/Login.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: HomePage },
        { path: "/watering", view: Watering },
        { path: "/notifications", view: Notifications },
        { path: "/users", view: Users },
        { path: "/account", view: Account },
        { path: "/login", view: Login }, 
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    // If the match is not found and equals 0 you will get sent back to the original path
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

// lists all the potential path matches and displays with a true or false value if the user is located on a path
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target)
        }
    })
    router();
});




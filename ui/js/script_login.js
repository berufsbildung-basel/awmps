// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     window.location.href = '/html/home_page.html';
// });

// function myFunction() {
//     var x = document.getElementById("myInput");
//     if (x.type === "password") {
//         x.type = "text";
//     } else {
//         x.type = "password";
//     }
// }

function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('myInput').value;

    if (email === "" || password === "") {
        alert("Email and password are required");
        return false;
    } else {
        window.location.href = "home_page.html";
        return false;
    }
}
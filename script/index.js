let signupBtn = document.querySelector("#signupBtn")
let signupUsername = document.querySelector("#signupUsername")
let signupEmail = document.querySelector("#signupEmail")
let signupPwd = document.querySelector("#signupPwd")

let Total = JSON.parse(localStorage.getItem("user-data")) || [];
signupBtn.addEventListener("click", function (e) {
    // e.preventDefault();
    let details = {
        Name: signupUsername.value,
        Email: signupEmail.value,
        Password: signupPwd.value
    }
    Total.push(details)
    localStorage.setItem("user-data", JSON.stringify(Total))
})

let signinBtn = document.querySelector("#signinBtn");
let signinEmail = document.querySelector("#signinEmail");
let signinPwd = document.querySelector("#signinPwd");
signinBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let model = document.querySelector("#successModel");
    let span = document.querySelector(".close");
    let passwordMatch = false;
    for (let i = 0; i < Total.length; i++) {
        if (signinEmail.value === Total[i].Email && signinPwd.value === Total[i].Password) {
            passwordMatch = true;

            // Show the Popup Dialog 
            model.style.display = "block";
            // Close the Popup dialog when the user clicks on the close button
            span.addEventListener("click", function () {
                model.style.display = "none";
                window.location.href = "dashboard.html";
            });
            // Close the Popup  dialog when the user clicks outside of it
            window.addEventListener("click", function (event) {
                if (event.target == model) {
                    model.style.display = "none";
                    window.location.href = "dashboard.html";
                }
            });
        }
    }
    if (!passwordMatch) {
        const errorModel = document.querySelector("#errorModel");
        const errorSpan = document.querySelector(".errorclose");
        const errorMessage = document.querySelector("#errorMessage");
        errorMessage.textContent = "Incorrect email or password";
        errorModel.style.display = "block";
        errorSpan.addEventListener("click", function () {
            errorModel.style.display = "none";
        });
        window.addEventListener("click", function (event) {
            if (event.target == errorModel) {
                errorModel.style.display = "none";
            }
        });
    }
});


const login_form = document.getElementById("login-form")
const login_entity = document.getElementById("login-entity")
const err_login_entity = document.getElementById("no-login-entity")

login_entity.addEventListener("input", () => {
    if (login_entity.value === "") {
        err_login_entity.textContent = "Please select an entity type"
    }
    else {
        err_login_entity.textContent = ""
        login_form.action = `/${login_entity.value}/login`
    }
    // console.log(login_form.action);
    // console.log("Hello");
})
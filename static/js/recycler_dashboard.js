history.pushState(null, null, location.href);
window.onpopstate = function(event) {
  history.go(1);
};

const acc_req = document.getElementsByClassName("accepted-requests")
const no_acc_req = document.getElementsByClassName("accepted-requests-label")[0]
if (acc_req[0].children[0].childElementCount<2) {
    no_acc_req.textContent = "No Accepted Requests as of now"
    acc_req[0].style.display = 'none'
}

const pend_req = document.getElementsByClassName("available-requests")
const no_pend_req = document.getElementsByClassName("available-requests-label")[0]
if (pend_req[0].children[0].childElementCount<2) {
    no_pend_req.textContent = "No Available Requests as of now"
    pend_req[0].style.display = 'none'
}

const pexe_req = document.getElementsByClassName("pending-verification-requests")
const no_pexe_req = document.getElementsByClassName("pending-verification-requests-label")[0]
if (pexe_req[0].children[0].childElementCount<2) {
    no_pexe_req.textContent = "You have not executed any requests as of now"
    pexe_req[0].style.display = 'none'
}

const exe_req = document.getElementsByClassName("executed-requests")
const no_exe_req = document.getElementsByClassName("executed-requests-label")[0]
if (exe_req[0].children[0].childElementCount<2) {
    no_exe_req.textContent = "You have not executed any requests as of now"
    exe_req[0].style.display = 'none'
}

// console.log(acc_req, pend_req);
const execute_form = document.getElementById("execute-order-form")
const execute_btns = document.getElementsByClassName("execute")
const close_execute_form_btn = document.getElementById("close-execute-form-button")

console.log(execute_btns);
// execute_btn.addEventListener("click", (event) => {
//   // console.log("Open");
//   event.preventDefault();
//   execute_form.style.display = "block"
// })

close_execute_form_btn.addEventListener("click", () => {
  // console.log("close");
  execute_form.style.display = "none"
})

const otp = document.getElementById("otp")

const form = document.getElementById("execute-form")
const validateOtp = () => {
  if (otp.value === null) {
    console.log(otp.value);
    return false
  }
  else {
    form.action = "/recycler/dashboard"
    return true
  }
}

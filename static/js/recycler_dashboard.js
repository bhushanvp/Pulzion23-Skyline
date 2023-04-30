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

// console.log(acc_req, pend_req);
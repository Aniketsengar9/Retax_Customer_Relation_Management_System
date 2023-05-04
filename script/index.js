//alert("hello")

// Emoloyees page
let dashboard = document.getElementById("dashboard-page");
let employee = document.getElementById("emp-div");
let employee_page = document.getElementById("employees-page");

employee.addEventListener("click", (event) => {
  event.preventDefault();

  dashboard.innerText="";
  dashboard.style.display = "none";
  employee_page.style.display = "inline";
  fetchData();
});

let data = [];
let tbody = document.querySelector("tbody");
let employee_url = "https://64528a67a2860c9ed40f2135.mockapi.io/employees";


function fetchData() {
  fetch(`${employee_url}?_page=1&_limit=10`)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      data = res;
      console.log(data);
      display(data);
    });
}
function display(data) {
  tbody.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    let img = document.createElement("img");
    let name = document.createElement("td");
    let posi = document.createElement("td");
    let dept = document.createElement("td");
    let status = document.createElement("td");
    let phNo = document.createElement("td");
    let email = document.createElement("td");
    let btn = document.createElement("td");

    img.src = data[i].profile_pic;
    img.style.borderRadius = "50%";
    img.style.marginTop = "6%";
    img.style.inlineSize = "65%";
    name.innerText = data[i].ename;
    posi.innerText = data[i].position;
    dept.innerText = data[i].dept;
    status.innerText = data[i].status;

    if(data[i].status=="Active"){
        status.classList="active-status";
    }
    phNo.innerText = data[i].phone;
    email.innerText = data[i].email;
    btn.innerHTML = "...";
    

    tr.append(img, name, posi, dept, status, phNo, email, btn);
    tbody.append(tr);
  }
}

//All div-pages
let dashboard_page = document.getElementById("dashboard-page");
let employee_page = document.getElementById("employees-page");
let calender_page = document.getElementById("calender-page");
let customer_page = document.getElementById("customers-page");
let leads_page = document.getElementById("leads-page");
let case_page = document.getElementById("cases-page");
let task_page = document.getElementById("task-page");

// All link tags of nav bar
let dashboard = document.getElementById("dashboard");
let task = document.getElementById("task");
let calender = document.getElementById("calender");
let employee = document.getElementById("employees");
let customers = document.getElementById("customers");
let cases = document.getElementById("cases");
let lead = document.getElementById("lead");

let setting = document.getElementById("setting");
let help = document.getElementById("help");
let logout = document.getElementById("logout");

// Dashboard dispaly fucntion

dashboard.addEventListener("click", () => {
  dashboard_page.style.display = "inline";
  task_page.style.display = "none";
  calender_page.style.display = "none";
  employee_page.style.display = "none";
  customer_page.style.display = "none";
  leads_page.style.display = "none";
  case_page.style.display = "none";
});

// Emoloyees page add display function

employee.addEventListener("click", (event) => {
  event.preventDefault();

  dashboard_page.style.display = "none";
  employee_page.style.display = "inline";
  calender_page.style.display = "none";
  task_page.style.display = "none";
  customer_page.style.display = "none";
  leads_page.style.display = "none";
  case_page.style.display = "none";
  fetchData();
});

// Fetch data from employee API

let tbody = document.querySelector("tbody");
let employee_url = new URL(
  "https://64528a67a2860c9ed40f2135.mockapi.io/employees"
);

function fetchData() {
  employee_url.searchParams.append("page", 1);
  employee_url.searchParams.append("limit", 10);

  fetch(employee_url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((data) => {
      display(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Append data in the t body by fetch request
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

    if (data[i].status == "Active") {
      status.classList = "active-status";
    }
    phNo.innerText = data[i].phone;
    email.innerText = data[i].email;
    btn.innerHTML = "...";

    tr.append(img, name, posi, dept, status, phNo, email, btn);
    tbody.append(tr);
  }
}



// search fucntion of employee page
let search_emp = document.getElementById("search_emp");

search_emp.addEventListener("input", () => {
  fetchSearchData(search_emp.value);
});
let data_search=[];
function fetchSearchData(name) {
  
   console.log(name);
    
   fetch(employee_url)
   .then((res) =>{
    return res.json();
   })
   .then((data) =>{
    data_search=data.filter((item) =>{
        console.log(item.ename.toUpperCase());
        if((item.ename.toUpperCase().includes(name.toUpperCase()))){
            return true;
        }
        else{
            return false;
        }
      });
      display(data_search)
   })
}


// Select salary range filter

// let salary=document.getElementById("salary");

// salary.addEventListener("select" ,() =>{
//     fetchSelectData(salary.value)
// });

// function fetchSelectData(name){
//     console.log("hi");
//     console.log(name);
// }
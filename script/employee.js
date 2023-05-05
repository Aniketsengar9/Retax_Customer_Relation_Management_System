//All div-pages
let employee_page = document.getElementById("employees-page");
let calender_page = document.getElementById("calender-page");
let customer_page = document.getElementById("customers-page");
let leads_page = document.getElementById("leads-page");
let case_page = document.getElementById("cases-page");
let task_page = document.getElementById("task-page");
let add_emp_form = document.getElementById("add-Employee-form");

// All link tags of nav bar
let task = document.getElementById("task");
let calender = document.getElementById("calender");
let employee = document.getElementById("employees");
let customers = document.getElementById("customers");
let cases = document.getElementById("cases");
let lead = document.getElementById("lead");

let setting = document.getElementById("setting");
let help = document.getElementById("help");
let logout = document.getElementById("logout");

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
  add_emp_form.style.display = "none";
  fetchData();
});

// Fetch data from employee API
let currentPage = 1;
let rowsPerPage = 8;
let tbody = document.querySelector("tbody");
let employee_url = new URL(
  "https://64528a67a2860c9ed40f2135.mockapi.io/employees"
);

let data;
let total;
async function fetchData() {
  fetch(employee_url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      data = res;

      // console.log(total);
      console.log(data);
      display(data);
    });
}

// Append data in the t body by fetch request

async function display(data) {
  total = data.length;
  paginationFunction(total);
  let startIndex = (currentPage - 1) * rowsPerPage;
  let endIndex = startIndex + rowsPerPage;
  let paginatedData = data.slice(startIndex, endIndex);

  tbody.innerHTML = "";
  for (let i = 0; i < paginatedData.length; i++) {
    let tr = document.createElement("tr");
    let img = document.createElement("img");
    let name = document.createElement("td");
    let posi = document.createElement("td");
    let dept = document.createElement("td");
    let status = document.createElement("td");
    let phNo = document.createElement("td");
    let email = document.createElement("td");
    let btn = document.createElement("td");

    img.src = paginatedData[i].profile_pic;
    img.style.borderRadius = "50%";
    img.style.marginTop = "6%";
    img.style.inlineSize = "65%";
    name.innerText = paginatedData[i].ename;
    posi.innerText = paginatedData[i].position;
    dept.innerText = paginatedData[i].dept;
    status.innerText = paginatedData[i].status;

    if (paginatedData[i].status == "Active") {
      status.classList = "active-status";
    }
    phNo.innerText = paginatedData[i].phone;
    email.innerText = paginatedData[i].email;
    btn.innerHTML = "...";

    tr.append(img, name, posi, dept, status, phNo, email, btn);
    tbody.append(tr);
  }
}

// create pagination links

async function paginationFunction(total) {
  pagination.innerHTML = "";
  if (total > rowsPerPage) {
    let totalPages = Math.ceil(total / rowsPerPage);
    let pagination = document.querySelector("#pagination");
    pagination.innerHTML = "";
    console.log(total);

    for (let i = 1; i <= totalPages; i++) {
      let btn = document.createElement("button");
      btn.innerHTML = i;
      btn.style.color = "red";
      btn.setAttribute("data-id", i);

      //add event listner
      btn.addEventListener("click", () => {
        currentPage = i;
        fetchData();
      });

      pagination.append(btn);
    }
  }
}
paginationFunction();

// search fucntion of employee page

let search_emp = document.getElementById("search_emp");

search_emp.addEventListener("input", () => {
  fetchSearchData(search_emp.value);
});

let search_Data = [];
function fetchSearchData(name) {
  fetch(employee_url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      search_Data = data.filter((item) => {
        if (item.ename.toUpperCase().includes(name.toUpperCase())) {
          return true;
        } else {
          return false;
        }
      });

      display(search_Data);
      paginationFunction(search_Data.length);
    });
}

// Select deptartment filter
let dept_data = [];

let department = document.getElementById("dept");

department.addEventListener("change", () => {
  fetchSelectData(department.value);
});

function fetchSelectData(name) {
  fetch(employee_url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(name);
      if (name == "") {
        display(data);
      } else {
        dept_data = data.filter((item) => {
          if (item.dept.toUpperCase() == name.toUpperCase()) {
            return true;
          }
        });
        display(dept_data);
        paginationFunction(dept_data.length);
      }
    });
}

// Add Employee button

let addButton = document.querySelector("#add-Employee-emp");

addButton.addEventListener("click", () => {
  employee_page.style.display = "none";
  add_emp_form.style.display = "inline";

});

// form submit for patch employee

/*

 <label>Department : </label><input type="text" id="emp_dept"><br>
                <label>Name : </label><input type="text" id="emp_name"><br>
                <label>Email : </label><input type="email" id="emp_email"><br>
                <label>Location : </label><input type="text" id="emp_location"><br>
                <label>Phone : </label><input type="number" id="emp_phone"><br>
                <label>Location : </label><input type="text" id="emp_location"><br>
                <label>Start Date : </label><input type="date" id="emp_start_date"><br>
                <label>Postion : </label><input type="text" id="emp_position"><br>
                <label>Profile-Pic : </label><input type="text" id="emp_profile"><br>
                <label>Status : </label><input type="text" id="emp_status"><br>
                <input type="submit"  id="emp_submit">
                <button id="emp_cancel">Cancel</button>

*/

let emp_name = document.getElementById("emp_name");
let emp_email = document.getElementById("emp_email");
let emp_location = document.getElementById("emp_location");
let emp_start_date = document.getElementById("emp_start_date");
let emp_phone = document.getElementById("emp_phone");
let emp_position = document.getElementById("emp_position");
let emp_profile = document.getElementById("emp_profile");
let emp_status=document.getElementById("emp_status");

let cancel = document.getElementById("emp_cancel");
let emp_submit = document.getElementById("emp_submit");


// emp_submit.addEventListener("click" ,(e) =>{
//     let obj={
//         dept: 
//         email: 
//         ename: 
//         location: 
//         phone: 
//         position: 
//         profile_pic: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
//         start_date: 
//         status: emp_status.value,

//     }
// })

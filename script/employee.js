
// Fetch data from employee API
let tbody = document.querySelector("tbody");
/*let employee_url = new URL(
  "https://64528a67a2860c9ed40f2135.mockapi.io/employees"
);*/
let delete_edit_div=document.getElementById("delete-edit");
let currentPage = 1;
let rowsPerPage = 5;
let data;
let total;

 let employee_url = "https://64528a67a2860c9ed40f2135.mockapi.io/employees"

fetchData();

 function fetchData() {
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
let del_edit_id=null;
let edit_data=null;

// Append data in the tbody by fetch request

 function display(data) {
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
    img.style.inlineSize = "10%";
    img.style.width = "50px";
    name.innerText = paginatedData[i].ename;
    posi.innerText = paginatedData[i].position;
    dept.innerText = paginatedData[i].dept;
    status.innerText = paginatedData[i].status;

    if (paginatedData[i].status == "Active") {
      status.classList = "active-status";
    }else if(paginatedData[i].status == "In a Meeting"){
      status.classList = "meeting-status";
    }
    else if(paginatedData[i].status == "Out Sick"){
      status.classList = "sick-status";
    }
    phNo.innerText = paginatedData[i].phone;
    email.innerText = paginatedData[i].email;
    btn.innerHTML = "...";
    
    btn.addEventListener("click" , ()=>{
      edit_data=paginatedData[i];
      del_edit_id=paginatedData[i].id;
      delete_edit_div.classList.add("active-delete-button")
    })

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
    console.log("JF");

    for (let i = 1; i <= totalPages; i++) {
      let btn = document.createElement("button");
      btn.innerHTML = i;
      // btn.style.color = "red";
      btn.setAttribute("data-id", i);

      //add event listner
      btn.addEventListener("click", () => {
        console.log("hello")
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
          console.log(item.dept)
          if (item.dept.toUpperCase() == name.toUpperCase()) {
            return true;
          }
        });
       // console.log(dept_data)
       
        display(dept_data);
        paginationFunction(dept_data.length);
      }
    });
}


// Select Status filter 
let status_data = [];

let estatus=document.getElementById("estatus");

estatus.addEventListener("change", () => {
  fetchStatusData(estatus.value);
});

function fetchStatusData(name) {
  fetch(employee_url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(name);
      if (name == "") {
        display(data);
      } else {
        status_data = data.filter((item) => {
          if (item.status.toUpperCase() == name.toUpperCase()) {
            return true;
          }
        });
        if(status_data.length==0)
       {
        tbody.innerHTML="";
        let h1=document.createElement("h1");
        h1.innerHTML
        =("No Record Found");
        tbody.append(h1);
       }
       else{
        display(status_data);
       }
        paginationFunction(status_data.length);
      }
    });
}


// Select Status filter 
let position_data = [];

let empPosition=document.getElementById("postion");

empPosition.addEventListener("change", () => {
  fetchPositionData(empPosition.value);
});

function fetchPositionData(name) {
  fetch(employee_url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(name);
      if (name == "") {
        display(data);
      } else {
        position_data = data.filter((item) => {
          if (item.position.toUpperCase() == name.toUpperCase()) {
            return true;
          }
        });
       // if()
        display(position_data);
        paginationFunction(position_data.length);
      }
    });
}

//console.log(del_edit_id)
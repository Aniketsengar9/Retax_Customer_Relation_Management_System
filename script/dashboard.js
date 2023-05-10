let logout = document.querySelector("#logout");
logout.addEventListener("click",function(){
    window.location.href = "index.html";
})

let employee_url = "https://64528a67a2860c9ed40f2135.mockapi.io/employees";


let overlays = document.querySelector("#overlay");    
let cancel = document.getElementById("emp_cancel");
let emp_submit = document.getElementById("emp_submit");
let add_emp_form = document.getElementById("add-Employee-form");
let add_Employee_dashboard=document.getElementById("add-Employee-dashboard");

add_Employee_dashboard.addEventListener("click", () => {
  // employee_page.style.display = "none";
  add_emp_form.style.display = "inline";
  // delete_edit_div.style.display = "none";
  document.getElementById("add-Employee-form").classList.add("active");
  overlays.classList.add("active");
  setup="Add";
});

document.getElementById("emp_cancel").addEventListener("click", () => {
    document.getElementById("add-Employee-form").classList.remove("active");
    overlays.classList.remove("active");
    add_emp_form.style.display = "none";
  });
 


  let emp_name = document.getElementById("emp_name");
  let emp_dept = document.getElementById("emp_dept");
  let emp_email = document.getElementById("emp_email");
  let emp_location = document.getElementById("emp_location");
  let emp_start_date = document.getElementById("emp_start_date");
  let emp_phone = document.getElementById("emp_phone");
  let emp_position = document.getElementById("emp_position");
  let emp_profile = document.getElementById("emp_profile");
  let emp_status = document.getElementById("emp_status");
  emp_submit.addEventListener("click", () => {
    let obj = {
        dept: emp_dept.value,
        email: emp_email.value,
        ename: emp_name.value,
        location: emp_location.value,
        phone: emp_phone.value,
        position: emp_position.value,
        profile_pic: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
        start_date: emp_start_date.value,
        status: emp_status.value,
      };
    fetch(employee_url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          alert("Data Added");
          console.log(data);
          document.getElementById("add-Employee-form").classList.remove("active");
          overlays.classList.remove("active");
          add_emp_form.style.display = "none";
        })
        .catch((error) => {
          console.log(error);
        });
    });


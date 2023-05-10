
let setup;

let body = document.querySelector("#navbar");
body.addEventListener("click", () => {
  delete_edit_div.classList.remove("active-delete-button");
});
// Add Employee button
let overlays = document.querySelector("#overlay");
let addButton = document.querySelector("#add-Employee-emp");
let cancel = document.getElementById("emp_cancel");
let emp_submit = document.getElementById("emp_submit");

// Edit Delete Employee
let edit_btn = document.getElementById("edit-emp");
let delete_btn = document.getElementById("delete-emp");

let add_emp_form = document.getElementById("add-Employee-form");

addButton.addEventListener("click", () => {
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

// Patch function

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
if(setup=="Edit"){

    fetch(`${employee_url}/${del_edit_id}`, {
  method: 'PUT', // or PATCH
  headers: {'content-type':'application/json'},
  body: JSON.stringify(obj)
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(task => {
  fetchData();
  document.getElementById("add-Employee-form").classList.remove("active");
          overlays.classList.remove("active");
          add_emp_form.style.display = "none";  
}).catch(error => {
  // handle error
})

}else{
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
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
}
  
});

// Delete

delete_btn.addEventListener("click", () => {
  console.log(del_edit_id);
  deleteDataFunction(del_edit_id);
});

function deleteDataFunction(id){
    fetch(`${employee_url}/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          
        })
        .then((task) => {
           // alert("Data Deleted")
          fetchData();
        })
        .catch((error) => {
         console.log(error);
        });

}



edit_btn.addEventListener("click", () => {
  
     add_emp_form.style.display = "inline";
     delete_edit_div.style.display = "none";
     document.getElementById("add-Employee-form").classList.add("active");
     overlays.classList.add("active");
    console.log()
     emp_name.value=edit_data.ename;
     emp_dept.value=edit_data.dept;
     emp_email.value=edit_data.email;
     emp_location.value=edit_data.location;
     emp_position.value=edit_data.position;
     emp_phone.value=edit_data.phone;
     emp_start_date.value=edit_data.start_date;
     emp_profile.value=edit_data.profile_pic;
     emp_status.value=edit_data.status;
    setup="Edit";
    // deleteDataFunction(edit_data.id);

});


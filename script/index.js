//All div-pages
let dashboard_page = document.getElementById("dashboard-page");



// All link tags of nav bar
let dashboard = document.getElementById("dashboard");


// Dashboard dispaly fucntion

dashboard.addEventListener("click", () => {
  dashboard_page.style.display = "inline";
  task_page.style.display = "none";
  calender_page.style.display = "none";
  employee_page.style.display = "none";
  customer_page.style.display = "none";
  leads_page.style.display = "none";
  case_page.style.display = "none";
  add_emp_form.style.display="none";
});


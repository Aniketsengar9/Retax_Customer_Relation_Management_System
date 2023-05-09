// Customer page add display function




// let cPagination = document.querySelector("#cPagination")
let array = [];
let ctbody = document.querySelector("#cTBody");
let additionalBtn = document.querySelector("#additionalBtn");
// let ediv = document.querySelector("#edit-customer-form");


let customer_url = "https://64528a67a2860c9ed40f2135.mockapi.io/customers"
let cData;
let cTotal;

cFetchData()

function cFetchData(page = 1) {
    fetch(customer_url)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        cData = res;
        array = res;
        // console.log(total);
        currentPage = page
        // console.log(cData);
        cDisplay(res);
    });
}


let itemsPerPage = 3// Number of items to show per page
let currentPage = 1 // Current page number
let del = document.querySelector("#delete");
let edit = document.querySelector("#edit");
let ediv = document.querySelector("#edit-customer-form");
let tempData = {};
// function del(data){
//     fetch
// }
function cDisplay(cData) {
    cTotal = cData.length;
    ctbody.innerHTML = "";

    // Calculate the start and end index of the current page
    let startIndex = (currentPage - 1) * itemsPerPage
    let endIndex = startIndex + itemsPerPage

    // Get the current page items
    let paginatedData = cData.slice(startIndex, endIndex);

    for (let i = 0; i < paginatedData.length; i++) {
        let customer = paginatedData[i];

        // Create the table row and cells
        let tr = document.createElement("tr");
        let mpic = document.createElement("img");
        let fpic = document.createElement("img");
        let mname = document.createElement("td");
        let fname = document.createElement("td");
        let caseID = document.createElement("td");
        let caseStatus = document.createElement("td");
        let familyStatus = document.createElement("td");
        let mNo = document.createElement("td");
        let fNo = document.createElement("td");
        let mEmail = document.createElement("td");
        let fEmail = document.createElement("td");
        let mDOB = document.createElement("td");
        let fDOB = document.createElement("td");
        let cAdd = document.createElement("td");
        let btn = document.createElement("td");
        // Set the content and style of table cells
        mpic.src = customer.m_pic;
        mpic.style.borderRadius = "50%";
        mpic.style.marginTop = "6%";
        mpic.style.inlineSize = "8%";
        mpic.style.width = "40px";

        fpic.src = customer.f_pic;
        fpic.style.borderRadius = "50%";
        fpic.style.marginTop = "10%";
        fpic.style.inlineSize = "20%";
        fpic.style.width = "50px";


        mname.innerText = customer.mName;
        fname.innerText = customer.fName;
        caseID.innerText = customer.caseID;
        caseStatus.innerText = customer.caseStatus;
        if (customer.caseStatus == "Completed") {
            caseStatus.style.color = "#52C41A"
            caseStatus.style.backgroundColor = "#f6ffed"
            // caseStatus.style.fontSize = "20px"           
        } else if (customer.caseStatus == "In progress") {
            caseStatus.style.color = "#1890FF"
            caseStatus.style.backgroundColor = "#e6f7ff"
            // caseStatus.style.fontSize = "20px"
        } else {
            caseStatus.style.color = "#FA541C"
            caseStatus.style.backgroundColor = "#fff7f2"
            // caseStatus.style.fontSize = "20px"
        }

        familyStatus.innerText = customer.familyStatus;
        mNo.innerText = customer.mNumber;
        fNo.innerText = customer.fNumber;
        mEmail.innerText = customer.mEmail;
        fEmail.innerText = customer.fEmail;
        mDOB.innerText = customer.mDOB;
        fDOB.innerText = customer.fDOB;
        cAdd.innerText = customer.Address;
        btn.innerHTML = "...";
        // btn.addEventListener("click",function(){
        //     additionalBtn.style.display="block";
        //     tempData= customer;
        //     console.log(tempData);
        //     del.addEventListener("click", function (e) {
        //         e.preventDefault()
        //         let delId = customer.id
        //         fetch(`${customer_url}/${ delId }`, {
        //             method: "DELETE"
        //         })
        //             .then(function (res) {
        //                 return res.json();
        //             })
        //             .then(function (data) {
        //                 // location.reload();
        //                 cFetchData();
        //                 alert("Deleted Successfully")
        //                 cDisplay(data);
        //             })
        //             .catch(function (e) {
        //                 console.log(e);
        //             })
        //     })

        // })

        btn.addEventListener("click", function () {
            additionalBtn.style.display = "block";
            tempData = customer;
            console.log(tempData);
            del.addEventListener("click", function (e) {
                e.preventDefault();
                let delId = customer.id;
                fetch(`${customer_url}/${delId}`, {
                    method: "DELETE"
                })
                    .then(function (res) {
                        return res.json();
                    })
                    .then(function (data) {
                        // location.reload();
                        cFetchData();
                        // alert("Deleted Successfully");
                        // Show the popup div
                        document.getElementById("deletedmodel").style.display = "block";
                        cDisplay(data);
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
            });
            // edit.addEventListener("click",function(e){
            //     e.preventDefault();
            //     let ediv = document.querySelector("#edit-customer-form");
            //     ediv.style.display="block";
            //     let eId = customer.id;
            //     let edit_submit = document.querySelector("#edit_submit");
            //     edit_submit.addEventListener("click",function(){
            //         let em_pic = document.querySelector("#em_pic");
            //         let em_name = document.querySelector("#em_name");
            //         let em_No = document.querySelector("#em_No");
            //         let em_Email = document.querySelector("#em_Email");
            //         let em_Age = document.querySelector("#em_Age");
            //         let ecase_ID = document.querySelector("#ecase_ID");
            //         let e_Address = document.querySelector("#e_Address");
            //         let ecase_Status = document.querySelector("#ecase_Status");
            //         let efamily_Status = document.querySelector("#efamily_Status");
            //         let ef_pic = document.querySelector("#ef_pic");
            //         let ef_name = document.querySelector("#ef_name");
            //         let ef_No = document.querySelector("#ef_No");
            //         let ef_Email = document.querySelector("#ef_Email");
            //         let ef_Age = document.querySelector("#ef_Age");

            //         let ecustData = {
            //             m_pic: em_pic.value,
            //             f_pic: ef_pic.value,
            //             mName: em_name.value,
            //             fName: ef_name.value,
            //             caseID: ecase_ID.value,
            //             caseStatus: ecase_Status.value,
            //             familyStatus: efamily_Status.value,
            //             mNumber: em_No.value,
            //             fNumber: ef_No.value,
            //             mEmail: em_Email.value,
            //             fEmail: ef_Email.value,
            //             mDOB: em_Age.value,
            //             fDOB: ef_Age.value,
            //             Address: e_Address.value
            //         }
            //         fetch(`${customer_url}/${eId}`, {
            //             method: "PUT",
            //             headers: { 'content-type': 'application/json' },
            //             body: JSON.stringify({
            //                 ecustData
            //             })
            //         })
            //             .then((res) => res.json())
            //             .then((data) => {
            //                 console.log(data, "update")
            //                 alert("Updated Succesfully")
            //                 cFetchData();
            //                 cDisplay(data);
            //                 // location.reload();
            //             })
            //             .catch((error) => {
            //                 console.error('Error:', error);
            //             });

            //     })


            // })
            edit.addEventListener("click", function (e) {
                e.preventDefault();
                ediv.style.display = "block";
                let eId = customer.id;
                let edit_submit = document.querySelector("#edit_submit");

                edit_submit.addEventListener("click", function (e) {
                    e.preventDefault();
                    let em_pic = document.querySelector("#em_pic");
                    let em_name = document.querySelector("#em_name");
                    let em_No = document.querySelector("#em_No");
                    let em_Email = document.querySelector("#em_Email");
                    let em_Age = document.querySelector("#em_Age");
                    let ecase_ID = document.querySelector("#ecase_ID");
                    let e_Address = document.querySelector("#e_Address");
                    let ecase_Status = document.querySelector("#ecase_Status");
                    let efamily_Status = document.querySelector("#efamily_Status");
                    let ef_pic = document.querySelector("#ef_pic");
                    let ef_name = document.querySelector("#ef_name");
                    let ef_No = document.querySelector("#ef_No");
                    let ef_Email = document.querySelector("#ef_Email");
                    let ef_Age = document.querySelector("#ef_Age");

                    let ecustData = {
                        m_pic: em_pic.value,
                        f_pic: ef_pic.value,
                        mName: em_name.value,
                        fName: ef_name.value,
                        caseID: ecase_ID.value,
                        caseStatus: ecase_Status.value,
                        familyStatus: efamily_Status.value,
                        mNumber: em_No.value,
                        fNumber: ef_No.value,
                        mEmail: em_Email.value,
                        fEmail: ef_Email.value,
                        mDOB: em_Age.value,
                        fDOB: ef_Age.value,
                        Address: e_Address.value,
                    };

                    // Remove the surrounding curly braces from JSON.stringify()
                    fetch(`${customer_url}/${eId}`, {
                        method: "PUT",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(ecustData) // Remove the object wrapping
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data, "update");
                            // alert("Updated Successfully");
                            cFetchData();
                            // cDisplay(data);
                            // ediv.style.display = "none"; // Hide the edit form
                            location.reload();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                });
            });



        });

        tr.append(mpic, mname, caseID, caseStatus, familyStatus, mNo, mEmail, mDOB, cAdd, btn)
        // Append the table row to the table body
        ctbody.appendChild(tr);

        if (customer.familyStatus === "Married") {
            // Create additional row for married customers
            let tr2 = document.createElement("tr");
            let emptyCell1 = document.createElement("td");
            let emptyCell2 = document.createElement("td");
            let emptyCell3 = document.createElement("td")
            let emptyCell4 = document.createElement("td");

            emptyCell1.innerHTML = "&nbsp;"; // Add non-breaking space for empty cells
            emptyCell2.innerHTML = "&nbsp;";
            emptyCell3.innerHTML = "&nbsp;";
            emptyCell4.innerHTML = "&nbsp;";
            // Append the additional cells to the additional row
            // ...

            // Append the additional row to the table body
            tr2.append(fpic, fname, emptyCell1, emptyCell2, emptyCell3, fNo, fEmail, fDOB, emptyCell4)
            ctbody.appendChild(tr2);
        }
    }
    let totalPages = Math.ceil(cData.length / itemsPerPage);
    let cPagination = document.querySelector("#cPagination");

    cPagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let link = document.createElement("a");
        link.href = "#";
        link.innerText = i;

        if (i === currentPage) {
            link.classList.add("active");
        }

        link.addEventListener("click", function (event) {
            event.preventDefault();
            cFetchData(i); // Pass the page number as an argument
            console.log("clicked")
        });
        cPagination.appendChild(link);
    }
}

// Close the popup when clicked outside the div
window.addEventListener("click", function (event) {
    let deletedModel = document.getElementById("deletedmodel");
    if (event.target == deletedModel) {
        deletedModel.style.display = "none";
    }
});
// Customer page add display function
// Search filter
let search = document.querySelector("#search_cust");
search.oninput = () => {
    let f = array.filter(function (el) {
        if (el.mName.toUpperCase().includes(search.value.toUpperCase()) === true || el.fName.toUpperCase().includes(search.value.toUpperCase()) === true) {
            return true
        }
        else {
            return false
        }
    })
    cDisplay(f)
}

//status filter
// Add event listeners to the filter dropdowns
document.getElementById("cStatus").addEventListener("change", handleFilter);
document.getElementById("family").addEventListener("change", handleFilter);

function handleFilter() {
    // Get the selected values from the dropdowns
    let status = document.getElementById("cStatus").value;
    let familyStatus = document.getElementById("family").value;

    // Apply filters and display the filtered data
    let filteredData = filterData(status, familyStatus);
    cDisplay(filteredData);
}

function filterData(status, familyStatus) {
    let filteredData = array;

    // Apply filters if selected
    if (status) {
        filteredData = filteredData.filter(customer => customer.caseStatus === status);
    }
    if (familyStatus) {
        filteredData = filteredData.filter(customer => customer.familyStatus === familyStatus);
    }

    return filteredData;
}

// Ascending Sort
let sortU = document.querySelector("#ascAge");
sortU.addEventListener("click", function () {
    let temp = cData.sort(function (a, b) {
        return a.mDOB - b.mDOB;
    });
    cDisplay(temp);
})
// Descending Sort
let sortD = document.querySelector("#desAge");
sortD.addEventListener("click", function () {
    let temp = cData.sort(function (a, b) {
        return b.mDOB - a.mDOB;
    });
    cDisplay(temp);
})


// Customer addition
let add_customer = document.querySelector("#add-customer");
let add_customer_form = document.querySelector("#add-customer-form");
let close_btn = document.querySelector("#close-btn");
let cust_cancel = document.querySelector("#cust_cancel");
let customer = document.querySelector("#customer");
let family_Status = document.querySelector("#family_Status");
let partnerInfo = document.querySelector("#partnerInfo");

// display popup
add_customer.addEventListener("click", function () {
    add_customer_form.style.display = "block";
});
// close button to display the form
close_btn.addEventListener("click", function () {
    add_customer_form.style.display = "none";
})
// form cancel button
cust_cancel.addEventListener("click", function () {
    add_customer_form.style.display = "none";
})
// partern div appearance
family_Status.addEventListener("change", function () {
    if (family_Status.value == "Married") {
        partnerInfo.style.display = "block"
    } else {
        partnerInfo.style.display = "none"
    }
})

//form data input inital
let m_pic = document.querySelector("#m_pic");
let m_name = document.querySelector("#m_name");
let m_No = document.querySelector("#m_No");
let m_Email = document.querySelector("#m_Email");
let m_Age = document.querySelector("#m_Age");
let case_ID = document.querySelector("#case_ID");
let _Address = document.querySelector("#_Address");
let case_Status = document.querySelector("#case_Status");
let f_pic = document.querySelector("#f_pic");
let f_name = document.querySelector("#f_name");
let f_No = document.querySelector("#f_No");
let f_Email = document.querySelector("#f_Email");
let f_Age = document.querySelector("#f_Age");
let submit = document.querySelector("#cust_submit");

submit.addEventListener("click", function (e) {
    e.preventDefault();
    let custData = {
        m_pic: m_pic.value,
        f_pic: f_pic.value,
        mName: m_name.value,
        fName: f_name.value,
        caseID: case_ID.value,
        caseStatus: case_Status.value,
        familyStatus: family_Status.value,
        mNumber: m_No.value,
        fNumber: f_No.value,
        mEmail: m_Email.value,
        fEmail: f_Email.value,
        mDOB: m_Age.value,
        fDOB: f_Age.value,
        Address: _Address.value
    }
    // console.log(custData);
    // post part
    fetch(customer_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(custData)
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            // console.log("Data Posted Successfully")
            document.getElementById("addedmodel").style.display = "block";
        })
        .catch(function (e) {
            console.log(e)
        })
    add_customer_form.style.display = "none";
    // partnerInfo.style.display = "none"
})
// clsoe button
let closeBtn = document.querySelector(".close");


closeBtn.addEventListener("click", function () {
    // Hide the popup div
    document.getElementById("deletedmodel").style.display = "none";
});

let closeBtnAdded = document.querySelector("#addedmodel .close1");
closeBtnAdded.addEventListener("click", function () {
    // Hide the popup div
    document.getElementById("addedmodel").style.display = "none";
});
document.addEventListener("click", function (event) {
    if (!event.target.closest("#addedmodel") && !event.target.matches(".close1")) {
        // Clicked outside the addedmodel div, hide it
        document.getElementById("addedmodel").style.display = "none";
    }
});

let ecloseBtn = document.querySelector("#eclose-btn1");
ecloseBtn.addEventListener("click", function () {
    
    ediv.style.display = "none";
});
edit_submit.addEventListener("click", function () {
    
    ediv.style.display = "none";
});
let editCancelBtn = document.querySelector("#edit_cancel");
editCancelBtn.addEventListener("click", function () {
    ediv.style.display = "none";
});

let logout = document.querySelector("#logout");
logout.addEventListener("click", function () {
    window.location.href = "index.html";
})
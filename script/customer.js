// Customer page add display function




// let cPagination = document.querySelector("#cPagination")
let ctbody = document.querySelector("#cTBody");
let customer_url ="https://64528a67a2860c9ed40f2135.mockapi.io/customers"
let cData;
let cTotal;

cFetchData()

function cFetchData(page=1) {
    fetch(customer_url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            cData = res;
            // console.log(total);
            currentPage=page
            // console.log(cData);
            cDisplay(res);
        });
}


let itemsPerPage = 5// Number of items to show per page
let currentPage = 1 // Current page number

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
        mpic.style.inlineSize = "10%";
        mpic.style.width = "50px";

        fpic.src = customer.f_pic;
        fpic.style.borderRadius = "50%";
        fpic.style.marginTop = "10%";
        fpic.style.inlineSize = "20%";
        fpic.style.width = "50px";


        mname.innerText = customer.mName;
        fname.innerText = customer.fName;
        caseID.innerText = customer.caseID;
        caseStatus.innerText = customer.caseStatus;
        if (customer.caseStatus =="Completed"){
            caseStatus.style.color="#52C41A"
            caseStatus.style.backgroundColor ="#f6ffed"
            // caseStatus.style.fontSize = "20px"           
        } else if (customer.caseStatus == "In progress"){
            caseStatus.style.color = "#1890FF"
            caseStatus.style.backgroundColor = "#e6f7ff"
            // caseStatus.style.fontSize = "20px"
        }else{
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

    // cPaginationFunction(Math.ceil(cTotal / rowPage));
}
// Customer page add display function

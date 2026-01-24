const viewBtn = document.querySelector("#addnew");
const inputContainer = document.querySelector("#input-container");
const expenseAmount = document.querySelector("#amount-input-el")
const expenseDate = document.querySelector("#expense-date")
const expenseCat = document.querySelector("#expense-cat")
const submitBtn = document.querySelector("#submit")
const payMeth = document.querySelector("#paymentmethod")



// Format Date
function formatDateDMY(isoDate) {
    // isoDate: "Year-Month-Day"
    if (!isoDate) return;
    const [y, m, d] = isoDate.split("-");
    return `${d}/${m}/${y}`;
}


// Make input area visible when adding a new item
function showContainer() {
    inputContainer.classList.toggle("hidden")
}

viewBtn.addEventListener("click", showContainer);

let state = { expenses: [] };


const STORAGE_KEY = "Expense_Tracker.v1"

//Load from LocalStorage 
function loadState() {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (!rawState) return; // nothing saved
    
   
        state = JSON.parse(rawState);

       if (!state.expenses) {
        state.expenses = []
       }

    
}

// Save to LocalStorage
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let expenseView = document.querySelector("#expense_view");
if (!expenseView) {
   
}

expenseView.addEventListener("click", function(e) {
    const btn = e.target.closest(".delete-btn"); // target to the closest with the css class selector to avoid that the span will be clicked instead of the btn
    if(!btn) return;

    const idToDelete = btn.dataset.id; // getting the id which is assigned to the btn with data-id="${expense.id} which saves our expense.id to the html button
    state.expenses = state.expenses.filter(exp => exp.id !== idToDelete); // creates a new array and we keep only id's which are not idToDelete

    saveState();
    render();
});


// Start 
loadState();
render();

// Render Data in Table
function render() {
    if (!expenseView) return;
   
    let rows = "";

    for (const expense of state.expenses) {
        rows += `<tr>
                    <td>${formatDateDMY(expense.date)}</td>
                    <td>${expense.category}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.currency}</td>
                     <td>${expense.payment}</td>
                     <td>
                        <button class="delete-btn" data-id="${expense.id}" title="Delete">
                        <span class="material-symbols-outlined">delete</span>
                        </button></td>
                </tr>`;
    }
    expenseView.innerHTML = rows;
   
}
 
expenseView.addEventListener("click", function(e) {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;

    const idToDelete = btn.dataset.id; // will add the info of the id of the element next to the button
    state.expenses = state.expenses.filter(exp => exp.id !== idToDelete); // creating a new array were the id we deleted will be not included

    saveState();
    render();
});

// Submit Handler 

// generate new state input
submitBtn.addEventListener("click", function(e) {

    e.preventDefault(); // prevent releoad/input overrite if buttom is in a form

    const id = crypto.randomUUID()
    const curr = document.querySelector('input[name="currency"]:checked')
    if (!curr) {
        alert("Please select a currency");
        return;
    }


    const expense = {
        id: id,
        amount: Number(expenseAmount.value),
        currency: curr.value,
        date: expenseDate.value,
        category: expenseCat.value,
        payment: payMeth.value,

    };

    state.expenses.push(expense);
    saveState();
    expenseAmount.value = "";
    render();



})

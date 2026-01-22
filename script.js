const viewBtn = document.querySelector("#addnew");
const inputContainer = document.querySelector("#input-container");


// Make input area visible when adding a new item
function showContainer() {
    inputContainer.classList.toggle("hidden")
}

viewBtn.addEventListener("click", showContainer);

let state = { expenses: [] };

state.expenses.push({id:"1"})

const STORAGE_KEY = "Expense_Tracker.v1"

// Save to LocalStorage
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
saveState();

//Load from LocalStorage 
function loadState() {
    const readExpense = localStorage.getItem(STORAGE_KEY, JSON.parse(state));
}


// DOM Selectors
const form = document.querySelector(".transaction-form");
const button = document.getElementById("transaction-btn");
const descEl = document.getElementById("desc");
const amountEl = document.getElementById("amount");
const totalBalanceEl = document.getElementById("total-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const cardsContainer = document.querySelector(".transaction-lists");

// Initializing income and expense variable
let totalIncome = 0;
let totalExpense = 0;

// Making transaction cards based on input
function makeCards(desc, amount) {
  const childCards = `
            <li class="">
              <span>${desc}</span>
              <span>$${amount}</span>
            </li>
  `;
  const li = document.createElement("li");
  li.classList.add("trans-child");

  if (amount < 0) {
    li.classList.add("border-red");
  } else {
    li.classList.add("border-green");
  }

  li.innerHTML = childCards;

  cardsContainer.appendChild(li);
}

// Function for listener
function addTransaction() {
  const descVal = descEl.value;
  const amountVal = Number.parseFloat(amountEl.value);

  // Card function invoking
  makeCards(descVal, amountVal);

  if (amountVal < 0) {
    // Computing expenses
    totalExpense += Math.abs(amountVal);
  } else {
    // Computing incomes
    totalIncome += amountVal;
  }

  // Computing main balance
  let mainBalance = totalIncome - totalExpense;
  if (mainBalance < 0) {
    mainBalance = 0;
  }

  // Manipulating DOM
  totalBalanceEl.textContent = mainBalance;
  totalIncomeEl.textContent = totalIncome;
  totalExpenseEl.textContent = totalExpense;

  // Blanking inputs
  descEl.value = "";
  amountEl.value = "";
}

// Button listener
button.addEventListener("click", addTransaction);

// Preventing from reload
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

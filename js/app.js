// DOM Selectors
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
              <span>${desc}</span>
              <span>$${amount}</span>
  `;
  const li = document.createElement("li");
  li.classList.add("trans-child");
  li.innerHTML = childCards;
  return li;
}

function borderColor(tag) {
  tag.style.borderColor = "#d32a25";
  tag.addEventListener("mousedown", () => {
    tag.style.borderColor = "#38aa6a";
  });
  tag.addEventListener("mouseleave", () => {
    tag.style.borderColor = "#ddd";
  });
}

// Function for listener
function addTransaction(e) {
  e.preventDefault();

  const descVal = descEl.value;
  const amountVal = Number.parseFloat(amountEl.value);

  if (descVal === "") {
    borderColor(descEl);
    return;
  } else if (amountEl.value === "" || amountVal === 0) {
    borderColor(amountEl);
    return;
  }

  const li = makeCards(descVal, amountVal);
  cardsContainer.appendChild(li);

  if (amountVal < 0) {
    // Computing expenses
    li.classList.add("border-red");
    totalExpense += Math.abs(amountVal);
  } else {
    // Computing incomes
    li.classList.add("border-green");
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

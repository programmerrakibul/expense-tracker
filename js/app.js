const descEl = document.getElementById("desc");
const amountEl = document.getElementById("amount");
const totalBalanceEl = document.getElementById("total-balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const cardsContainer = document.querySelector(".transaction-lists");
let totalIncome = 0;
let totalExpense = 0;

function makeCards(desc, amount) {
  const cards = `
            <li class="trans-child">
              <span>${desc}</span>
              <span>$${amount}</span>
            </li>
  `;

  cardsContainer.innerHTML += cards;
}

function addTransaction() {
  const descVal = descEl.value;
  let amountVal = amountEl.value;
  amountVal = Number.parseFloat(amountVal);

  makeCards(descVal, amountVal);

  if (amountVal < 0) {
    totalExpense += Math.abs(amountVal);
  } else {
    totalIncome += amountVal;
  }

  let mainBalance = totalIncome - totalExpense;
  if (mainBalance < 0) {
    mainBalance = 0;
  }

  totalBalanceEl.textContent = mainBalance;
  totalIncomeEl.textContent = totalIncome;
  totalExpenseEl.textContent = totalExpense;
  // descEl.value = "";
  // amountEl.value = "";
}

const button = document.getElementById("transaction-btn");
button.addEventListener("click", addTransaction);

// Preventing from reload
const form = document.querySelector(".transaction-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let balance = 0;
let income = 0;
let expense = 0;

const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');
const transactionList = document.getElementById('transactionList');
const addTransactionBtn = document.getElementById('addTransaction');

addTransactionBtn.addEventListener('click', () => {
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (description === '' || isNaN(amount)) {
    alert("Please enter a valid description and amount");
    return;
  }

  // Add to transaction list
  const transactionItem = document.createElement('li');
  transactionItem.innerText = `${description}: $${amount}`;

  if (amount > 0) {
    income += amount;
    transactionItem.classList.add('income');
  } else {
    expense += Math.abs(amount);
    transactionItem.classList.add('expense');
  }

  balance += amount;

  // Update the balance and display
  updateDisplay();

  transactionList.appendChild(transactionItem);

  // Clear the input fields
  descriptionInput.value = '';
  amountInput.value = '';
});

function updateDisplay() {
  balanceDisplay.innerText = balance.toFixed(2);
  incomeDisplay.innerText = income.toFixed(2);
  expenseDisplay.innerText = expense.toFixed(2);
}
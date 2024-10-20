let balance = 0;
const balanceElement = document.getElementById('balance');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateBalance() {
  balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  balanceElement.textContent = balance.toFixed(2);
}

function addTransaction(e) {
  e.preventDefault();
  
  const text = document.getElementById('transaction-text').value;
  const amount = parseFloat(document.getElementById('transaction-amount').value);

  if (!text || !amount) return;

  const transaction = {
    id: Math.floor(Math.random() * 1000000),
    text,
    amount,
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateBalance();
  renderTransactions();
  transactionForm.reset();
}

function deleteTransaction(id) {
  const index = transactions.findIndex(transaction => transaction.id === id);
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateBalance();
  renderTransactions();
}

function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.classList.add('flex', 'justify-between', 'bg-neon-green', 'mb-2', 'px-4', 'py-2');
    li.innerHTML = `
      <span>${transaction.text}</span>
      <span>$${transaction.amount.toFixed(2)}</span>
      <button onclick="deleteTransaction(${transaction.id})" class="arcade-btn text-neon-pink">❌</button>
    `;
    transactionList.appendChild(li);
  });
}

transactionForm.addEventListener('submit', addTransaction);
window.onload = function() {
  renderTransactions();
  updateBalance();
};

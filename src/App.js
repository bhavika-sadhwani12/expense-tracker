import "./styles.css";
import { useState, useEffect } from "react";
import ExpenseRow from "./ExpenseRow";
export default function App() {
  const [showList, setShowList] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [date, setDate] = useState("");
  const [moneySpent, setMoneySpent] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    let result = 0;
    for (let i = 0; i < expenses.length; i++) {
      result += Number(expenses[i].moneySpent);
    }
    setTotalSpent(result);

    const totals = {};
    expenses.forEach((expense) => {
      const category = expense.expenseCategory.trim().toLowerCase();
      if (totals[category]) {
        totals[category] += Number(expense.moneySpent);
      } else {
        totals[category] = Number(expense.moneySpent);
      }
    });
    setCategoryTotals(totals);
  }, [expenses]);

  function handleAdd() {
    const newExpense = {
      expenseName,
      expenseCategory,
      date,
      moneySpent,
    };
    if (!expenseName || !expenseCategory || !date || moneySpent <= 0) {
      return;
    }
    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setExpenseCategory("");
    setDate("");
    setMoneySpent(0);
  }
  function handleDelete(deletedItem) {
    const finalItems = expenses.filter((item) => item.id !== deletedItem);
    setExpenses(finalItems);
  }

  return (
    <div className="App">
      <h1 className="app-title">Expense Tracker</h1>
      <div>
        <input
          className="expense-input"
          type="text"
          placeholder="Enter expense name"
          onChange={(e) => setExpenseName(e.target.value)}
          value={expenseName}
        />
        <input
          className="expense-input"
          type="text"
          placeholder="Enter expense category"
          onChange={(e) => setExpenseCategory(e.target.value)}
          value={expenseCategory}
        />
        <input
          className="expense-input"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <input
          className="expense-input"
          type="number"
          min="1"
          placeholder="Enter total amount spent"
          onChange={(e) => setMoneySpent(e.target.value)}
          value={moneySpent}
        />
        <button onClick={handleAdd} className="add-expense-btn">
          Add expense
        </button>
        <div className="total-spent">Total Spent: ₹{totalSpent}</div>
        <div className="table-container">
          <table className="expense-table">
            <thead>
              <tr className="header">
                <th>Expense Name</th>
                <th>Expense Category</th>
                <th>Date</th>
                <th>Money Spent</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item, id) => (
                <tr key={item.id}>
                  <td>{item.expenseName}</td>
                  <td>{item.expenseCategory}</td>
                  <td>{item.date}</td>
                  <td>{item.moneySpent}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="category-cards">
          {Object.keys(categoryTotals).map((category) => (
            <div className="category-card" key={category}>
              <h3>{category}</h3>
              <p>₹{categoryTotals[category]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

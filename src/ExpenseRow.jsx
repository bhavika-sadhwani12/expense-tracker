export default function ExpenseRow({ expenseName, expenseCategory, date }) {
  return (
    <div>
      {expenseName}
      {expenseCategory}
      {date}
    </div>
  );
}

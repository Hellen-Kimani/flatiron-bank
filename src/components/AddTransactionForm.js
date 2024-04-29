import React, { useState, useEffect } from "react";

function AddTransactionForm({addTransaction}) {
  const [transaction, setTransaction] = useState({ date: '', description: '', category: '', amount: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await fetch("http://localhost:8001/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      console.log("Transactions fetched successfully:", data);
      // Update state with fetched data
      // setTransactions(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      console.log("Transaction added successfully");
      setTransaction({ date: '', description: '', category: '', amount: '' });
      fetchTransactionData(); // Refetch data after adding a new transaction
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleFormSubmission}>
        {/* Input fields for transaction data */}
        <div className="inline fields">
          <input
            type="date"
            name="date"
            onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
            value={transaction.date}
          />
          <input
            type="text"
            name="description"
            onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
            placeholder="Description"
            value={transaction.description}
          />
          <input
            type="text"
            name="category"
            onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
            placeholder="Category"
            value={transaction.category}
          />
          <input
            type="number"
            name="amount"
            onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
            placeholder="Amount"
            step="0.01"
            value={transaction.amount}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default AddTransactionForm;

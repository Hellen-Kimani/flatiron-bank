import React, { useState, useEffect } from "react";
import Search from "./Search";
import TransactionsList from "./TransactionsList";
import AddTransactionForm from "./AddTransactionForm";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
    }
  };

  const addTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      console.log("Transaction added successfully");
      fetchTransactionData(); // Refetch data after adding a new transaction
    } catch (error) {
      console.error("Error adding transaction:", error.message);
    }
  };

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <TransactionsList transactions={transactions} />
      <AddTransactionForm addTransaction={addTransaction} />
    </div>
  );
}

export default Transaction;

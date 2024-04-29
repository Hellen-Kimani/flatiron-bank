import React, { useState, useEffect } from "react";

function TransactionsList({ transactions }) {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setData(transactions);
  }, [transactions]);

  useEffect(() => {
    async function fetchTransactionData() {
      try {
        const url = "http://localhost:8001/transactions";
        const response = await fetch(url);
        const fetched = await response.json();
        setData(fetched);
        console.log(fetched);
      } catch (error) {
        console.log(error, "failed to fetch the data");
      }
    }
    fetchTransactionData();
  }, []);

  const filteredTransactions = data
    ? data.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!filteredTransactions || filteredTransactions.length === 0) {
    return <tr><td>No matching transactions found.</td></tr>;
  }

  return (
    <div>
      <div className="ui large fluid icon input">
        <input
          type="text"
          placeholder="Search your Recent Transactions"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="circular search link icon"></i>
      </div>
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
          </tr>
          {filteredTransactions.map((transaction) => (
            <React.Fragment key={transaction.id}>
              <tr>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;

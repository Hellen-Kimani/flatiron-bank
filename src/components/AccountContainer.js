import React from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  return (
    <div>
      <AddTransactionForm />
      <TransactionsList  />
    </div>
  );
}

export default AccountContainer;

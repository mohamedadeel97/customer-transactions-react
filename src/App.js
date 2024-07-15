import React, { useEffect, useState } from "react";
import { fetchCustomers, fetchTransactions } from "./services/api";


function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchCustomers().then((response) => {
      setCustomers(response.data);
    });
    fetchTransactions().then((response) => {
      setTransactions(response.data);
    });
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Customer Transactions</h1>


      <table className="table table-responsive">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr
                key={customer.id}
              >
                <td>{customer.name}</td>
                <td>
                  <div className="transaction-container">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}

                      >
                        {tx.date} - ${tx.amount}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}

export default App;

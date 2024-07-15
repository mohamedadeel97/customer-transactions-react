import React, { useEffect, useState } from "react";
import { fetchCustomers, fetchTransactions } from "./services/api";


function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    fetchCustomers().then((response) => {
      setCustomers(response.data);
    });
    fetchTransactions().then((response) => {
      setTransactions(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMinAmountChange = (e) => {
    setMinAmount(e.target.value);
  };

  const handleMaxAmountChange = (e) => {
    setMaxAmount(e.target.value);
  };
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterTransactions = (customerId) => {
    const parsedCustomerId = Number(customerId);
    return transactions.filter((tx) => {
      const withinAmountRange =
        (minAmount === "" || tx.amount >= parseFloat(minAmount)) &&
        (maxAmount === "" || tx.amount <= parseFloat(maxAmount));
      return tx.customer_id === parsedCustomerId && withinAmountRange;
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Customer Transactions</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="d-flex mb-4">
        <input
          type="number"
          className="form-control mr-2"
          placeholder="Min amount"
          value={minAmount}
          onChange={handleMinAmountChange}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max amount"
          value={maxAmount}
          onChange={handleMaxAmountChange}
        />
      </div>
      <table className="table table-hover table-responsive">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => {
            const customerTransactions = filterTransactions(customer.id);
            if (customerTransactions.length === 0) {
              return null;
            }
            return (
              <tr
                key={customer.id}
                className="customer-row"
              >
                <td>{customer.name}</td>
                <td>
                  <div className="transaction-container">
                    {customerTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className={`transaction-item ${tx.amount > 1000
                          ? "bg-olive text-white"
                          : "bg-light text-dark"
                          }`}
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

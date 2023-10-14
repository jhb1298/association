import React from "react";
import axios from "axios";

class aFund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            referance: "",
            amount: "",
            type: "Income",
            date: "",
            details: "",
            transactions: [], // State to store fetched transactions
        };
    }

    // Function to handle form submission for adding a transaction
    handleAddTransaction = async (event) => {
        event.preventDefault();
        const newTransaction = {
            id: parseInt(this.state.id),
            referance: this.state.referance,
            amount: parseFloat(this.state.amount),
            type: this.state.type,
            date: this.state.date,
            details: this.state.details,
        };
        try {
            // Make an API request to create a new transaction
            await axios.post("https://za-rvqp.onrender.com/api/add-transactions", newTransaction);
            // Clear form fields after successful creation
            this.setState({
                id: "",
                referance: "",
                amount: "",
                type: "Income",
                date: "",
                details: "",
            });
            alert("Transaction added successfully!");
            this.loadTransactions();
        } catch (error) {
            alert("Failed to add transaction. Please try again.");
        }
    };

    // Function to fetch and load all transactions
    loadTransactions = async () => {
        try {
            // Make an API request to fetch all transactions
            const response = await axios.get("https://za-rvqp.onrender.com/api/get-all-transactionss");

            const data = response.data
            // Format the date to "YYYY-MM-DD" for each event
            const formattedFund = data.map((fund) => ({
                ...fund,
                date: new Date(fund.date).toISOString().split('T')[0], // Format the date
            }));

            // Update the state with the fetched transactions
            this.state.transactions = formattedFund
            this.setState({ formattedFund });
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    // Load transactions when the component mounts
    componentDidMount() {
        this.loadTransactions();
    }

    render() {
        return (
            <div id="acss">
                <div>
                    <h2>Number of transections: {this.state.transactions.length}</h2>
                    <h2>Balance: {this.state.transactions.reduce((totalBalance, transaction) => {
                        if (transaction.type === "Income") {
                            return totalBalance + transaction.amount;
                        } else if (transaction.type === "Expense") {
                            return totalBalance - transaction.amount;
                        }
                    }, 0)}</h2>

                </div>
                <div>
                    <h2>Transaction:</h2>
                    <form onSubmit={this.handleAddTransaction}>
                        <div>
                            <label>ID:</label>
                            <input
                                type="number"
                                name="id"
                                value={this.state.id}
                                onChange={(e) => this.setState({ id: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Reference:</label>
                            <input
                                type="text"
                                name="reference"
                                value={this.state.reference}
                                onChange={(e) => this.setState({ reference: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Amount:</label>
                            <input
                                type="number"
                                name="amount"
                                value={this.state.amount}
                                onChange={(e) => this.setState({ amount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Type:</label>
                            <select
                                name="type"
                                value={this.state.type}
                                onChange={(e) => this.setState({ type: e.target.value })}
                            >
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                        <div>
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={this.state.date}
                                onChange={(e) => this.setState({ date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Details:</label>
                            <input
                                type="text"
                                name="details"
                                value={this.state.details}
                                onChange={(e) => this.setState({ details: e.target.value })}
                            />
                        </div>
                        <div>
                            <input type="submit" value="Insert" />
                        </div>
                    </form>
                </div>
                <div>
                    <h2>Transaction:</h2>
                    {this.state.transactions.length > 0 ? (
                        <ul>
                            {this.state.transactions.map((transaction) => (
                                <li key={transaction.id}>
                                    ID: {transaction.id}, Reference: {transaction.reference}, Amount: {transaction.amount}, Type: {transaction.type}, Date: {transaction.date}, Details: {transaction.details}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No transactions available.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default aFund;

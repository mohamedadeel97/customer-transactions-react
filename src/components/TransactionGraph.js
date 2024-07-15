import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const TransactionGraph = ({ transactions }) => {
    const aggregateTransactionsByDay = (transactions) => {
        const dailyTotals = transactions.reduce((acc, transaction) => {
            const date = transaction.date.split("T")[0];
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += transaction.amount;
            return acc;
        }, {});

        return Object.keys(dailyTotals).map((date) => ({
            date,
            totalAmount: dailyTotals[date],
        }));
    };

    const data = aggregateTransactionsByDay(transactions);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TransactionGraph;
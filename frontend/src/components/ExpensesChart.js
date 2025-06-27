// src/components/ExpensesChart.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ExpensesChart = ({ user }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    console.log("📊 Subscribing to expense updates for:", user.uid);

    const q = query(collection(db, "expenses"), where("uid", "==", user.uid)); // ✅ updated field name to 'uid'
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categoryTotals = {};
      snapshot.forEach((doc) => {
        const item = doc.data();
        const category = item.category || "Other";
        const amount = parseFloat(item.amount) || 0;
        categoryTotals[category] = (categoryTotals[category] || 0) + amount;
      });

      const formatted = Object.entries(categoryTotals).map(([key, value]) => ({
        name: key,
        total: value,
      }));

      console.log("📈 Live chart data:", formatted);
      setChartData(formatted);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">📊 Expense Overview</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-600">No expenses yet. Upload some receipts to see insights.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpensesChart;

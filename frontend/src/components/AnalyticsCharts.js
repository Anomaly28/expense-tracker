// src/components/AnalyticsCharts.js
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F"];

const AnalyticsCharts = ({ uid, refreshKey }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!uid) return; // 🛑 Prevent running if uid is missing

    console.log("📊 Fetching analytics for UID:", uid, "with refreshKey:", refreshKey);

    const fetchData = async () => {
      try {
        const q = query(collection(db, "expenses"), where("uid", "==", uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());

        console.log("📥 Fetched expenses:", data);

        // Group by category
        const categoryMap = {};
        data.forEach((item) => {
          categoryMap[item.category] =
            (categoryMap[item.category] || 0) + Number(item.amount);
        });

        const formatted = Object.entries(categoryMap).map(([key, value]) => ({
          name: key,
          value,
        }));

        console.log("📈 Formatted chart data:", formatted);
        setChartData(formatted);
      } catch (error) {
        console.error("❌ Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [uid, refreshKey]); // 👈 make sure refreshKey is included

  return (
    <div className="flex justify-center items-center flex-col">
      {chartData.length === 0 ? (
        <p className="text-gray-700 font-semibold mt-4">No expenses to show yet.</p>
      ) : (
        <>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          {/* For debugging: remove later if not needed */}
          {/* <pre className="text-xs text-left mt-4">{JSON.stringify(chartData, null, 2)}</pre> */}
        </>
      )}
    </div>
  );
};

export default AnalyticsCharts;

// src/components/ExpenseTable.js
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ExpenseTable = ({ uid }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!uid) return;

      try {
        const q = query(collection(db, "expenses"), where("uid", "==", uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [uid]);

  return (
    <div className="overflow-x-auto">
      {expenses.length === 0 ? (
        <p className="text-gray-600 text-sm">No expenses recorded yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-700">
              <th className="px-4 py-2 border-b">📅 Date</th>
              <th className="px-4 py-2 border-b">💸 Amount</th>
              <th className="px-4 py-2 border-b">🏷️ Category</th>
              <th className="px-4 py-2 border-b">📎 Receipt</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {exp.date || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  ₹{parseFloat(exp.amount || 0).toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b">
                  {exp.category || "Other"}
                </td>
                <td className="px-4 py-2 border-b">
                  {exp.downloadURL ? (
                    <a
                      href={exp.downloadURL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseTable;

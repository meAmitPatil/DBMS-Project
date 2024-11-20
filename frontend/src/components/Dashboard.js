import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/dashboard");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data from the backend");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Database Dashboard</h1>
      {Object.entries(data).map(([tableName, tableData]) => (
        <div key={tableName} className="table-container">
          <h2>{tableName.replace("_", " ").toUpperCase()}</h2>
          {Array.isArray(tableData) ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(tableData[0] || {}).map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="error">{tableData.error}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

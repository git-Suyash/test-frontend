import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function InsightGraphComponent({ data }) {
  useEffect(() => {
    if (!data || !data.pie) return;

    const pieData = data.pie;
    renderCharts(pieData);
  }, [data]);

  const renderCharts = (pieData) => {
    Object.entries(pieData).forEach(([faculty, facultyData]) => {
      if (facultyData.statusCounts) {
        renderPieChart(
          `${faculty} Status Counts`,
          `${faculty.replace(/\s/g, "")}StatusCountsPieChart`,
          facultyData.statusCounts
        );
        renderTotal(
          `${faculty.replace(/\s/g, "")}StatusCountsPieChart`,
          facultyData.totalCount
        );
      }
      if (facultyData.statusSums) {
        renderPieChart(
          `${faculty} Status Sums`,
          `${faculty.replace(/\s/g, "")}StatusSumsPieChart`,
          facultyData.statusSums
        );
        renderTotal(
          `${faculty.replace(/\s/g, "")}StatusSumsPieChart`,
          facultyData.totalSum
        );
      }
    });
  };

  const renderPieChart = (title, canvasId, pieData) => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // Destroy existing chart if it exists
    Chart.getChart(ctx)?.destroy();

    const labels = Object.keys(pieData);
    const dataValues = Object.values(pieData);

    const pieChartData = {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", // Pending
            "rgba(54, 162, 235, 0.2)", // Approved
            "rgba(255, 206, 86, 0.2)", // Rejected
            "rgba(75, 192, 192, 0.2)", // Reverted
          ],
        },
      ],
    };

    new Chart(ctx, {
      type: "pie",
      data: pieChartData,
      options: {
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: title,
          },
        },
      },
    });
  };

  const renderTotal = (canvasId, total) => {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // Create a div for displaying the total
    const totalElem = document.createElement("div");
    totalElem.innerText = `Total: ${total}`;

    // Append the total div to the parent of the canvas
    ctx.parentNode.appendChild(totalElem);
  };

  return (
    <div className="flex justify-center justify-items-center align-middle gap-[100px]">
      {data.pie &&
        Object.entries(data.pie).map(([faculty, facultyData]) => (
          <div key={faculty}>
            <canvas
              id={`${faculty.replace(/\s/g, "")}StatusCountsPieChart`}
              width="200"
              height="200"></canvas>
            <canvas
              id={`${faculty.replace(/\s/g, "")}StatusSumsPieChart`}
              width="200"
              height="200"></canvas>
          </div>
        ))}
    </div>
  );
}

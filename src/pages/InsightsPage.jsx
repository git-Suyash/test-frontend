import React, { useEffect, useState } from "react";
import InsightsGraphComponent from "../components/InsightsGraphComponent";
import { useAuth } from "../hooks/useAuth";
import { Stats } from "../data/dataProvider";
import { countNestedLevels } from "../utils/utils";
// import { Stats } from "../data/dataProvider";
// import { useAuth } from "../hooks/useAuth";
// import { processStats } from "../utils/dataUtils";

const hardcodedData = {
  'Faculty of Engineering': {
    totalCount: 11,
    totalSum: 123247,
    statusCounts: { Pending: 7, Rejected: 2, Approved: 1, Reverted: 1 },
    statusSums: { Pending: 123247, Rejected: 0, Approved: 0, Reverted: 0 }
  },
  'Faculty of Arts': {
    totalCount: 6,
    totalSum: 110200,
    statusCounts: { Pending: 4, Rejected: 0, Approved: 2, Reverted: 0 },
    statusSums: { Pending: 60200, Rejected: 0, Approved: 50000, Reverted: 0 }
  },
  'Faculty of Law': {
    totalCount: 5,
    totalSum: 50000,
    statusCounts: { Pending: 3, Rejected: 0, Approved: 2, Reverted: 0 },
    statusSums: { Pending: 0, Rejected: 0, Approved: 50000, Reverted: 0 }
  },
  'Faculty of Science': {
    totalCount: 5,
    totalSum: 53000,
    statusCounts: { Pending: 3, Rejected: 0, Approved: 2, Reverted: 0 },
    statusSums: { Pending: 3000, Rejected: 0, Approved: 50000, Reverted: 0 }
  },
  'Faculty of Management': {
    totalCount: 6,
    totalSum: 50200,
    statusCounts: { Pending: 4, Rejected: 0, Approved: 2, Reverted: 0 },
    statusSums: { Pending: 200, Rejected: 0, Approved: 50000, Reverted: 0 }
  }
};

export const processStats = (stats) => {
  const levels = countNestedLevels(stats);

  const processedData = {};
  for (const faculty in stats) {
    const facultyData = stats[faculty];
    const facultyName = facultyData.faculty;
    const facultyStats = {
      totalCount: facultyData.totalCount,
      totalSum: facultyData.totalSum,
      statusCounts: {},
      statusSums: {}
    };
    for (const status in facultyData.statusCounts) {
      facultyStats.statusCounts[status] = facultyData.statusCounts[status];
      facultyStats.statusSums[status] = facultyData.statusSums[status];
    }
    processedData[facultyName] = facultyStats;
  }
  return processedData;
};

export const InsightsPage = () => {
  const { user, logout } = useAuth();
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    Stats({ user, logout })
      .then((response) => response.json())
      .then((response) => {
        const processedData = processStats(response.Stats);
        setGraphData(processedData);
      });
  }, [user, logout]);

  return <InsightsGraphComponent data={{ pie: hardcodedData }} />
};

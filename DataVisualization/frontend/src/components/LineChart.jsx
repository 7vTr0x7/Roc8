import React from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";

import { lineData } from "../utils/constants";
import { useSelector } from "react-redux";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  zoomPlugin
);

const LineChart = ({ paramsData }) => {
  const bar = useSelector((state) => state.bar.bar);
  const chartData = useSelector((state) => state.data.data);

  const array = lineData(bar, paramsData, chartData);

  const maxLine =
    array.length > 0 &&
    array.reduce((acc, curr) => (acc.value < curr.value ? curr : acc));

  const data = {
    labels: array.map((data) => data?.date?.slice(0, 10)),
    datasets: [
      {
        label: "Title",
        data: array.map((data) => data?.value),
      },
    ],
    backgroundColor: "aqua",
    borderColor: "black",
    fill: true,
  };
  const options = {
    plugins: {
      legend: true,
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      y: {
        max: maxLine.value + 100,
      },
    },
  };
  return (
    <div className="h-[300px] md:h-[400px] lg:h-[500px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;

/* eslint-disable react-hooks/purity */
"use client";

import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

interface ChartProps {
  labels: string[];
  data: number[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ labels, data }: ChartProps) {
  let _data = {
    labels,
    datasets: [
      {
        label: "# of students",
        data,
        // generate random colors in rgba based on # of labels
        backgroundColor: Array.from(
          { length: labels.length },
          () =>
            `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255
            )},${Math.floor(Math.random() * 255)},0.2)`
        ),
        borderWidth: 0.5,
      },
    ],
  };
  return <Pie data={_data} />;
}

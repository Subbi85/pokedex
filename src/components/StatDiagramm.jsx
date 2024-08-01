import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const StatDiagramm = ({ selectedPokemon }) => {
  const statNames = selectedPokemon.stats.map(stat => stat.name);
  const statValues = selectedPokemon.stats.map(stat => stat.base);

  // Chart.js data object
  const data = {
    labels: statNames,
    datasets: [
      {
        label: 'Stats',
        data: statValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 150,
      },
    },
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default StatDiagramm;

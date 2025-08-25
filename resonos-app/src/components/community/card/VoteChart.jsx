import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 모듈 등록 (한 번만 해주면 됨)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VoteChart = ({ vote }) => {
  const colors = vote.argument.map(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  });
  const labels = vote.argument.map(arg => arg.content);
  const data = {
    labels,
    datasets: [
      {
        label: vote.title,
        data: vote.argument.map(arg => arg.voteCount),
        backgroundColor: colors,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // 가로 막대
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: 'gray',
          font: {
            size: 10,
            family: 'Arial',
            weight: 'bold',
          }
        }
      },
      title: {
        display: false,
        text: vote.title,
        color: 'black',
        font: {
          size: 18
        }
      }
    },
    scales: {
      x: {
        display: false,
        beginAtZero: true,
        ticks: {
          color: 'white',
          font: { size: 14 }
        },
      },
      y: {
        ticks: {
          color: 'white',
          font: { size: 14 }
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default VoteChart;

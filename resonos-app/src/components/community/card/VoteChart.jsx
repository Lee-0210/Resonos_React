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

  const pastelPalette = [
    "#D4B97F", // 1번째 (고정 금색)
    "#A8DADC", // 민트 파스텔
    "#F6BD60", // 파스텔 오렌지
    "#F28482", // 파스텔 레드
    "#84A59D", // 파스텔 그레이그린
    "#B8A9C9", // 라벤더
    "#FFD6A5", // 파스텔 옐로우
  ];

  const sortedArgs = [...vote.arguments].sort((a, b) => b.voteCount - a.voteCount);
  const colors = pastelPalette.slice(0, vote.arguments.length);
  const labels = sortedArgs.map(arg => arg.content);
  const datasetData = sortedArgs.map(arg => arg.voteCount);

  const data = {
    labels,
    datasets: [
      {
        label: vote.title,
        data: datasetData,
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

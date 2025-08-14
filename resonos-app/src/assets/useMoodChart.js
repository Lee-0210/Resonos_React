import { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const useMoodChart = (canvasRef, labels, values) => {
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const ctx = canvasRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const maxValue = Math.max(...values);
        const roundedMax = Math.ceil(maxValue / 5) * 5;

        // Ensure 6 data points for hexagonal shape
        let processedLabels = [...labels];
        let processedValues = [...values];

        processedLabels = processedLabels.slice(0, 6);
        processedValues = processedValues.slice(0, 6);

        while (processedLabels.length < 6) {
            processedLabels.push('');
            processedValues.push(0);
        }

        const data = {
            labels: processedLabels,
            datasets: [{
                label: 'Mood Votes',
                data: processedValues,
                backgroundColor: 'rgba(212, 185, 127, 0.2)',
                borderColor: '#D4B97F',
                pointBackgroundColor: '#D4B97F'
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    grid: { color: '#D4B97F' },
                    angleLines: { color: '#D4B97F' },
                    pointLabels: { color: '#D4B97F' },
                    ticks: {
                        stepSize: Math.ceil(roundedMax / 5), // 4단계로 분할
                        backdropColor: 'transparent',
                        color: '#D4B97F' // 틱 라벨 색상 추가
                    },
                    min: 0,
                    max: roundedMax
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        };

        chartInstance.current = new ChartJS(ctx, {
            type: 'radar',
            data: data,
            options: options
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [canvasRef, labels, values]); // Re-run effect if these dependencies change

    return chartInstance;
};

export default useMoodChart;

// frontend/src/components/Charts/SalesGrowthRateChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesGrowthRateChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Sales Growth Rate',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                const orders = response.data;

                // Calculate sales growth rates here (implement logic based on your data)

                const labels = ['Jan', 'Feb', 'Mar']; // Example labels
                const growthRates = [10, 20, 30]; // Example growth rates

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Sales Growth Rate',
                            data: growthRates,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 2,
                            fill: true
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching sales growth rate data:', error);
            }
        };

        fetchData();

        return () => {
            const chartInstance = ChartJS.getChart('salesGrowthRateChart');
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="chart-container">
            <h2>Sales Growth Rate Over Time</h2>
            {chartData.labels.length > 0 ? (
                <Line data={chartData} id="salesGrowthRateChart" />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default SalesGrowthRateChart;

// frontend/src/components/Charts/NewCustomersAddedChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewCustomersAddedChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'New Customers Added',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers');
                const customers = response.data;

                const newCustomerCounts = {}; // Calculate counts based on created_at field

                // Example processing logic for new customers
                customers.forEach(customer => {
                    const month = new Date(customer.created_at).toLocaleString('default', { month: 'long' });
                    newCustomerCounts[month] = (newCustomerCounts[month] || 0) + 1;
                });

                const labels = Object.keys(newCustomerCounts);
                const data = Object.values(newCustomerCounts);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'New Customers Added',
                            data,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching new customers data:', error);
            }
        };

        fetchData();

        return () => {
            const chartInstance = ChartJS.getChart('newCustomersAddedChart');
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="chart-container">
            <h2>New Customers Added Over Time</h2>
            {chartData.labels.length > 0 ? (
                <Bar data={chartData} id="newCustomersAddedChart" />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default NewCustomersAddedChart;

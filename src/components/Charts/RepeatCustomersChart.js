// frontend/src/components/Charts/RepeatCustomersChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const RepeatCustomersChart = () => {
    const [chartData, setChartData] = useState({
        labels: ['Repeat Customers', 'New Customers'],
        datasets: [
            {
                label: 'Customer Type',
                data: [0, 0], // Placeholder for counts
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                const orders = response.data;

                const customerPurchaseCount = {};
                orders.forEach(order => {
                    const customerId = order.customer_id; // Adjust to your data structure
                    customerPurchaseCount[customerId] = (customerPurchaseCount[customerId] || 0) + 1;
                });

                const repeatCustomers = Object.values(customerPurchaseCount).filter(count => count > 1).length;
                const newCustomers = Object.values(customerPurchaseCount).filter(count => count === 1).length;

                setChartData({
                    ...chartData,
                    datasets: [
                        {
                            ...chartData.datasets[0],
                            data: [repeatCustomers, newCustomers]
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching repeat customers data:', error);
            }
        };

        fetchData();

        return () => {
            const chartInstance = ChartJS.getChart('repeatCustomersChart');
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="chart-container">
            <h2>Number of Repeat Customers</h2>
            <Pie data={chartData} id="repeatCustomersChart" />
        </div>
    );
};

export default RepeatCustomersChart;
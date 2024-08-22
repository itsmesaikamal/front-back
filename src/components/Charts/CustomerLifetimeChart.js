// frontend/src/components/Charts/CustomerLifetimeValueChart.js
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

const CustomerLifetimeChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Customer Lifetime Value by Cohorts',
                data: [],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                const orders = response.data;

                const cohortValues = orders.reduce((acc, order) => {
                    const customerId = order.customer_id; // Adjust this to match your order data
                    const firstPurchaseDate = order.created_at.split('T')[0]; // Simplified for demonstration
                    
                    if (!acc[firstPurchaseDate]) acc[firstPurchaseDate] = { total: 0, count: 0 };
                    acc[firstPurchaseDate].total += parseFloat(order.total_price_set.shop_money.amount);
                    acc[firstPurchaseDate].count += 1;
                    return acc;
                }, {});

                const labels = Object.keys(cohortValues);
                const lifetimeValues = labels.map(label => cohortValues[label].total / cohortValues[label].count);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Customer Lifetime Value by Cohorts',
                            data: lifetimeValues,
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching customer lifetime value data:', error);
            }
        };

        fetchData();

        // Cleanup function to destroy chart instance
        return () => {
            const chartInstance = ChartJS.getChart('CustomerLifetimeChart');
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="chart-container">
            <h2>Customer Lifetime Value Chart</h2>
            {chartData.labels.length > 0 ? (
                <Bar data={chartData} id="CustomerLifetimeChart" />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default CustomerLifetimeChart;

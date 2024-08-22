// frontend/src/components/Charts/TotalSalesChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';

const groupByInterval = (orders, interval) => {
    return orders.reduce((acc, order) => {
        const date = parseISO(order.created_at); // Assuming 'created_at' is the date field
        let key;

        // Determine the grouping key based on the interval
        switch (interval) {
            case 'daily':
                key = format(date, 'yyyy-MM-dd');
                break;
            case 'monthly':
                key = format(date, 'yyyy-MM');
                break;
            case 'quarterly':
                key = `${format(date, 'yyyy')}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;
                break;
            case 'yearly':
                key = format(date, 'yyyy');
                break;
            default:
                key = format(date, 'yyyy-MM-dd');
        }

        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += parseFloat(order.total_price_set.shop_money.amount); // Assuming 'total_price_set.shop_money.amount' contains the sales amount
        return acc;
    }, {});
};

const TotalSalesChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Sales',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    });
    const [interval, setInterval] = useState('daily'); // Default interval set to daily

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                const shopifyOrders = response.data;

                // Group the data by the selected interval
                const groupedData = groupByInterval(shopifyOrders, interval);

                const labels = Object.keys(groupedData);
                const totalPrices = Object.values(groupedData);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: `Total Sales (${interval.charAt(0).toUpperCase() + interval.slice(1)})`,
                            data: totalPrices,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching total sales data:', error);
            }
        };

        fetchData();
    }, [interval]);

    return (
        <div className="chart-container">
            <h2>Total Sales Chart</h2>
            {/* Dropdown for interval selection */}
            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>
            {/* Ensure chartData is fully populated before rendering */}
            {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default TotalSalesChart;

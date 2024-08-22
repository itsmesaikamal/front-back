// frontend/src/components/Dashboard.js
import React from 'react';
import TotalSalesChart from './Charts/TotalSalesChart';
//import GeoDistributionChart from './Charts/GeoDistributionChart';
// Import other charts...

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="text-center text-4xl font-bold my-8">Sales Dashboard</h1>
            <div className="charts-grid grid grid-cols-1 md:grid-cols-2 gap-8">
                <TotalSalesChart />
                
               
            </div>
        </div>
    );
};

export default Dashboard;

// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import SalesGrowthRateChart from './components/Charts/SalesGrowthRateChart';
import NewCustomersChart from './components/Charts/NewCustomersChart';
import RepeatCustomersChart from './components/Charts/RepeatCustomersChart';
import CustomerGeographyChart from './components/Charts/CustomerGeographyChart';
import CustomerLifetimeChart from './components/Charts/CustomerLifetimeChart';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/sales-growth-rate" element={<SalesGrowthRateChart />} />
                    <Route path="/new-customers" element={<NewCustomersChart />} />
                    <Route path="/repeat-customers" element={<RepeatCustomersChart />} />
                    <Route path="/customer-geography" element={<CustomerGeographyChart />} />
                    <Route path="/customer-lifetime-value" element={<CustomerLifetimeChart />} />
                   
                </Routes>
            </div>
        </Router>
    );
};

export default App;

// frontend/src/components/Charts/GeographicalDistributionChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CustomerGeographyChart = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container">
            <h2>Geographical Distribution of Customers</h2>
            <MapContainer center={[51.505, -0.09]} zoom={2} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {customers.map((customer, index) => {
                    const { city } = customer.default_address;
                    // You need to geocode the city to get lat/lng. This example uses dummy lat/lng.
                    const position = [51.505 + index * 0.01, -0.09 + index * 0.01]; // Replace with actual geocoding
                    return (
                        <Marker key={index} position={position}>
                            <Popup>{city}</Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default CustomerGeographyChart;

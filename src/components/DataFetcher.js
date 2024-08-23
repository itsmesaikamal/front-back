// frontend/src/components/DataFetcher.js
import React, { useEffect } from 'react';
import axios from 'axios';

const DataFetcher = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const customers = await axios.get('http://localhost:5000/api/customers');
                console.log('Customers:', customers.data);

                const products = await axios.get('http://localhost:5000/api/products');
                console.log('Products:', products.data);

                const orders = await axios.get('http://localhost:5000/api/orders');
                console.log('Orders:', orders.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return <div>Data is being fetched. Check the console.</div>;
};

export default DataFetcher;

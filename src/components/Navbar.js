import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-purple-600 shadow-lg fixed w-full z-10 top-0 left-0">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
         
                <ul className="flex space-x-10 list-none p-0 m-0" style={{ listStyleType: 'none', display: 'flex',padding:10,gap: '20px' }}>
                
                    <li 
                        onClick={() => navigate('/')} 
                        className="text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300"
                    >
                        Sales Dashboard   
                    </li>
                    <li 
                        onClick={() => navigate('/sales-growth-rate')} 
                        className="text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300"
                    >
                        Sales Growth Rate
                    </li>
                    <li 
                        onClick={() => navigate('/new-customers')} 
                        className="text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300"
                    >
                        New Customers
                    </li>
                    <li 
                        onClick={() => navigate('/repeat-customers')} 
                        className="text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300"
                    >
                        Repeat Customers
                    </li>
                    <li 
                        onClick={() => navigate('/customer-geography')} 
                        className="text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300"
                    >
                        Customer Geography
                    </li>
                    <li 
                        onClick={() => navigate('/customer-lifetime-value')} 
                        className="text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300"
                    >
                        Customer Lifetime Value
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

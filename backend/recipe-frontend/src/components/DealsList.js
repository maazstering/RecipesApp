import React, { useEffect, useState } from 'react';
import { getDeals } from '../api/dealsapi';

const DealsList = () => {
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const data = await getDeals();
                setDeals(data);
            } catch (error) {
                console.error('Error fetching deals:', error.message);
            }
        };
        fetchDeals();
    }, []);

    return (
        <div>
            <h2>Deals</h2>
            <ul>
                {deals.map((deal, index) => (
                    <li key={index}>
                        Dish Names: {deal.dishNames.join(', ')} - Total Calories: {deal.totalCalories}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DealsList;

import React, { useState } from 'react';
import { createDeal } from '../api/dealsapi';

const DealForm = () => {
    const [dishNames, setDishNames] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const dishes = dishNames.split(',').map(dish => dish.trim());
            const data = await createDeal(dishes);
            setMessage('Deal created successfully!');
            console.log(data); // You can do more with the response
        } catch (error) {
            setMessage('Failed to create deal: ' + error.message);
        }
        setDishNames('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Dish Names (comma-separated):
                <input
                    type="text"
                    value={dishNames}
                    onChange={e => setDishNames(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Create Deal</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default DealForm;

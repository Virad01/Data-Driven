// SubscriptionCalculator.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionCalculator = () => {
    const [basePrice, setBasePrice] = useState(0);
    const [pricePerCreditLine, setPricePerCreditLine] = useState(0);
    const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(0);
    const [creditLines, setCreditLines] = useState(0);
    const [creditScore, setCreditScore] = useState(0);
    const [subscriptionPrice, setSubscriptionPrice] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/calculate-price', {
            basePrice,
            pricePerCreditLine,
            pricePerCreditScorePoint,
            creditLines,
            creditScore
        });
        setSubscriptionPrice(response.data.subscriptionPrice);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Base Price" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
                <input type="number" placeholder="Price per Credit Line" value={pricePerCreditLine} onChange={(e) => setPricePerCreditLine(e.target.value)} />
                <input type="number" placeholder="Price per Credit Score Point" value={pricePerCreditScorePoint} onChange={(e) => setPricePerCreditScorePoint(e.target.value)} />
                <input type="number" placeholder="Credit Lines" value={creditLines} onChange={(e) => setCreditLines(e.target.value)} />
                <input type="number" placeholder="Credit Score" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} />
                <button type="submit">Calculate</button>
            </form>
            {subscriptionPrice !== null && <div>Subscription Price: ${subscriptionPrice}</div>}
        </div>
    );
};

export default SubscriptionCalculator;

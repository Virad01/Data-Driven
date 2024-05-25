const calculateSubscriptionPrice = (basePrice, pricePerCreditLine, pricePerCreditScorePoint, creditLines, creditScore) => {
    return basePrice + (pricePerCreditLine * creditLines) + (pricePerCreditScorePoint * creditScore);
};

// Example usage in an endpoint
app.post('/calculate-price', (req, res) => {
    const { basePrice, pricePerCreditLine, pricePerCreditScorePoint, creditLines, creditScore } = req.body;
    const subscriptionPrice = calculateSubscriptionPrice(basePrice, pricePerCreditLine, pricePerCreditScorePoint, creditLines, creditScore);
    res.json({ subscriptionPrice });
});

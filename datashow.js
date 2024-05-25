app.get('/data', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const data = await YourModel.find().skip(skip).limit(limit);
    res.json(data);
});

// DataDisplayComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplayComponent = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/data?page=${page}&limit=10`);
            setData(response.data);
        };
        fetchData();
    }, [page]);

    const handleNext = () => setPage(page + 1);
    const handlePrev = () => setPage(page - 1);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Credit Score</th>
                        <th>Credit Lines</th>
                        <th>Masked Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Email}</td>
                            <td>{item.Name}</td>
                            <td>{item.CreditScore}</td>
                            <td>{item.CreditLines}</td>
                            <td>{item.MaskedPhoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePrev} disabled={page === 1}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default DataDisplayComponent;

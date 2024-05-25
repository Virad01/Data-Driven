document.getElementById('uploadBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file to upload');
        return;
    }

    const formData = new FormData();
    formData.append('csvFile', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload');
    xhr.upload.addEventListener('progress', (e) => {
        const percent = (e.loaded / e.total) * 100;
        document.getElementById('uploadProgress').innerText = `Upload Progress: ${percent.toFixed(2)}%`;
    });

    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                displayData(response.data);
                calculateSubscriptionPrice(response.data);
            } else {
                alert('Upload failed');
            }
        }
    };

    xhr.send(formData);
});

function displayData(data) {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '';

    data.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.textContent = JSON.stringify(row);
        dataDisplay.appendChild(rowDiv);
    });
}

function calculateSubscriptionPrice(data) {
    const basePrice = 10;
    const pricePerCreditLine = 5;
    const pricePerCreditScorePoint = 2;

    let totalCreditLines = 0;
    let totalCreditScore = 0;

    data.forEach((row) => {
        totalCreditLines += parseInt(row.CreditLines);
        totalCreditScore += parseInt(row.CreditScore);
    });

    const subscriptionPrice = basePrice + (pricePerCreditLine * totalCreditLines) + (pricePerCreditScorePoint * totalCreditScore);
    document.getElementById('subscriptionPrice').textContent = `$${subscriptionPrice}`;
}

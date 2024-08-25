import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async () => {
        try {
            // Validate and parse JSON input
            const parsedJson = JSON.parse(jsonInput);
            setError(''); // Clear any previous errors

            // Ensure the parsed JSON contains the 'data' key
            if (!parsedJson.hasOwnProperty('data')) {
                throw new Error("JSON must contain a 'data' key.");
            }

            // Example payload to be sent to the API
            const payload = {
                data: parsedJson.data,
            };

            // Replace with your backend API endpoint
            const apiEndpoint = 'http://localhost:3200/bfhl';

            // Send the POST request to the backend API
            const res = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Check if the response is OK (status code 200-299)
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse and set the response from the API
            const result = await res.json();
            setResponse(result);

        } catch (e) {
            setError(e.message || 'Invalid JSON input');
            setResponse(null);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Roll Number as the Title</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows="5"
                cols="50"
                placeholder='{"data": ["M", "1", "334", "4", "B", "Z", "a"]}'
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleSubmit}>Submit</button>

            {/* Display the API response */}
            {response && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;

import React from 'react';

function DebugApp() {
    return (
        <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#111', color: 'white', height: '100vh' }}>
            <h1>PriceWatch Debug Mode</h1>
            <p>If you see this, React is working correctly.</p>
            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #333' }}>
                <h2>System Status:</h2>
                <ul>
                    <li>React: Loaded</li>
                    <li>Styles: Inline</li>
                </ul>
            </div>
        </div>
    );
}

export default DebugApp;

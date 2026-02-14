
import axios from 'axios';

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:5000';

async function checkService(name, url) {
    try {
        const start = Date.now();
        await axios.get(url, { timeout: 2000 });
        const duration = Date.now() - start;
        console.log(`✅ ${name} is UP (${duration}ms)`);
        return true;
    } catch (error) {
        console.log(`❌ ${name} is DOWN: ${error.message}`);
        return false;
    }
}

async function checkPrediction() {
    console.log('🔄 Testing ML Prediction (Backend -> ML Service)...');
    try {
        const payload = {
            city: 'Bangalore',
            area: 'Whitefield',
            propertyType: 'Apartment',
            size: 1200,
            bedrooms: 2,
            bathrooms: 2,
            yearBuilt: 2021,
            age: 5,
            amenities: ['Pool', 'Gym']
        };

        // Note: Adjust endpoint if needed based on server.js routes
        const response = await axios.post(`${BACKEND_URL}/api/predict`, payload);

        if (response.data && response.data.success) {
            console.log(`✅ ML Prediction Success!`);
            console.log(`   Input: 2BHK in Whitefield`);
            const price = response.data.data.predictedPrice || response.data.data; // Handle structure
            console.log(`   Predicted Price: ₹${price.toLocaleString()}`);
            return true;
        } else {
            console.log(`⚠️ Prediction returned unexpected format:`, response.data);
            return false;
        }
    } catch (error) {
        console.log(`❌ Prediction Failed: ${error.message}`);
        if (error.response) {
            console.log(`   Server responded: ${JSON.stringify(error.response.data)}`);
        }
        return false;
    }
}

async function runVerification() {
    console.log('--- PriceWatch System Verification ---');

    console.log(`Target Frontend: ${FRONTEND_URL}`);
    console.log(`Target Backend: ${BACKEND_URL}`);

    const frontendStatus = await checkService('Frontend', FRONTEND_URL);
    const backendStatus = await checkService('Backend', BACKEND_URL);

    if (backendStatus) {
        await checkPrediction();
    } else {
        console.log('⚠️ Skipping prediction test because Backend is DOWN.');
    }

    console.log('--------------------------------------');
}

runVerification();

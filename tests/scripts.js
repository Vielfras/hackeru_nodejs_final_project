"use strict";

const baseUrl = 'http://127.0.0.1:3000';

const clearOutput = () => {
    document.getElementById('output').innerHTML = '';
};

const appendToOutput = (message, isSuccess) => {
    const output = document.getElementById('output');
    const div = document.createElement('div');
    div.textContent = message;
    div.className = isSuccess ? 'success' : 'fail';
    output.appendChild(div);
};

class Test {
    constructor(name, fn, successCondition) {
        this.name = name;
        this.fn = fn;
        this.successCondition = successCondition;
    }

    async run() {
        try {
            const response = await this.fn();
            const result = await response.json();
            const isSuccess = this.successCondition(response, result);
            appendToOutput(`${this.name} ${isSuccess ? 'Success' : 'Fail'} (Status: ${response.status})`, isSuccess);
            return isSuccess;
        } catch (error) {
            appendToOutput(`${this.name} Fail: ${error.message}`, false);
            return false;
        }
    }
}


const registerUser = async () => {
    return await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": { "first": "John", "last": "Doe" },
            "phone": "0501234567",
            "email": "john.doe@example.com",
            "password": "Password123!",
            "image": { url: "http://example.com/profile.jpg", alt: "Profile Image" },
            "address": { "state": "CA", "country": "USA", "city": "Los Angeles", "street": "Main", "houseNumber": 123, "zip": "90001" },
            "isBusiness": true
        })
    });
};

const loginUser = async () => {
    return await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'john.doe@example.com',
            password: 'Password123!'
        })
    });
};

const createCard = async (token) => {
    return await fetch(`${baseUrl}/api/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "title" : "Business Card",
            "subtitle" : "CEO",
            "description" : "Business card description",
            "phone" : "0501234567",
            "email" : "business@example.com",
            "web" : "http://example.com",
            "image" : { "url" : "http://example.com/image.jpg", "alt" : "Business Image" },
            "address" : { "state" : "CA", "country" : "USA", "city" : "Los Angeles", "street" : "Main", "houseNumber" : 123, "zip" : "90001" }
        })
    });
};

const getAllCards = async () => {
    return await fetch(`${baseUrl}/api/cards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const runAllTests = async () => {
    appendToOutput('Running all tests...', true);

    const tests = [
        new Test('Register User', registerUser, (response, result) => response.status === 200 && result && result.email === 'john.doe@example.com'),
        new Test('Login User', loginUser, (response, result) => response.status === 200 && result && result.token),
        new Test('Create Card', async () => {
            const loginResponse = await loginUser();
            const loginResult = await loginResponse.json();
            const token = loginResult.token;
            return await createCard(token);
        }, (response, result) => response.status === 200 && result && result.title === 'Business Card'),
        new Test('Get All Cards', getAllCards, response => response.status === 200 || response.status === 304)
    ];

    for (const test of tests) {
        await test.run();
    }
};

const handleButtonClick = async (event, test) => {
    event.preventDefault();
    clearOutput();
    await test.run();
};

document.getElementById('testRegisterUser').addEventListener('click', async (event) => {
    handleButtonClick(event, new Test('Register User', registerUser, (response, result) => response.status === 200 && result && result.email === 'john.doe@example.com'));
});

document.getElementById('testLoginUser').addEventListener('click', async (event) => {
    handleButtonClick(event, new Test('Login User', loginUser, (response, result) => response.status === 200 && result && result.token));
});

document.getElementById('testCreateCard').addEventListener('click', async (event) => {
    handleButtonClick(event, new Test('Create Card', async () => {
        const loginResponse = await loginUser();
        const loginResult = await loginResponse.json();
        const token = loginResult.token;
        return await createCard(token);
    }, (response, result) => response.status === 200 && result && result.title === 'Business Card'));
});

document.getElementById('testGetAllCards').addEventListener('click', async (event) => {
    handleButtonClick(event, new Test('Get All Cards', getAllCards, response => response.status === 200 || response.status === 304));
});

document.getElementById('runAllTests').addEventListener('click', async (event) => {
    event.preventDefault();
    clearOutput();
    await runAllTests();
});

/* Global Variables */
const apiKey = "9ceabb5e914835a735b7249da524f9bd";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const serverUrl = "http://localhost:7661"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let data = {}

document.getElementById('generate').addEventListener('click', updateJournal);

function updateJournal(event) {
    let zip = document.getElementById('zip').value;
    getWeather(weatherUrl, zip, apiKey)
    .then(
        updateServer("/data", data)
        )
    .then(
        updateWebPage("/data")
    );
}

const getWeather = async (url, zip, apiKey)=>{
    const response = await fetch(url + "?zip=" + zip + "&appid=" + apiKey);
    try {
        data = await response.json();
        console.log(data);
    }
    catch {
        console.log("Error occured", error);
    }
}

const updateServer = async (path, weatherData)=>{
    const url = serverUrl + path;

    try {
        await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temperature: weatherData.main.temp,
                date: newDate,
                userResponse: document.getElementById('feelings').value,
            }),
        });
    } catch(error) {
        console.log("Error on post", error);
    }
}

const updateWebPage = async (path)=>{
    const response = await fetch(serverUrl + path);
    try {
        const updateData = await response.json();
        document.getElementById('date').innerHTML = updateData.date;
        document.getElementById('temp').innerHTML = updateData.temperature;
        document.getElementById('content').innerHTML = updateData.userResponse;
    }
    catch (error) {
        console.log("Error retrieving server data", error);
    }
}
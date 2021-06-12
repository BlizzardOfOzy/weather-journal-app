/* Global Variables */
const apiKey = "9ceabb5e914835a735b7249da524f9bd";
const url = "https://api.openweathermap.org/data/2.5/weather"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', updateJournal);

function updateJournal(event) {
    zip = document.getElementById('zip').value;
    weather = getWeather(url, zip, apiKey);
    console.log(weather);
}

const getWeather = async (url, zip, apiKey)=>{
    const result = await fetch(url + "?zip=" + zip + "&appid=" + apiKey);
    try {
        const data = await result.json();
        console.log(data);
        return data
    }
    catch {
        console.log("Error occured", error);
    }
}
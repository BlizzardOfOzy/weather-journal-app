/* Global Variables */
const apiKey = "9ceabb5e914835a735b7249da524f9bd";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
const serverUrl = "http://localhost:7661"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', updateJournal);

async function updateJournal(event) {
    let zip = document.getElementById('zip').value;
    getWeather(weatherUrl, zip, apiKey)
    .then(data => updateServer("/data", data))
    .then(result => updateWebPage("/data"));
}

const getWeather = async (url, zip, apiKey)=>{
    try {
        response = await axios.get(url + "?zip=" + zip + "&appid=" + apiKey);
    } catch (error) {
        console.log("Error querying weather api", error);
    }
    const data = response.data;
    console.log(data);
    return data;
}

const updateServer = (path, weatherData)=>{
    const url = serverUrl + path;
    try {
        axios.post(url, 
            {
                temperature: weatherData.main.temp,
                date: newDate,
                userResponse: document.getElementById('feelings').value,
            },
            {
                credentials: 'same-origin',
            });
    } catch(error) {
        console.log("Error on post", error);
    }
    return;
}

const updateWebPage = async (path)=>{
    try {
        const response = await axios.get(serverUrl + path);
        const updateData = response.data;
        document.getElementById('date').innerHTML = updateData.date;
        document.getElementById('temp').innerHTML = updateData.temperature;
        document.getElementById('content').innerHTML = updateData.userResponse;
    }
    catch (error) {
        console.log("Error retrieving server data", error);
    }
}
document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '45ef571f3bbfc2f64376d62ff07ea252'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            displayWeather(data);
        } else {
            const errorMessage = `Error: ${xhr.status} - ${xhr.statusText}`;
            document.getElementById('weatherDisplay').innerHTML = `<p>${errorMessage}</p>`;
        }
    };
    xhr.onerror = function() {
        document.getElementById('weatherDisplay').innerHTML = "<p>Network error occurred.</p>";
    };
    xhr.send();
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const { name, main, weather } = data;
    weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}

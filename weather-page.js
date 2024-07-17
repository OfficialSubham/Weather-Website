

async function getData (city) {
    let apiUrl = ''; 

    if (!city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=kolkata`;
    }
    else {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}`;
    }

    const apiKeys = "082fadc58f06877f50c19190d7d39a5e";
    const response = await fetch(apiUrl + `&appid=${apiKeys}`);
    const data = await response.json();
    console.log(data)
    displayData(data);
};

function displayData(data) {
    if (data.cod == "404") {
        document.querySelector(".hidden-message")
            .classList.add("not-hidden-message");
            setTimeout(() => {
                document.querySelector(".hidden-message")
                    .classList.remove("not-hidden-message");
            }, 2000)

    }
    else {
        document.querySelector(".js-temperature")
        .innerText = `${Math.round(data.main.temp)}`;
    
        document.querySelector(".js-location")
            .innerText = data.name;
    
        document.querySelector(".js-humidity-amount")
            .innerText = data.main.humidity + '%';
    
        document.querySelector(".js-wind-speed")
            .innerText = Math.round(data.wind.speed) + ' km/h'

        weatherImage(data);        
 
    }   

};


document.querySelector(".js-search")
    .addEventListener("click", () => {
        processData();
    })

document.querySelector(".js-search-input")
    .addEventListener("keydown", () => {
        if(event.key == "Enter") {
            processData();
        }
    })

function processData() {
    let city = document.querySelector(".js-search-input");
    console.log(city);

    getData(city.value);
    
    city.value = '';
}

getData();

function weatherImage (data) {
    if (data.weather[0].main == "Clear") {
        document.querySelector(".js-weather-image")
            .innerHTML = `<img src="./images/clear.png" alt="" class="weather-image">`; 
    }
    else if (data.weather[0].main == "Clouds") {
        document.querySelector(".js-weather-image")
            .innerHTML = '<img src="./images/clouds.png" alt="" class="weather-image">'; 
    }
    else if (data.weather[0].main == "Drizzle") {
        document.querySelector(".js-weather-image")
        .innerHTML = `<img src="./images/drizzle.png" alt="" class="weather-image">`; 
    }
    else if (data.weather[0].main == "Mist") {
        document.querySelector(".js-weather-image")
        .innerHTML = `<img src="./images/mist.png" alt="" class="weather-image">`; 
    }
    else if (data.weather[0].main == "Rain") {
        document.querySelector(".js-weather-image")
        .innerHTML = `<img src="./images/rain.png" alt="" class="weather-image">`; 
    }
    else if (data.weather[0].main === "Snow") {
        document.querySelector(".js-weather-image")
        .innerHTML = `<img src="./images/snow.png" alt="" class="weather-image">`; 
    }
}
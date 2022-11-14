var APIkey = "3306e6725abd8ddcc52e2ff6ae3cf2e9"; 

let requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" city fde w+ "&appid=" + APIkey;
fetch(requestURL)
.then(function (response) {
    return response.json()
})



var locationInput = document.getElementById('location');
var submitBtn = document.querySelector('.submit');

var currentDay = document.getElementById('currentDay');
var city = document.querySelector('.city');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humid = document.querySelector('.humidity');


function showToday(cityName) {

    var today = moment();
    $('#currentDay').text(today.format('L')); 
    temp.innerHTML = "Temp: " + k2f(response.main.temp);
    wind.innerHTML = "Wind: " + response.data.main.wind;
    humidity.innerHTML = "Humidity: " +response.data.main + "%";
}





//     .then(function(response) {
//     return response.json()
//     })
//     .then(function(data) {
//         console.log(data)
//     })
//     // city.innerHTML = response.data.name;
//     var today = moment();
//     $('#currentDay').text(today.format('L'));
//     getWeather(searchItem);
//     searchHistory.push(searchItem);
//     localStorage.setItem("search", JSON.stringify(searchHistory));
//     renderSearchHistory();
// }


let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function renderSearchHistory() {
    history.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const historyInput = document.createElement("input");
        historyInput.setAttribute("type", "text");
        historyInput.setAttribute("value", searchHistory[i]);
        historyInput.setAttribute("class", "historyInputs")
        historyInput.addEventListener("click", function () {
            getWeather(historyInput.value);
        })
        history.append(historyInput);
    }
}
var searchItem = city.value;
submitBtn.addEventListener('click', showToday);
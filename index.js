window.scroll(0, 0);
const header = document.querySelector(".header-section");
const srcInput = document.querySelector(".search-input");
const srcBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".w-icon");
const recentBlock = document.querySelector(".recent");
const dropDown = document.querySelector(".dropdown-content");
const dropdownList = document.querySelector(".dropdown-list");
const errorM = document.querySelector(".error-m");
const temperature = document.querySelector(".temperature");
const weather = document.querySelector(".weather");
const weatherDescription = document.querySelector(".weather-description");
const cityWidget = document.querySelector(".city");
const dateWidget = document.querySelector(".date");
const minTemp = document.querySelector(".min-temperature");
const maxTemp = document.querySelector(".max-temperature");
const btnNewYork = document.querySelector(".new-york");
const btnLondon = document.querySelector(".london");
const btnDubai = document.querySelector(".dubai");
const btnParis = document.querySelector(".paris");
const question1 = document.querySelector(".first-q");
const question2 = document.querySelector(".second-q");
const question3 = document.querySelector(".third-q");
const question4 = document.querySelector(".fourth-q");
const answer1 = document.getElementById("first-a");
const answer2 = document.getElementById("second-a");
const answer3 = document.getElementById("third-a");
const answer4 = document.getElementById("fourth-a");
const arrow1 = document.querySelector(".arrow1");
const arrow2 = document.querySelector(".arrow2");
const arrow3 = document.querySelector(".arrow3");
const arrow4 = document.querySelector(".arrow4");
const footerDate = document.querySelector(".footer-date");
const API_KEY = "ce82bfb8a3e58ba1dc5916f9f84849da";

const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const mode = "d";

if (date.getHours() > 21 && date.getHours() < 6) {
  mode = "n";
}
if (mode === "n") {
  nightMode();
}

footerDate.innerHTML = date.getFullYear();

dateWidget.innerHTML = `${date.getDate()} ${
  months[date.getMonth()]
} ${date.getFullYear()}`;

question1.addEventListener("click", () => {
  if (answer1.style.display === "none") {
    answer1.style.display = "block";
    arrow1.src = "images/arrow-up.png";
  } else {
    answer1.style.display = "none";
    arrow1.src = "images/arrow-down.png";
  }
});
question2.addEventListener("click", () => {
  if (answer2.style.display === "none") {
    answer2.style.display = "block";
    arrow2.src = "images/arrow-up.png";
  } else {
    answer2.style.display = "none";
    arrow2.src = "images/arrow-down.png";
  }
});
question3.addEventListener("click", () => {
  if (answer3.style.display === "none") {
    answer3.style.display = "block";
    arrow3.src = "images/arrow-up.png";
  } else {
    answer3.style.display = "none";
    arrow3.src = "images/arrow-down.png";
  }
});
question4.addEventListener("click", () => {
  if (answer4.style.display === "none") {
    answer4.style.display = "block";
    arrow4.src = "images/arrow-up.png";
  } else {
    answer4.style.display = "none";
    arrow4.src = "images/arrow-down.png";
  }
});

srcBtn.addEventListener("click", findCity);

srcInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    findCity();
  }
});

btnNewYork.addEventListener("click", () => {
  showWeather("New York", "US");
});
btnLondon.addEventListener("click", () => {
  showWeather("London", "GB");
});
btnDubai.addEventListener("click", () => {
  showWeather("Dubai", "AE");
});
btnParis.addEventListener("click", () => {
  showWeather("Paris", "FR");
});

function showHideFirst() {
  if (answer1.style.display === "none") {
    answer1.style.display = "block";
  } else {
    answer1.style.display = "none";
  }
}

function createList(elem, arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    const city = arr[i].name;
    const country = arr[i].sys.country;
    li.textContent = city + " , " + country;
    li.addEventListener("click", () => {
      showWeather(city, country);
      dropDown.style.display = "none";
    });
    elem.appendChild(li);
  }
}

function showWeather(city, country) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      const cityName = data.name;
      const country = data.sys.country;
      const minTempValue = data.main.temp_min;
      const maxTempValue = data.main.temp_max;
      const tempValue = data.main.temp;
      const weatherValue = data.weather[0].main;
      const weatherDescriptionValue = data.weather[0].description;
      const iconUrl = data.weather[0].icon.slice(0, -1) + mode;
      weatherIcon.src = `http://openweathermap.org/img/wn/${iconUrl}@2x.png`;
      temperature.innerHTML = Math.round(tempValue) + "°C";
      minTemp.innerHTML = Math.round(minTempValue) + "°C";
      maxTemp.innerHTML = Math.round(maxTempValue) + "°C";
      weather.innerHTML = weatherValue;
      cityWidget.innerHTML = `${cityName}, ${country}`;
      weatherDescription.innerHTML =
        weatherDescriptionValue[0].toUpperCase() +
        weatherDescriptionValue.slice(1);
      dropdownList.innerHTML = "";
    })
    .catch((err) => {
      errorM.style.display = "block";
    });
}

function findCity() {
  fetch(
    `https://api.openweathermap.org/data/2.5/find?q=${srcInput.value}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      errorM.style.display = "none";
      dropdownList.innerHTML = "";
      dropDown.style.display = "block";
      const citiesList = data.list;
      createList(dropdownList, citiesList);
    })
    .catch((err) => {
      errorM.style.display = "block";
    });
}

function nightMode() {
  dropdownList.classList.add("night-mode");
  srcBtn.style.background = "#2A344B";
  header.style.backgroundImage = "url(/images/night-bg.png)";
}

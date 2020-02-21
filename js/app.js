//https://www.pexels.com/

//dynamic image background -
// use some pics with light background for offline use also
document.body.style.backgroundImage = "url('https://picsum.photos/1600/900')";
const timeDisplay = document.getElementById("time");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const focus = document.getElementById("focus");
const quote = document.getElementById("quote");
const date_field = document.getElementById("date");

//show time
showTime = () => {
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let day = today.getDay();
  let hour = today.getHours(),
    mins = today.getMinutes(),
    seconds = today.getSeconds();

  const amPm = hour >= 12 ? "PM" : "AM";

  //12 hour format
  hour = hour % 12 || 12;
  // console.log(today);
  let dayString = "";
  switch (day) {
    case 0:
      dayString = "Sunday";
      break;
    case 1:
      dayString = "Monday";
      break;
    case 2:
      dayString = "Tuesday";
      break;
    case 3:
      dayString = "Wednesday";
      break;
    case 4:
      dayString = "Thursday";
      break;
    case 5:
      dayString = "Friday";
      break;
    case 6:
      dayString = "Saturday";
      break;

    default:
    // code block
  }
  date_field.innerText = `${dayString} ${date}/${month + 1}/${year}`;

  timeDisplay.innerHTML = `${hour}:${addZero(mins)}:${addZero(
    seconds
  )} ${amPm}`;
  setTimeout(showTime, 1000);
};
//adding zero if mins/seconds are less than 10
addZero = n => (parseInt(n, 10) < 10 ? "0" : "") + n;

//greeting
setGreeting = () => {
  let today = new Date();
  let hours = today.getHours();

  // if (hours <= 4) {
  //   document.body.style.backgroundImage = "url('../img/night.jpg')";
  //   greeting.textContent = "Good Night";
  //   document.body.style.color = "white";
  // } else

  //restore background later

  if (hours < 12) {
    // document.body.style.backgroundImage = "url('../img/morning.jpg')";
    greeting.textContent = "Good Morning";
  } else if (hours < 18) {
    // document.body.style.backgroundImage = "url('../img/evening.jpg')";
    greeting.textContent = "Good Afternoon";
  } else {
    // document.body.style.backgroundImage = "url('../img/night.jpg')";
    greeting.textContent = "Good Evening";
    document.body.style.color = "white";
  }
};

//set name
setName = e => {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
};

//name
getName = () => {
  if (localStorage.getItem("name") === null) {
    name.textContent = `[Enter name]`;
  } else {
    name.textContent = localStorage.getItem("name");
  }
};

getFocus = () => {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = `What is on your mind.`;
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
};

setFocus = e => {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
};

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

//get quotes from ls
getQuotesFromLocalStorage = () => {
  quote.innerText = localStorage.getItem("quote");
  author.innerText = localStorage.getItem("author");
};
async function getQuotes() {
  // let response = await fetch("http://quotes.rest/qod.json");
  let response = await fetch("https://api.quotable.io/random");
  let data = await response.json();
  // console.log(data);
  let quote = data.content;
  let author = data.author;
  let str = `"${quote}" -${author}`;
  // console.log(str);
  localStorage.setItem("quote", quote);
  localStorage.setItem("author", author);

  setTimeout(getQuotes, 3600000);
  setTimeout(getQuotesFromLocalStorage, 3600002);
}

getQuotes(); //-turn this on later
getQuotesFromLocalStorage();
const APPID = "e130bc26a9c410b20ed37df452977674";
//weather
getWeather = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = `https://api.darksky.net/forecast/${APPID}/${lat},${lon}`;
      const response = await fetch(proxyurl + url);
      const json = await response.json();
      const temp = ((json.currently.temperature - 32) * (5 / 9)).toFixed(2);
      const summary = json.currently.summary;
      let timeZone = `Timezone - ${json.timezone}`;
      console.log(timeZone);
      console.log(temp, summary);
      console.log(lat, lon);
      let str = `${temp} °C-${summary}`;
      document.getElementById("weather").innerText = str;
      document.getElementById("timezone").innerText = timeZone;
      localStorage.setItem("weather", str);
      localStorage.setItem("timezone", timeZone);
    });
  } else {
    console.log("geolocation not available");
  }
  setTimeout(getWeather, 3600000);
  setTimeout(getWeatherFromLocalStorage, 3600002);
};

//get weather from ls
getWeatherFromLocalStorage = () => {
  document.getElementById("weather").innerText = localStorage.getItem(
    "weather"
  );
  document.getElementById("timezone").innerText = localStorage.getItem(
    "timezone"
  );
};
getWeather();
getWeatherFromLocalStorage();
showTime();
setGreeting();
getName();
getFocus();

//game button click

myFunction = () => {
  document.getElementById("myDropdown").classList.toggle("show");
};

// Close the dropdown if the user clicks outside of it
window.onclick = event => {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

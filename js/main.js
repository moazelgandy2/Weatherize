const loader = document.querySelector(".loader");

const search = document.querySelector(".search");

const forcastsCard = document.querySelector(".forcasts");

const city = document.querySelector(".city");

const temp = document.querySelector(".temp");

const date = document.querySelector(".date");

const condition = document.querySelector(".condition");

const windSpeed = document.querySelector(".wind-speed");

const humidity = document.querySelector(".humidity");

// ! Get todays date
const today = new Date();
const todayString = today.toISOString().split("T")[0];

// ! Search forcast
let typingTimer;
const doneTypingInterval = 700; //time in ms (5 seconds)

// ! API setting
let APIKey = "9adb2bc5e0d84689826164557232912";
let searchQ;

getData("Cairo", APIKey);

function getData(searchQ, APIKey) {
  const proxyUrl = "https://corsproxy.io/?";

  fetch(`${proxyUrl}https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${searchQ}&days=4`)
    .then((response) => response.json())
    .then((data) => {
      display(data, data.forecast.forecastday);
      loader.classList.add("hidden");
      search.addEventListener("keyup", () => {
        clearTimeout(typingTimer);
        if (search.value) {
          typingTimer = setTimeout(() => {
            searchQ = search.value;
            getData(searchQ, APIKey);
            search.classList.remove("border-red-500");
          }, doneTypingInterval);
        }
      });
    })
    .catch((error) => {
      // console.log(error);
      getData("cairo", APIKey);
      search.classList.add("border-red-500");
    });
}
//! Display data function
function display(data, forcasts) {
  let forcastDay = ``;

  //! Days Forcast
  for (const day of forcasts) {
    const forecastDate = day.date;

    if (forecastDate !== todayString) {
      forcastDay += `
        <div class="bg-gray-200 py-2 rounded-lg col-span-12 md:col-span-6 lg:col-span-4">
                  <p class="forcatsDay text-lg font-bold">${dayName(day.date)}</p>
                  <div class="flex mb-3">
                    <div class="flex-1">
                      <p class="mt-2 text-sm font-semibold">Min Temp</p>
                      <p class="forcastTemp text-lg font-normal">${Math.round(
                        day.day.mintemp_c
                      )}<sup>°</sup></p>
                    </div>
                    <div class="flex-1">
                      <p class="mt-2 text-sm font-semibold">Avg Temp</p>
                      <p class="forcastTemp text-lg font-normal">${Math.round(
                        day.day.avgtemp_c
                      )}<sup>°</sup></p>
                    </div>
                    <div class="flex-1">
                      <p class="mt-2 text-sm font-semibold">Max Temp</p>
                      <p class="forcastTemp text-lg font-normal">${Math.round(
                        day.day.maxtemp_c
                      )}<sup>°</sup></p>
                    </div>
                  </div>
                  
                  <p class="forcatsCond text-gray-800">${day.day.condition.text}</p>
                  <img class="ml-6 w-12" src="${day.day.condition.icon}" alt="${
        day.day.condition.text
      } icon"/>
                  
                </div>`;
    }
  }

  // ! Top section location name and date
  date.innerHTML = formateDate(data.location.localtime);
  city.innerHTML = data.location.name;

  // ! Main content
  temp.innerHTML = `${Math.round(data.current.feelslike_c)}<sup>°</sup>`;
  condition.innerHTML = data.current.condition.text;
  windSpeed.innerHTML = `${data.current.wind_kph} kph`;
  humidity.innerHTML = `${data.current.humidity} %`;

  // ! Days forcasts cards
  forcastsCard.innerHTML = forcastDay;
}

function formateDate(date) {
  const dateSplit = date.split(" ")[0];

  const localDate = dateSplit;

  const [year, month, day] = localDate.split("-");

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

function dayName(dateString) {
  const date = new Date(dateString.replace(/-/g, "/"));
  const options = { weekday: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// ! Get the user location
const successCallback = (position) => {
  // console.log(position);
  getData(`${position.coords.latitude},${position.coords.longitude}`, APIKey);
};

const errorCallback = (error) => {
  temp.innerHTML = error.message;
  console.log(error.message);
  getIp();
  alert("Please allow access to your location for the weather app to work properly.");
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function getIp() {
  let request = new XMLHttpRequest();

  request.open(
    "GET",
    "https://api.ipdata.co/?api-key=cf77eb12f918cfc3fea13e197a62fa2ab6811aa58dcea42542114f20"
  );

  request.setRequestHeader("Accept", "application/json");

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      const userLocation = JSON.parse(this.responseText).country_name;
      getData(userLocation, APIKey);
    }
  };

  request.send();
}

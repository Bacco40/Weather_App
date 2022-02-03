import './style.css';
import format from 'date-fns/format';
import 'regenerator-runtime/runtime';

const description = document.querySelector('.description');
const icon = document.querySelector('.icon');
const date = document.querySelector('.date');
const city = document.querySelector('.city');
const table = document.querySelector('.table');
const temperature = document.querySelector('.temperature');
const max = document.querySelector('.max');
const min = document.querySelector('.min');
const feels = document.querySelector('.feels');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const cityName = document.querySelector('.cityName');
const btn = document.querySelector('.src');
const error = document.querySelector('.error');
const celsius = document.querySelector('.celsius');
let tempCity = 'Milan';
const todays = format(new Date(), 'ccc d MMMM u');

async function getWeather(thisCity, unit) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${thisCity}&units=${unit}&id=524901&appid=05f9c97d45dde7245eefc5ed36fdeaa6`, { mode: 'cors' });
    const data = await response.json();
    const myTemp = JSON.stringify(data.main.temp);
    const myMax = JSON.stringify(data.main.temp_max);
    const myMin = JSON.stringify(data.main.temp_min);
    const myFeel = JSON.stringify(data.main.feels_like);
    table.style.cssText = 'animation: myTable 3s;';
    date.innerHTML = todays;
    city.innerHTML = `${data.name},<span class="state">${data.sys.country}</span>`;
    description.innerHTML = data.weather[0].description;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    temperature.innerHTML = `${myTemp.slice(0, -1)}°`;
    max.innerHTML = `Max:${myMax.slice(0, -1)}°`;
    min.innerHTML = `Min:${myMin.slice(0, -1)}°`;
    feels.innerHTML = `Fells like :<div class="detail">${myFeel.slice(0, -1)}°</div>`;
    humidity.innerHTML = `Humidity:<div class="detail">${data.main.humidity}%</div>`;
    pressure.innerHTML = `Pressure :&nbsp;&nbsp;&nbsp;<div class="detail">${data.main.pressure}mb</div>`;
    error.innerHTML = '';
    tempCity = thisCity;
  } catch {
    error.innerHTML = 'No matching location found!';
  }
}
table.style.cssText = 'opacity:0;';
getWeather(tempCity, celsius.value);

btn.addEventListener('click', () => {
  if (cityName.value !== '') {
    getWeather(cityName.value, celsius.value);
  } else {
    error.innerHTML = 'Please insert a location!';
  }
  cityName.value = '';
});

celsius.addEventListener('click', () => {
  if (celsius.value === 'metric') {
    celsius.value = 'imperial';
    getWeather(tempCity, celsius.value);
  } else {
    celsius.value = 'metric';
    getWeather(tempCity, celsius.value);
  }
});

cityName.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (cityName.value !== '') {
      getWeather(cityName.value, celsius.value);
    } else {
      error.innerHTML = 'Please insert a location!';
    }
    cityName.value = '';
  }
});

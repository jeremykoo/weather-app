API_KEY = 'UGMYQH96QEFJK6KHCHCH6N52P'
const loader = document.querySelector('.loader');

async function getCity(city = 'Los Angeles') {
  try {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${API_KEY}&contentType=json`;
    const response = await fetch(url);
    const weatherData = await response.json();
    console.log(weatherData);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const filteredData = {
      time: weatherData.currentConditions.datetime,
      temp: weatherData.currentConditions.temp,
      conditions: weatherData.currentConditions.conditions,
      uvIndex: weatherData.currentConditions.uvindex,
      windSpeed: weatherData.currentConditions.windspeed,
      description: weatherData.description,
      resolvedAddress: weatherData.resolvedAddress,
    };
    return filteredData;
  } catch(error) {
    alert(error);
  }
}


function setCityFields(data) {
  const cityInfo = document.querySelector('.city-info');
  const address = document.querySelector('.address');
  address.textContent = data.resolvedAddress;
  const time = document.querySelector('.time');
  time.textContent = `Time: ${data.time}`;
  const conditions = document.querySelector('.conditions');
  conditions.textContent = `Current Conditions: ${data.conditions}`;
  const temp = document.querySelector('.temp');
  temp.textContent = `${data.temp} degrees Fahrenheit`;
  const uvindex = document.querySelector('.uvindex');
  uvindex.textContent = `UV Index: ${data.uvIndex}`;
  const wind = document.querySelector('.windspeed');
  wind.textContent = `Wind Speed: {data.windSpeed}`;
  const description = document.querySelector('.description');
  description.textContent = data.description;
}

const cityInfo = document.querySelector('.city-info');
const field = document.querySelector('#city');
const submitButton = document.querySelector('button');
submitButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const searchCity = field.value !== '' ? field.value : 'Los Angeles';

  loader.className = 'loader';
  cityInfo.className = 'city-info hidden';
  const weatherData = await getCity(searchCity);
  console.log(weatherData.resolvedAddress);

  loader.className = 'loader hidden';
  cityInfo.className = 'city-info';
  setCityFields(weatherData);
});

getCity().then((data) => {
  console.log(data);
  setCityFields(data); 
})
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const errorEl = document.querySelector(".error");
// data from open weather api

async function getData(city) {
  const apiKey = "ad0f81c2d0eec659974b95da023f69a0";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  searchBtn.disabled = true;
  clearError();

  try {
    const response = await fetch(url + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Location not found: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    let advice;

    if (data.main.temp >= 21) {
      advice =
        "Keep clothing light and protect from the sun. Short-sleeve bodysuit or T-shirt with light trousers, shorts, or a romper";
    } else if (data.main.temp >= 10) {
      advice =
        "Add a light outer layer for cooler weather. Bodysuit or light top, trousers, removable cardigan or thin jacket";
    } else if (data.main.temp >= 0) {
      advice =
        "Layer with warm outerwear for cold temperatures. Long-sleeve bodysuit, trousers, jumper or fleece, medium jacket, socks or booties; hat in cold wind";
    } else {
      advice =
        "Provide full coverage and protect hands and feet. Long-sleeve base layer, warm trousers or sleepsuit, fleece or wool mid-layer, insulated outerwear, hat, mittens, warm socks or booties";
    }
    document.querySelector(".wear").textContent = advice;
  } catch (error) {
    console.error(error.message, error);
    if (error.status === 404);
    errorEl.textContent = "City not found. Check the spelling and try again.";
    errorEl.hidden = false;

    document.querySelector(".city").innerHTML = "";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".wear").textContent = "";
    //clearError();
  } finally {
    searchBtn.disabled = false;
  }
}
searchBtn.addEventListener("click", () => {
  getData(searchBox.value);
});

searchBox.addEventListener(
  "keydown",
  (e) => e.key === "Enter" && getData(searchBox.value),
);

function clearError() {
  errorEl.textContent = "";
  errorEl.hidden = true;
}

/*
if (> 21deg) Keep clothing light and protect from the sun.
if (10deg-16deg) Add a light outer layer for cooler weather.
if (-1deg to 4deg) Layer with warm outerwear for cold temperatures
if(<-7) Provide full coverage and protect hands and feet
*/

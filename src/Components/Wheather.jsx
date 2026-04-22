import React, { useEffect, useRef, useState } from "react";
import "./wheather.css";
import search_icon from "../assets/search_icon_125165.png";
import weather_icon from "../assets/if-weather-3-2682848_90785.png";
import humidity_icon from "../assets/humidity_icon_216429.png";
import wind_icon from "../assets/wind_icon_173470.png";
import cloud_icon from "../assets/cloudy_weather_sun_cloud_icon_210228.png";
import drizzle_icon from "../assets/1494258097-rainrainfalldrizzlesuncloudweatherforecast_84357.png";
import rain_icon from "../assets/sunny_rain_weather_icon_151785.png";
import snow_icon from "../assets/winter_icon-icons.com_59811.png";

const Wheather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": weather_icon,
    "01n": weather_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter a City name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || weather_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className="wheather">
      <div className="Searchbar">
        <input
          ref={inputRef}
          className="input"
          typeof="String"
          placeholder="enter you city"
        ></input>
        <img
          className="search_icon"
          src={search_icon}
          onClick={() => search(inputRef.current.value)}
        ></img>
      </div>

      {weatherData ? (
        <>
          <div className="wheather_icon">
            <img className="wheather_img" src={weatherData.icon} alt=""></img>
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>

            <div className="wheather_data">
              <div className="col">
                <img className="icon" src={humidity_icon} alt=""></img>
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img className="icon" src={wind_icon} alt=""></img>
                <div>
                  <p>{weatherData.windSpeed} km/h</p>
                  <span>wind speed</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Wheather;

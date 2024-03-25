import { useEffect, useState } from "react";
import "./App.css";

import Sunrise from "/video/sunrise.gif";
import Sunset from "/video/sunset.gif";
import Wind from "/video/wind.gif";
import Vis from "/video/binocular.gif";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  function timeFormat(time) {
    const newTime = new Date(time * 1000).toLocaleTimeString();
    return newTime;
  }
  function changeSearch(e) {
    // console.log(e.target.value)
    setSearch(e.target.value);
  }
  function handleSearch(e) {
    if (e.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=${API_key}&q=${search}`
      )
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error));
    }
  }

  console.log(search);
  const API_key = "3c809b99ce00a826ded71fe85e5f0e15";
  console.log(data);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_key}`
        )
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error));
      });
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center py-5">
        <input
          onChange={changeSearch}
          onKeyDown={handleSearch}
          value={search}
          type="text"
          name="search"
          className="search_input"
          placeholder="Search your City"
        />
      </div>
      <div className="d-flex justify-content-center">
        <div className="main-container ">
          <div className="col-6 d-flex justify-content-center">
            <img
              className="weather-logo"
              src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
              alt="weather-logo"
            />
          </div>
          <div className="col-6">
            <h3>Weather in {data?.name || "your City"}</h3>
            <h4>{data?.weather[0]?.description || "Description"}</h4>
            <h4>Temperature: {(data?.main?.temp - 273.15).toFixed(2)}°C</h4>
          </div>
        </div>
        <div className="box">
          <div className="box-1">
            <h3>Sunrise</h3>
            <img src={Sunrise} alt="sunrise" />
            <h4> {timeFormat(data?.sys?.sunrise) || "AM"}</h4>
          </div>
          <div className="box-1">
            <h3>Sunset</h3>
            <img src={Sunset} alt="sunset" />
            <h4> {timeFormat(data?.sys?.sunset) || "PM"}</h4>
          </div>
          <div className="box-1">
            <h3>Visibility</h3>
            <img src={Vis} alt="visibility" />
            <h4> {data?.visibility + " m" || "dhundhla dhundla laage "}</h4>
          </div>
          <div className="box-1">
            <h3>Wind Speed</h3>
            <img src={Wind} alt="wind" />
            <h4> {data?.wind?.speed + " Km/h"}</h4>
          </div>
        </div>
      </div>

      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
// sunrise
// sunset
// wind speed
// visibility

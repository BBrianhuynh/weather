import { useState, useEffect } from 'react'
import {number} from './App'
import { Link } from "react-router-dom";
var city = "San Jose"
var number1 = number;
function ExtraDetails() {
  var [pre, setPre] = useState("");
  var [snow, setSnow] = useState("");
  var [windDirection, setWindDirection] = useState("");
  var [windSpeed, setWindSpeed] = useState("");
    useEffect(() => {
      // Refresh the page to get the data
        const fetchData = async () => {
          const response = await fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=9f79c9596a3d476282582a410c46a516&include=minutely`);
          const data = await response.json();
          setSnow(snow = data.minutely[number1].snow)
          setPre(pre = data.minutely[number1].precip);
          setWindDirection(windDirection = data.data[number1].wind_cdir_full);
          setWindSpeed(windSpeed = Math.round(data.data[number1].wind_spd));
        }
        fetchData().catch(console.error);
      },[]);
    return (
      <div>
        <div><Link to="/" ><button>Home</button></Link></div>
        <p>Wind Direction: {windDirection}</p>
        <p>Wind Speed: {windSpeed} MPH</p>
      <p>Precipitation: {pre}</p>
      <p>Snow: {snow}</p>
      </div>
    )
}

export default ExtraDetails;
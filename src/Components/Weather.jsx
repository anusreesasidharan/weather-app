import React, {useEffect,useRef,useState  } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import sun_icon from '../assets/sun.png'
import thunder_icon from '../assets/thunder.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import snow_icon from '../assets/snow.png'

const Weather = () => {
   const inputRef = useRef() 
const [weatherData,setWeatherData]=useState(false)
    const allIcons ={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":sun_icon,
        "02n":sun_icon,
        "03d":sun_icon,
        "03n":sun_icon,
        "04d":thunder_icon,
        "04n":thunder_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "010d":rain_icon,
        "010n":rain_icon,
        "013d":snow_icon,
        "013n":snow_icon
    }

    const search = async (city)=>{
        if(city === ""){
            alert("Enter City Name")
            return;
        }
        
        
        try {
            const apikey='5fe36b192ffd1c36dffb6752bc1722b2'
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
        const response = await fetch(url);
        const data = await response.json();
       if(!response.ok){
        alert(data.message);
        return;
       }
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
humidity:data.main.humidity,
windSpeed:data.wind.speed,
temperature:Math.floor(data.main.temp),
location:data.name,
icon:icon

        })
        }catch (error){
setWeatherData(false)
console.log("Error in fetching weather data");

        }
        
    }
    useEffect(()=>{
        search("London")
    },[])
    return (
        <div className="weather">
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='search' />
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
            </div>
            {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img  src={humidity_icon} alt="" />

                    <div>
                        <p>91%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={wind_icon} alt="" />
                
                  <div>
                    <p>{weatherData.windSpeed}Km/h</p>
                    <span>Wind Speed</span>
                  </div>
                </div>
           </div>
           </>:<></>}
        </div >
    )
}

export default Weather
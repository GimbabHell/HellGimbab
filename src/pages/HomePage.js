import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";


const HomePage = () => {

    // 상단에 띄울 현재 시간 state
    const [currentAtTime,setCurrentAtTime] = useState("");

    // 날씨 API 호출을 위한 state
    const API_KEY = '207a52923e0d2e1ca4acea1ce48628fc';
    const [position, setPosition] = useState({});
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState({});
    const [temp, setTemp] = useState({});
    const [iconURL, setIconURL] = useState(``);
    // const [aboutDeath, setAboutDeath] = useState("");
    
    const navigate = useNavigate();

    const onClickHandler= ()=>{
        navigate("/menu");
    }

    // 위치 가져오기
    const getPosition =()=>{

        return(
            new Promise((resolve, reject)=>{
                navigator.geolocation.getCurrentPosition((currentPosition)=>{
                    setPosition({
                        latitude: currentPosition.coords.latitude,
                        longitude: currentPosition.coords.longitude
                    });
                    return(
                        resolve(currentPosition.coords)
                    );
                })
            })
        )
    }

    const getWeather =(coords)=>{
        
        return(
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`)
                .then(response => response.json())
        )
    }

    // https 보안 이슈로 주석처리합니다.
    // const bringAPI =async()=>{
        
    //     return(
    //         fetch('https://api.quotable.io/random')
    //     .then(response=>response.json())
    //     .then(data=>setAboutDeath(data.content))
    //     )
    //     // const response = await fetch('https://api.quotable.io/random');
    //     // const data = await response.json();
    //     // setHello(data.content);
    // }

    useEffect(()=>{

        async function weatherAtLocation(){
            const currentPosition = await getPosition();
            const weatherInfo = await getWeather(currentPosition);
            const icon =await weatherInfo.weather[0].icon;
            console.log(weatherInfo);
            setCityName(weatherInfo.name);
            setWeather(weatherInfo.weather[0].description);
            setTemp(weatherInfo.main.temp);
            setIconURL(`https://openweathermap.org/img/wn/${icon}@2x.png`);
        }
        weatherAtLocation();

        // https 보안 이슈로 주석처리합니다.
        // async function wiseSaying(){
        //     const saying = await bringAPI();

        // }
        // wiseSaying();
    },[])
       

    return(
        <>
            <h1>김밥지옥</h1>
            <p>{`${cityName} / ${temp}℃ / ${weather}`}</p>
            <img src={iconURL}/>
            <img src={"https://loremflickr.com/320/240/satan"}/>
            <div>
            {/* <h3>{aboutDeath}</h3> */}
            <button onClick={onClickHandler}>매장식사</button>
            <button onClick={onClickHandler}>포장</button>
            </div>
        </>
        
    )
}

export default HomePage;


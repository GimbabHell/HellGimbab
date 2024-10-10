import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { orderStore } from "../store";
//import "./HomePage.css";
import HomeStyle from "./HomePage.css";

const HomePage = () => {
    // 상단에 띄울 현재 시간 state
    const [currentAtTime, setCurrentAtTime] = useState("");

    // 날씨 API 호출을 위한 state
    const API_KEY = "207a52923e0d2e1ca4acea1ce48628fc";
    const [position, setPosition] = useState({});
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState({});
    const [temp, setTemp] = useState({});
    const [iconURL, setIconURL] = useState(``);

    // 이미지 API 호출하기 위한 state
    const [satanUrl, setSatanUrl] = useState(``);
    const [loading, setLoading] = useState(true);

    // const [aboutDeath, setAboutDeath] = useState("");

    const navigate = useNavigate();
    const { setPlace } = orderStore();

    const onClickForHere = e => {
        if(e.target.innerText === "포장"){ setPlace(true); }
        else{ setPlace(false) }
        navigate("/menu");
    };

    // 위치 가져오기
    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((currentPosition) => {
                setPosition({
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude,
                });
                return resolve(currentPosition.coords);
            });
        });
    };

    const getWeather = (coords) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`).then((response) => response.json());
    };

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

    useEffect(() => {
        async function weatherAtLocation() {
            const currentPosition = await getPosition();
            const weatherInfo = await getWeather(currentPosition);
            const icon = await weatherInfo.weather[0].icon;
            console.log(weatherInfo);
            setCityName(weatherInfo.name);
            setWeather(weatherInfo.weather[0].description);
            setTemp(weatherInfo.main.temp);
            setIconURL(`https://openweathermap.org/img/wn/${icon}@2x.png`);
        }
        weatherAtLocation();

        const fetchImage =async()=>{
            const response = await fetch("https://loremflickr.com/700/616/satan");
            if(response.ok){
                setSatanUrl(response.url);
            }else{
                console.error("이미지씨.. 어딨나요? ㅠㅠ");
            }
            setLoading(false);
        };
        fetchImage();

        // https 보안 이슈로 주석처리합니다.
        // async function wiseSaying(){
        //     const saying = await bringAPI();

        // }
        // wiseSaying();
    }, []);

    return (
        <div className="home">
            <div className="bg" style={{backgroundImage: `url(${satanUrl})`}}>
            </div>
            <div className="cont">
                <h1 className="logo">Gimbab HELL</h1>
                <div className="info">
                    <div className="left">
                        <img src={iconURL}/> 
                        <p>{cityName}</p>
                    </div>
                    <div className="right">
                    <p>{`${temp}℃ | ${weather}`}</p>
                    </div>
                </div>
                <div className="imgBox">
                    {loading || !satanUrl ? <h2 className="altText">COMING.. DEVIL..!</h2> : <img src={satanUrl}/>}
                </div>
                <p className="txt">원하시는 옵션을<br/>선택해주세요</p>
            </div>
            
            <div className="btn-wrap">
                <button onClick={onClickHandler}>매장식사 <span>For here</span></button>
                <button onClick={onClickHandler}>포장 <span>To go</span></button>
            </div>
        </div>
    );
};

export default HomePage;

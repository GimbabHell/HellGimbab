import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { orderStore } from "../store";
//import "./HomePage.css";
import HomeStyle from "./HomePage.css";

const HomePage = () => {

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
    const [isVisible, setIsVisible] = useState(false);

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

    useEffect(() => {
        async function weatherAtLocationAndfetchImage() {
            const currentPosition = await getPosition();
            const weatherInfo = await getWeather(currentPosition);
            const icon = await weatherInfo.weather[0].icon;
            // console.log(weatherInfo);
            setCityName(weatherInfo.name);
            setWeather(weatherInfo.weather[0].description);
            setTemp(weatherInfo.main.temp);
            setIconURL(`https://openweathermap.org/img/wn/${icon}@2x.png`);

            const response = await fetch("https://loremflickr.com/700/616/satan");
            if(response.ok){
                setSatanUrl(response.url);
            }else{
                console.error("이미지씨.. 어딨나요? ㅠㅠ");
            }

             setTimeout(() => {
                setIsVisible(true);
                setLoading(false);
            }, 3000);
            console.log(isVisible);


            
        }
        weatherAtLocationAndfetchImage();      

    }, []);
    console.log(isVisible);
    return (

        <div className="home">
            <div className={`bg`} style={{ backgroundImage: `url(${satanUrl})` }}></div>
            <div className={`cont`}>
                <h1 className="logo">Gimbab HELL</h1>
                <div className={`info`}>
                    {loading ?
                    <>
                        <div className="left">
                            <img src={"../images/logo/weatherOfHell.png"}/> 
                            <p>HELL</p>
                        </div>
                        <div className="right">
                            <p>99999999℃ | THREE SUNS</p>
                        </div>
                    </>
                        :
                    <>
                        <div className={`left fade-in ${isVisible ? 'visible' : ''}`}>
                            <img src={iconURL}/> 
                            <p>{cityName}</p>
                        </div>
                        <div className={`right fade-in ${isVisible ? 'visible' : ''}`}>
                            <p>{`${temp}℃ | ${weather}`}</p>
                        </div>
                    </> 
                    }
                </div>
                <div className={`imgBox`}>
                    {loading || !satanUrl ? <h2 className="altText">COMING.. DEVIL..!</h2> : <img className={`fade-in ${isVisible ? 'visible' : ''}`} src={satanUrl}/>}
                </div>
                <p className="txt">원하시는 옵션을<br/>선택해주세요</p>
            </div>
            
            <div className="btn-wrap">
                <button onClick={onClickForHere}>매장식사 <span>For here</span></button>
                <button onClick={onClickForHere}>포장 <span>To go</span></button>
            </div>
        </div>
    );
};

export default HomePage;

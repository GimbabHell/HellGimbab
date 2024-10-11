import { useNavigate,Link } from "react-router-dom";
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
    const [fadeOut, setFadeOut] = useState(false);

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
            if(loading){
                const timer = setTimeout
            }
            setLoading(false);

          
        }
        weatherAtLocationAndfetchImage();

        }, []);

    useEffect(() => {
        
        if (!loading) {
            // 로딩이 끝나면 페이드 아웃 시작
            setFadeOut(true);
            const timer = setTimeout(() => {
                setFadeOut(false); // 페이드 아웃 상태 해제
                setIsVisible(true); // 새로운 정보가 보이도록 설정
               
            }, 1000); // 페이드 아웃 시간과 일치시킴
            return ()=> clearTimeout(timer)
        } else {
            setFadeOut(false);
            setIsVisible(false); // 로딩 중에는 정보 숨김
            
        }
    }, [loading]);
    
    
    return (

        <div className="home">
            <div className={`bg`} style={{ backgroundImage: `url(${satanUrl})` }}></div>
            <Link to="/admin" className="btn-admin"></Link>
            <div className={`cont`}>
                <h1 className="logo">Gimbab HELL</h1>
            <div className={`info`}>

                <div>
                    <div className={`left ${isVisible? 'hidden' : ''}`}>
                        <img src={"../images/logo/weatherOfHell.png"} alt="로고" />
                        <p>HELL</p>
                    </div>
                    <div className={`right ${isVisible? 'hidden' : ''}`}>
                        <p>99999999℃ | THREE SUNS</p>
                    </div>
                </div>
                <div style={{visibility: isVisible? "visible":"hidden"}}>
                    <div className={`left  ${fadeOut ? '' : 'fade-in'}`}>
                        <img src={iconURL} alt="날씨 아이콘" />
                        <p>{cityName}</p>
                    </div>
                    <div className={`right  ${fadeOut ? '' : 'fade-in'}`}>
                        <p>{`${temp}℃ | ${weather}`}</p>
                    </div>
                </div>
                
            </div>
                <div className={`imgBox`}>
                    {loading ? <h2 className="altText">COMING.. DEVIL..!</h2> : <img className={`fade-in ${isVisible ? 'visible' : ''}`} src={satanUrl}/>}
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

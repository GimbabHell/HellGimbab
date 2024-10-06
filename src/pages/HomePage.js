import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



const HomePage = () => {

    // 상단에 띄울 현재 시간 state
    const [currentAtTime,setCurrentAtTime] = useState("");

    // 날씨 API 호출을 위한 state
    const [position, setPosition] = useState({});
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState({});

    // 인용구 AIP 호출을 위한 state - 근데 안 됨.. ㅠ
    const [hello, setHello] = useState("");
    
    const navigate = useNavigate();

    const onClickHandler= ()=>{
        navigate("/menu");
    }

    const bringAPI =async()=>{
        
        return(
            fetch('https://api.quotable.io/random')
        ).then(response=>response.json())
        .then(data=>setHello(data.content))
        // const response = await fetch('https://api.quotable.io/random');
        // const data = await response.json();
        // setHello(data.content);
    }

    useEffect(()=>{
        bringAPI(); 
    },[])
       

    return(
        <>
            <p>home</p>
            <div>
            <h1>{hello}</h1>
            <button onClick={onClickHandler}>매장식사</button>
            <button onClick={onClickHandler}>포장</button>
            </div>
        </>
        
    )
}

export default HomePage;


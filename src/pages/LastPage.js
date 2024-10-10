import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LastPage = () => {

    const [satanUrl, setSatanUrl] = useState("");
    const [loading, setLoading] = useState(true); // 로딩 중이면 트루, 로딩이 끝났으면 펄스
    const navigate = useNavigate();

    useEffect(()=>{

        const fetchImage =async()=>{
            const response = await fetch("https://loremflickr.com/320/300/satan");
            if(response.ok){
                setSatanUrl(response.url);
            }else{
                console.error("이미지씨가 도착하지 못 했읍니다.. 이미지씨 어딨어요?!!");
            }
            setLoading(false); // 이미지씨가 오든 말든 로딩은 끝났으니까..
            
        };
        fetchImage();
    }, []);
    
    const onClickHandler =()=>{
        navigate("/");
    };

    return(
        <>
        {loading || !satanUrl ? <h2>COMING.. DEVIL</h2> : <img src={satanUrl}/>}
        <h2>결제가 완료되었습니다.</h2>
        <h3>영수증 하단 주문 번호를 확인해 주세요.</h3>
        <br/>
        <h4>"우리 김밥지옥 먹어줘서 고맙다!"</h4>
        <br/>
        <button onClick={onClickHandler}>RETURN TO HELL</button>
        <br/>
        <Footer/>

        </>
    )
}

export default LastPage;
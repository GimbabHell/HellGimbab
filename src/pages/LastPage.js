import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const LastPage = () => {

    const [satanUrl, setSatanUrl] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{

        const fetchImage =async()=>{
            const response = await fetch("https://loremflickr.com/320/240/satan");
            setSatanUrl(response.url);
        };
        fetchImage();
    }, []);
    
    const onClickHandler =()=>{
        navigate("/");
    };

    return(
        <>
        <img src={satanUrl}/>
        <h2>결재가 완료되었습니다.</h2>
        <h3>영수증 하단 주문 번호를 확인해 주세요.</h3>
        <br/>
        <h4>"우리 김밥지옥 먹어줘서 고맙다!"</h4>
        <br/>
        <button onClick={onClickHandler}>Return to Hell</button>
        <br/>
        <Footer/>

        </>
    )
}

export default LastPage;
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import LastStyle from "./LastPage.css";
import { checkDetail, orderStore, useMemberStore } from "../store";

const LastPage = () => {

    const [satanUrl, setSatanUrl] = useState("");
    const [loading, setLoading] = useState(true); // 로딩 중이면 트루, 로딩이 끝났으면 펄스

    const { setDate, resetReceiptNum, setReceiptNum, setOrderHistory, toGo, forHereReceiptNum, toGoReceiptNum, resetFinal } = orderStore();
    const { phoneNumber, reset } = useMemberStore();
    const { resetValues } = checkDetail();

    useEffect(()=>{

        const fetchImage =async()=>{
            const response = await fetch("https://loremflickr.com/700/616/satan");
            if(response.ok){
                setSatanUrl(response.url);
            }else{
                console.error("이미지씨가 도착하지 못 했읍니다.. 이미지씨 어딨어요?!!");
            }
            setLoading(false); // 이미지씨가 오든 말든 로딩은 끝났으니까..
            
        };
        fetchImage();

        // date 배열 생성(현재 날짜, 시간 저장)
        const orderDate = new Date();
        setDate(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate(), orderDate.getDay(), orderDate.getHours(), orderDate.getMinutes());
        
        // 날짜가 바뀌었으면 주문번호 reset
        resetReceiptNum();

        // 주문번호 set
        setReceiptNum();

        // 주문 기록 배열에 저장
        setOrderHistory(phoneNumber);

    }, []);

    const onClickBack=()=>{
        resetFinal();
        resetValues();
        reset();
    };
    

    return(
        <>
            <div className="last">
                <h1 className="logo">Gimbab HELL</h1>
                <div className="imgBox">
                    {loading || !satanUrl ? <h2 className="altText">COMING.. DEVIL..!</h2> : <img src={satanUrl}/>}
                </div>
                <h2>결제가 완료되었습니다.</h2>
                <h3>영수증 하단 주문 번호를 확인해 주세요.</h3>
                <p className="dot">{ toGo===true? toGoReceiptNum : forHereReceiptNum }</p>
                <p className="dot">.</p>
                <p className="dot">.</p>
                <h4>"우리 김밥지옥 먹어줘서 고맙다!"</h4>
                <Link to="/" className="btn-back" onClick={()=>onClickBack()}>
                    지옥의 입구로..
                </Link>
            </div>
            <Footer/>
        </>
    )
}

export default LastPage;
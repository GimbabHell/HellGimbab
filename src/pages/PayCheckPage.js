import MemberCheckNumber from "../components/PayCheck/MemberCheckNumber";
import { useEffect, useState } from "react";


import { useNavigate, useSearchParams } from "react-router-dom";
import { orderStore,useMemberStore } from "../store";
import CardPay from "../components/PayCheck/CardPay";
import KakaoPay from "../components/PayCheck/KakaoPay";
import NaverPay from "../components/PayCheck/NaverPay";


const PayCheckPage = () => {
    // const [pay, setPay] = useState(null);
    const [show, setShow] = useState(false);
    // const [isPointsUsed, setIsPointsUsed] = useState(false);
    const [push, setPush] = useState(""); 
    // const [test, setTest] = useState(false);
    const nevi = useNavigate();
    const { totalPrice } = orderStore();
    const {phoneNumber,getPoints} = useMemberStore();
    const [search] = useSearchParams();
    const num = search.get("poiint");

    const[testNum, setTestNum] = useState(0);

    const[test, setTest] = useState(false);
    const[test2, setTest2] = useState(false);
    const[test3, setTest3] = useState(false);

    const onClickHandler = () => {
        setShow(true);
        // setIsPointsUsed(true);
    };


    const handleNotUsingPoints = () => {
        // setIsPointsUsed(false);
        setShow(false); 
    };

   
    const onClickHandler2 = () => {
        nevi("/menu");
    
    }

    const onClickHandler3 = () => {
        // setTest(true);
        console.log(push);
        if(push == 0){
            return setTest(true);
        }else if(push == 1){
            return  setTest2(true);
        }else if(push == 2){
            return  setTest3(true);
        }else{
            return alert("결제수단을 다시 선택해주세요 !");
        }
    }

    useEffect(()=>{
        const nn = () => {
            return getPoints(phoneNumber);
    
        };
        setTestNum(nn);
    })
    // const nn = () => {
    //     return getPoints(phoneNumber);

    // }

    return (
        <>
            <p>포인트 사용 여부 확인</p>
            <button onClick={onClickHandler}>사용</button>
            <button onClick={handleNotUsingPoints}>사용안함</button>

            {show ? <MemberCheckNumber  setShow={setShow}/> : null}


            <p>결제 수단 선택</p>
            <button onClick={() => setPush(0)}>카드결제</button>
            <button onClick={() => setPush(1)}>카카오Pay</button>
            <button onClick={() => setPush(2)}>네이버Pay</button>

            <h3>결제 금액 : {totalPrice}</h3>
            {console.log(phoneNumber)}
            {console.log(testNum)}
            <h3>포인트 사용 : {testNum}</h3>

            <h2>총 결제 금액: {totalPrice-testNum}</h2>
            {/* {renderPaymentComponent()} */}

            <button onClick={onClickHandler2}>취소</button>
            <button onClick={onClickHandler3}>결제하기</button>
            
            {test? <CardPay lastPrice={totalPrice-testNum} />:null}
            {test2? <KakaoPay lastPrice={totalPrice-testNum} />:null}
            {test3? <NaverPay lastPrice={totalPrice-testNum} />:null}
        </>
    );
};

export default PayCheckPage;

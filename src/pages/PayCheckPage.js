import MemberCheckNumber from "../components/PayCheck/MemberCheckNumber";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { orderStore } from "../store";
import CardPay from "../components/PayCheck/CardPay";
import KakaoPay from "../components/PayCheck/KakaoPay";
import NaverPay from "../components/PayCheck/NaverPay";


const PayCheckPage = ({}) => {
    // const [pay, setPay] = useState(null);
    const [show, setShow] = useState(false);
    // const [isPointsUsed, setIsPointsUsed] = useState(false);
    const [push, setPush] = useState(0); 
    // const [test, setTest] = useState(false);
    const nevi = useNavigate();
    const { totalPrice } = orderStore();
    const {poiint} = useParams();

    const onClickHandler = () => {
        setShow(true);
        // setIsPointsUsed(true);
    };

    // const selectPaymentMethod = (method) => {
    //     if (!isPointsUsed && method !== null) {
    //         alert("포인트 사용 여부를 확인해 주세요.");
    //         return;
    //     }
    //     setPay(method);
    // };

    // const renderPaymentComponent = () => {
    //     switch (pay) {
    //         case 0:
    //             return <CardPay totalCount={totalCount} />;
    //         case 1:
    //             return <KakaoPay totalCount={totalCount} />;
    //         case 2:
    //             return <NaverPay totalCount={totalCount} />;
    //         default:
    //             return null;
    //     }
    // };

    const handleNotUsingPoints = () => {
        // setIsPointsUsed(false);
        setShow(false); 
    };

   

    const onClickHandler2 = () => {
        nevi("/menu");
    
    }

    const onClickHandler3 = () => {
        // setTest(true);
       

        switch (push) {
                    case 0:
                        return <CardPay lastPrice={totalPrice-poiint} />;
                    case 1:
                        return <KakaoPay lastPrice={totalPrice-poiint} />;
                    case 2:
                        return <NaverPay lastPrice={totalPrice-poiint} />;
                    default:
                        return null;
                }
            
    }

    return (
        <>
            <p>포인트 사용 여부 확인</p>
            <button onClick={onClickHandler}>사용</button>
            {show ? <MemberCheckNumber  setShow={setShow}/> : null}

            <button onClick={handleNotUsingPoints}>사용안함</button>

            <p>결제 수단 선택</p>
            <button onClick={() => setPush(0)}>카드결제</button>
            <button onClick={() => setPush(1)}>카카오Pay</button>
            <button onClick={() => setPush(2)}>네이버Pay</button>

            <h3>결제 금액 : {totalPrice}</h3>
            {console.log(poiint)}
            <h3>포인트 사용 : {poiint}</h3>

            <h2>총 결제 금액: {totalPrice-poiint}</h2>
            {/* {renderPaymentComponent()} */}

            <button onClick={onClickHandler2}>취소</button>
            <button onClick={onClickHandler3}>결제하기</button>
            {/* 일단 결제하기 대강 만들어봄 .. */}
            {/* {test? <CardPay lastPrice={totalPrice-poiint} />:null} */}
        </>
    );
};

export default PayCheckPage;

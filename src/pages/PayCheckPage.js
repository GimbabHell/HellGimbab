
import MemberCheckNumber from "../components/PayCheck/MemberCheckNumber"
import { useState } from "react";
import NaverPay from "../components/PayCheck/NaverPay";
import KakaoPay from "../components/PayCheck/KakaoPay";
import CardPay from "../components/PayCheck/CardPay";
import { useParams } from "react-router-dom";
// import { orderStore } from "../../store";



const PayCheckPage = () => {

    
    const {totalCount} = useParams();// 포인트 까지 계산된 최종 금액

    const [pay, setPay] = useState(0);
    // 카드결제-> 0, 카카오페이-> 1, 네이버페이->2

    const [show, setShow] = useState(false);


    const onClickHandler = () => {
       setShow(true);
    }


    const onClickHandler1 = () => {
        return setPay(0);

    }

    const onClickHandler2 = () => {
 
         return setPay(1);
    }

    const onClickHandler3 = () => {
        return setPay(2);

    }

    const onClickHandler5 = () => {
        if(pay == 0){
            <CardPay />
        }else if(pay == 1){
            <KakaoPay/>
        }else if(pay == 2){
            <NaverPay/>
        }
    }
    return(

        <>
        <p>포인트 사용 여부 확인</p>
        
        <button onClick = {onClickHandler}>사용</button>
    
        {show ? <MemberCheckNumber/> : null}
        
        <button>사용안함</button>

        <p>결제 수단 선택</p>
        <button onClick = {onClickHandler1}>카드결제</button>
        <button onClick = {onClickHandler2}>카카오Pay</button>
        <button onClick = {onClickHandler3}>네이버Pay</button> 


        <h2>최종 결제 금액  {totalCount}</h2> 
        <button onClick={onClickHandler5}>결제</button>
        </>
    )
}

export default PayCheckPage;
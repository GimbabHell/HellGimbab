
import MemberCheckNumber from "../components/PayCheck/MemberCheckNumber"
import { useState } from "react";
import NaverPay from "../components/PayCheck/NaverPay";
import KakaoPay from "../components/PayCheck/KakaoPay";
import CardPay from "../components/PayCheck/CardPay";
import { useParams } from "react-router-dom";
// import { orderStore } from "../../store";



const PayCheckPage = () => {

    
    const {totalCount} = useParams();// 포인트 까지 계산된 최종 금액

    const {pay, setPay} = useState("");
    // 카드결제-> 0, 카카오페이-> 1, 네이버페이->2

    const onClickHandler= () => {
        if(pay ==  0){
            <CardPay totalCount={totalCount}/>
        }else if(pay == 1){
            <KakaoPay totalCount={totalCount}/>

        } else{<NaverPay totalCount={totalCount}/>
    }}


    return(

        <>
        <p>포인트 사용 여부 확인</p>
        <button onClick = {<MemberCheckNumber/>}>사용</button>
        <button>사용안함</button>

        <p>결제 수단 선택</p>
        <button onClick = {setPay(0)}>카드결제</button>
        <button onClick = {setPay(1)}>카카오Pay</button>
        <button onClick = {setPay(2)}>네이버Pay</button> 


        <h2>최종 결제 금액  {totalCount}</h2> 
        <button onClick={onClickHandler}>결제</button>
        </>
    )
}

export default PayCheckPage;
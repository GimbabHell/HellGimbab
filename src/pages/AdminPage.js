import { useEffect } from "react";
import { orderStore } from "../store";


const AdminPage = () => {

    const { orderHistory, setDate, date, togo } = orderStore();
    
    // 결제완료 시점
    // date 배열 생성
    // 주문번호 생성
    // 1 안 : orderHistory 에 접근, 현재 takeOut과 맞는 가장최근(lastindex) 주문의 주문번호 가져와서 +1
    // ==> 문제점 : 주문번호 reset이 안된다. 날짜가 지나도 주문번호는 계속 누적된다.
    // 2안 : zustand에 0과 100으로 만들어 놓고, 결제시점에 takeOut 확인후 +1 해서 set. 
    // reset(date) date 넘겨줘서 orderHistory 의 가장 마지막 주문의 date 와 비교후 date !== date 시 1과 100으로 reset
    
    // 모든걸 orderHistory에 저장
    // all reset

    // 1. setDate, 2. resetReceiptNum, 3. setReceiptNum, 4.setOrderHistory

    const orderDate = new Date();

    useEffect(()=>{
        setDate(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate(), orderDate.getDay(), orderDate.getHours(), orderDate.getMinutes());
    },[])
    

    // json push
    // 회원정보 조회
    // 주문 기록 조회
    // 매출, 


    return(
        <>
        <h1>{`${orderDate.getFullYear()}년 ${orderDate.getMonth() + 1}월 ${orderDate.getDate()}일`}</h1>
        <h1>{` ${orderDate.getDay()} ${orderDate.getHours()} ${orderDate.getMinutes()}`} </h1>
        {console.log(date)}
        {console.log(date['year'])}
        {console.log(date.year)}
        </>
    )
}
export default AdminPage;
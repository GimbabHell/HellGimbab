import { useEffect } from "react";
import { orderStore } from "../store";


const AdminPage = () => {

    const { orderHistory, setDate, date } = orderStore();
    
    // 결제완료 시점
    // 주문번호 생성
    // date 배열 생성
    // 모든걸 orderHistory에 저장
    // all reset

    const orderDate = new Date();

    useEffect(()=>{
        setDate(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate(), orderDate.getDay(), orderDate.getHours(), orderDate.getMinutes());
    },[])
    


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
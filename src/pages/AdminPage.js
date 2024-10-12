import { useEffect } from "react";
import { orderStore } from "../store";


const AdminPage = () => {

    const { orderHistory, setDate, date, togo } = orderStore();

    const orderDate = new Date();

    useEffect(()=>{
        setDate(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate(), orderDate.getDay(), orderDate.getHours(), orderDate.getMinutes());
    },[])
    

    // json push
    // 회원정보 조회
    ////--회원목록, 회원클릭시 해당 회원의 주문이력 목록 조회
    // 주문 기록 조회
    // 매출, 메뉴당, 기간당 

    // 1. orderHistory 만들기, members 만들기...
    ////--random()이용해서 json 만들기, orderHistory 에 추가??


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
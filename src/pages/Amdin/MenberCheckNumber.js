import {useState} from "react";
import { useNavigate } from "react-router-dom";




const MenberCheckNumber = () => {

    const {phoneNumber, setPhoneNumber} = useState("");
    // 일단 .. 전화번호 입력받을 객체
    const {inputNumber, setInoutNumber} = useState([]);
    // 입력 받은 값 일단 넣어줄 배열


    const navigate = useNavigate();

    const onClickHandler= ()=>{
        // x 또는 확인을 누르면 결제 페이지로 넘어간다.. 
        navigate("/paycheck")
    }
     /*
            1. 입력받은 번호를 붙여준다
            2. 그 번호가 기존 데이터에 있는 번호면 포인트를 끌고와서 다음 페이지로 이동
            3. 같은 회원 phoneNumber 가 없으면 추가되도록 해야함.
        */



    return(
        <>
        <h2>핸드폰 번호 입력</h2>
        <h3>핸드폰 번호를 입력해주세요</h3>
        <h4>{phoneNumber}</h4>
        <h4 onClickHandler = {onClickHandler}>x</h4>

        <button onClick = {onClickHandler2}>1</button>
        <button onClick = {onClickHandler2}>2</button>
        <button onClick = {onClickHandler2}>3</button>
        <button onClick = {onClickHandler2}>4</button>
        <button onClick = {onClickHandler2}>5</button>
        <button onClick = {onClickHandler2}>6</button>
        <button onClick = {onClickHandler2}>7</button>
        <button onClick = {onClickHandler2}>8</button>
        <button onClick = {onClickHandler2}>9</button>
        <button onClick = {onClickHandler2}>지우기</button>
        <button onClick = {onClickHandler2}>0</button>
        <button onClick = {onClickHandler}>확인</button>
        </>
    )


}

export default MenberCheckNumber;
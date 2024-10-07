
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import DiscountPoint from "./components/PayCheck/DiscountPoint";


// 번호를 입력한 후에 넘어오는 포인트 창
const MemberCheckPoint = ({phoneNumber}) => {

    const [plusPointNumber, setPlusPointNumber] = useState(""); // 입력받은 point
    const [pointNumber, setPointNumber] = useState(""); // 기존에 있던 point // 입력받은 point보다 큰지 비교
    const [count, setCount] = useState(""); // 결제해야할 금액
    const [totalCount, setTotalCount] = useState(""); // point 까지 계산한 총 결제 금액
    const nevigate = useNavigate();


    const handleButtonClick = (num) => {
        setPlusPointNumber((prev) => prev + num);
    }


    const handleClear = () => {
        setPlusPointNumber("");
    }


    const onClickHandler2 = () => {
        // 적용 -> 기존 가격에서 사용 할 포인트 만큼 연산된 후 보여줘야 함
        // 결제금액 - 사용포인트 
        // <DiscountPoint pointNumber={pointNumber}/>
        nevigate("/PayCheckPage");
        // 다시 PayCheckPage로 이동 !
    }


    return(
        <>
        
        <h2>포인트 사용</h2>
        <h4 onClick={handleClear}>x</h4>

        <h3>고객명 : {phoneNumber} </h3>
        <h3>결제 금액 : {count}</h3>
        <h3>사용 가능 포인트 : {pointNumber}</h3>
        <h3>사용 포인트 : {plusPointNumber}</h3>
        <h2>총 결제금액 : {totalCount}</h2>

        <div>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                    <button key={num} onClick={() => handleButtonClick(num)}>
                        {num}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button>
                <button onClick={onClickHandler2}>적용</button>
        </div>
        
        </>
    )
    // 그냥 여기서 바로 결제 페이지로 넘어갈 수 있나.. 

  

}

export default MemberCheckPoint;
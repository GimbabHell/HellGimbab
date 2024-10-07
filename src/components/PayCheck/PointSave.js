import { useNavigate } from "react-router-dom";
import { useState } from "react";


const PointSave = () => {
    // 결제 후 포인트 적립 ! 

    const [phoneNumber, setPhoneNumber] = useState(""); 
    const nevigate = useNavigate();

    const handleButtonClick = (num) => {
        
        setPhoneNumber((prev) => prev + num);
    };


    const handleClear = () => {
        
        setPhoneNumber("");
    };
   

    const handleConfirm = () => {
        // zustand 로 번호 적립
    }

    return(
        <>
        <h2>포인트 적립 !</h2>
        <div>
         {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
         <button key={num} onClick={() => handleButtonClick(num)}>
                        {num} </button>))}
         <button onClick={handleClear}>지우기</button>
         <button onClick={handleConfirm}>확인</button>
            </div>
        </>
    )
    

}
export default PointSave;
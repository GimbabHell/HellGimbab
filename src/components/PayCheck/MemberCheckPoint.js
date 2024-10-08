
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMemberStore } from "../../store";



// 번호를 입력한 후에 넘어오는 포인트 창
const MemberCheckPoint = ({getphoneNumber, poiint}) => {

    // 고객 번호와 포인트를 받아옴
    // const {phoneNumber, point} = memberNumber(); //store에 저장, 받아올 객체
    // const {totalCount} = orderStore();


    
    const [plusPointNumber, setPlusPointNumber] = useState(""); // 입력받은 사용할 point
    const [totalCount, setTotalCount] = useState(""); // point 까지 계산한 총 결제 금액(최종 결제 금액)
    // const getPoints = useMemberStore(state => state.getPoint);
    const subtractPoints = useMemberStore(state => state.subtractPoints);
    // setgetPoint(getPoints(getphoneNumber));


    const nevigate = useNavigate();


    const handleButtonClick = (num) => {
        setPlusPointNumber((prev) => prev + num);
    }

    const handleClear = () => {
        setPlusPointNumber("");
    }


    const onClickHandler2 = () => {

        const total = subtractPoints(getphoneNumber, plusPointNumber);

        if(total > 0){
            setTotalCount(total);

        }else {
            alert(`기존포인트보다 작은 액수를 입력해주세요`);
            setPlusPointNumber(0);

        }
    }

    return(
        <>
        
        <h2>포인트 사용</h2>
        <h4 onClick={nevigate("/paycheckPage")}>x</h4>

        <h3> 회원 번호 : {getphoneNumber} </h3>
        {/* <h3>결제 금액 : {}</h3>  -----> 결제금액 zustand 로 받아와야함 */}
        <h3>내 포인트 : {poiint}</h3>
        <h3>사용 포인트 : {plusPointNumber}</h3>
        <h2>총 결제금액 : {totalCount}</h2>

        <button onClick={onClickHandler2}>적용</button>

        <div>
            <p>사용을 원하는 포인트를 입력해주세요 !</p>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                    <button key={num} onClick={() => handleButtonClick(num)}>
                        {num}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button>
                <button onClick={<Link to={`/payCheckPage/${totalCount}`}/>}>결제하기</button>
                
                
               
        </div>
        
        </>
    )
}

export default MemberCheckPoint;
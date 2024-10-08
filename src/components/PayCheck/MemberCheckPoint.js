
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMemberStore } from "../../store";



// 번호를 입력한 후에 넘어오는 포인트 창
const MemberCheckPoint = ({getphoneNumber}) => {

    // const {phoneNumber, point} = memberNumber(); //store에 저장, 받아올 객체
    // const {totalCount} = orderStore();


    const {getPoint, setgetPoint} = useState({}); // 회원의 기존 포인트
    const [plusPointNumber, setPlusPointNumber] = useState(0); // 입력받은 사용할 point
    const [totalCount, setTotalCount] = useState(""); // point 까지 계산한 총 결제 금액(최종 결제 금액)
    const [member, setMember] = useState(""); // 존재하는 member 인지 신규인지 판별에 쓰임
    const findMember = useMemberStore(state => state.findMember);
    const getPoints = useMemberStore(state => state.getPoint);
    const subtractPoints = useMemberStore(state => state.subtractPoints);
    const add = useMemberStore(state => state.add);

    const nevigate = useNavigate();


    const handleButtonClick = (num) => {
        setPlusPointNumber((prev) => prev + num);
    }


   

    const handleClear = () => {
        setPlusPointNumber("");
    }


    const onClickHandler2 = () => {

        // 기존 회원인지 검사
        setMember(findMember(getphoneNumber));

        if(member){

            // 기존 회원이면, 포인트 조회
            const pp = getPoints(getphoneNumber)
            setgetPoint(pp);

        }else{

            // 기존 회원이 아니면 추가
            add(getphoneNumber);
        }

        
        if(getPoint >= plusPointNumber){ // 기존 포인트 - 입력한 포인트
            const total = subtractPoints(getphoneNumber, plusPointNumber);
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

        <h3>고객명 : {getphoneNumber} </h3>
        {/* <h3>결제 금액 : {}</h3>  -----> 결제금액 zustand 로 받아와야함 */}
        <h3>사용 가능 포인트 : {getPoint}</h3>
        <h3>사용 포인트 : {plusPointNumber}</h3>
        <h2>총 결제금액 : {totalCount}</h2>

        <button onClick={onClickHandler2}>적용</button>

        <div>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                    <button key={num} onClick={() => handleButtonClick(num)}>
                        {num}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button>
                <botton onClick={<Link to={`/payCheckPage/${totalCount}`}/>}>결제하기</botton>
                
               
        </div>
        
        </>
    )
}

export default MemberCheckPoint;
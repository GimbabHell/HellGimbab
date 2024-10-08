import { useState } from "react";
import MemberCheckPoint from "./MemberCheckPoint";
import { useMemberStore } from "../../store";

const MemberCheckNumber = () => {

    const [num, setNum] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [poiint, setPoiint] = useState(""); // 입력받은 회원의 point 저장
    const add = useMemberStore(state => state.add);
    const findMember = useMemberStore(state => state.findMember);
    const getPoints = useMemberStore(state => state.getPoints);
    const [show, setShow] = useState(false);
    

    const handleButtonClick = (digit) => {
        if (num.length < 11) {
            setNum((prev) => prev + digit);
            setErrorMessage(""); 
        }
    };getPoints(num)

    const handleClear = () => {
        setNum("");
        setErrorMessage(""); 
    };

    const handleConfirm = () => {

        const formattedNum = formatPhoneNumber(num);

        if (!isValidPhoneNumber(formattedNum)) {
            setErrorMessage("전화번호는 010으로 시작하고 11자리여야 합니다.");
            return; 
        }

        const memb = findMember(num);
        
        if (memb) { // 이미 회원이라면 바로 포인트 적립 진행
            setShow(true);
            
        } else if(memb == 1) {
            add(num,0);
            setShow(true);
        }
        
        const p = getPoints(num);
        setPoiint(p);
        console.log(poiint);
    };

    const formatPhoneNumber = (number) => {
        if (number.length === 11) {
            return `${number.slice(0, 3)} ${number.slice(3, 7)} ${number.slice(7)}`;
        }
        return number;
    };

    const isValidPhoneNumber = (number) => {
        const regex = /^010 \d{4} \d{4}$/;
        return regex.test(number);
    };

    return (
        <>
            <h2>핸드폰 번호 입력</h2>
            <h3>핸드폰 번호를 입력해주세요</h3>
            <h4>{formatPhoneNumber(num)}</h4> 
            <h4 onClick={handleClear}>x</h4>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 

            <div>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((digit) => (
                    <button key={digit} onClick={() => handleButtonClick(digit)}>
                        {digit}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button>
                <button onClick={handleConfirm}>확인</button>
                
                {show? <MemberCheckPoint getphoneNumber={num} poiint={poiint}/>:null}
            </div>
        </>
    );
};

export default MemberCheckNumber;

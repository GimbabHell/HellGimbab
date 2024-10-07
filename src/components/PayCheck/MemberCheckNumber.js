import { useState } from "react";
import MemberCheckPoint from "./MemberCheckPoint";
import member from "../../data/Member.json";


const MemberCheckNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    

    const handleButtonClick = (num) => {
        
        setPhoneNumber((prev) => prev + num);
    };

    const handleClear = () => {
        
        setPhoneNumber("");
    };

    const handleConfirm = () => {

        const mem = member.filter(meme => meme.phoneNumber === phoneNumber )

        if (mem) {
            // 지금 사용자의 입력받은 전화번호를 그냥 넘겨주고 가서 찾아야 할까 ..
            <MemberCheckPoint phoneNumber ={phoneNumber}/>

        } else {
            // 회원 등록을 자동으로 시켜줘야 한다..
        }
       
    };
        

    return (
        <>
            <h2>핸드폰 번호 입력</h2>
            <h3>핸드폰 번호를 입력해주세요</h3>
            <h4>{phoneNumber}</h4>
            <h4 onClick={handleClear}>x</h4>

            <div>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                    <button key={num} onClick={() => handleButtonClick(num)}>
                        {num}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button>
                <button onClick={handleConfirm}>확인</button>
            </div>
        </>
    );
}


export default MemberCheckNumber;

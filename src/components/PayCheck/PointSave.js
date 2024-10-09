import { useState } from "react";
import { useMemberStore } from "../../store";
import LastPage from "../../pages/LastPage";
import { useNavigate } from "react-router-dom";

const PointSave = ({ totalCount }) => {
    const [phoneNum, setPhoneNum] = useState(""); // 입력받은 폰 번호
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
    const [ppoint, setPpoint] = useState(""); // 결제 금액에 따른 추가될 포인트
    const addPoints = useMemberStore(state => state.addPoints);
    const add = useMemberStore(state => state.add);
    const nevi = useNavigate();


    const handleButtonClick = (num) => {
        if (phoneNum.length < 11) {
            setPhoneNum((prev) => prev + num);
            setErrorMessage(""); 
        } else {
            setErrorMessage("전화번호는 11자리 이하로 입력해 주세요 !"); 
            setPhoneNum("");

        }
    };

    const handleClear = () => {
        setPhoneNum("");
        setErrorMessage("");
    };

    const onClickHandler2 = () => {
        const memb = useMemberStore.getState().findMember(phoneNum); 

        if (memb) { // 이미 회원이라면 포인트 적립 진행
            const pointsToAdd = totalCount * 0.005; // 총 결제금액에 0.5% 적립
            setPpoint(pointsToAdd);
            addPoints(phoneNum, pointsToAdd);
            alert(`${pointsToAdd} 가 적립되었습니다!`);
        } else {
            const pointsToAdd = totalCount * 0.005;
            setPpoint(pointsToAdd);
            add(phoneNum, pointsToAdd); // 회원이 아니라면 회원 등록
        }
    };

    return (
        <>
            <h2>포인트 적립!</h2>
            <h3>{ppoint}</h3>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            <h3 onClick={onClickHandler2}>적용</h3>
            <div>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                    <button key={num} onClick={() => handleButtonClick(num)}>
                        {num}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button> 
                <button onClick={() => nevi("/paycheckPage")}>확인</button>
            </div>
            <LastPage />
        </>
    );
}

export default PointSave;
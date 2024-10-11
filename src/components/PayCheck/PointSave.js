import { useState } from "react";
import { useMemberStore } from "../../store";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
ReactModal.setAppElement('#root');

const PointSave = ({lastPrice}) => {
    const [phoneNum, setPhoneNum] = useState(""); // 입력받은 폰 번호
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
    // const [ppoint, setPpoint] = useState(""); // 결제 금액에 따른 추가될 포인트
    const {members} = useMemberStore();
    const addPoints = useMemberStore(state => state.addPoints);
    const add = useMemberStore(state => state.add);
    const findMember = useMemberStore(state => state.findMember);
    const nevi = useNavigate();
    const [show2, setShow2] = useState(false);
    


    const handleButtonClick = (num) => {
        if (phoneNum.length < 11) {
            setPhoneNum((prev) => prev + num);
            setErrorMessage(""); 
        }
    };


    const formatPhoneNumber = (number) => {
        if (number.length === 11) {
            return `${number.slice(0, 3)} ${number.slice(3, 7)} ${number.slice(7)}`;
        }
        return number;
    };

    const handleClear = () => {
        setPhoneNum("");
        setErrorMessage("");
    };
    

    const onClickHandler2 = () => {
        
        const memb = findMember(phoneNum);
        const formattedNum = formatPhoneNumber(phoneNum);

        const isValidPhoneNumber = (number) => {
            const regex = /^010 \d{4} \d{4}$/;
            return regex.test(number);
        };
        
        if (!isValidPhoneNumber(formattedNum)) {
            setErrorMessage("전화번호는 010으로 시작하고 11자리여야 합니다.");
            setPhoneNum("");
            return; 
        }

        if(memb) { // 이미 회원이라면 포인트 적립 진행

            const p = lastPrice*0.1;
            addPoints(phoneNum, p);
           
            console.log(members);
            
            alert(`${lastPrice*0.1}원 적립되었습니다!`);
            nevi("/last")

        } else {
            const p = lastPrice*0.1;

            add(phoneNum, p); // 회원이 아니라면 회원 등록
            console.log(members);
            
            alert(`${lastPrice*0.1}원 적립되었습니다!`);
            nevi("/last");
        }
    };

    const closeModal =()=>{
        setShow2(false);
    };


    return(
        <>
            <ReactModal
                isOpen={show2}        // Modal visibility
                onRequestClose={closeModal}  // Close when clicking outside or pressing ESC
                contentLabel="사용할 포인트 입력"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: 784,
                        borderRadius: 0,
                        border: "none",
                        padding: 0,
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'  // Background overlay
                    }
                }}
            >
            <h2>포인트 적립!</h2>
            <h3>적립하시려면 핸드폰 번호를 입력해주세요.</h3>
            <button onClick={()=>nevi("/last")}>x</button>
            <h3>{formatPhoneNumber(phoneNum)}</h3>
            
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            {/* <h3 onClick={onClickHandler2}>적용</h3> */}
            <div>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                    <button key={num} onClick={() => handleButtonClick(num)}>
                        {num}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button> 
                <button onClick={onClickHandler2}>확인</button>
            </div>

            </ReactModal>
           
        </>
    );
}

export default PointSave;
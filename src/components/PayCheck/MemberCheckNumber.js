import { useState } from "react";
import MemberCheckPoint from "./MemberCheckPoint";
import { useMemberStore } from "../../store";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";

const MemberCheckNumber = ({setShow, setDefa}) => {
    const [num, setNum] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [poiint, setPoiint] = useState("");
    const {members} = useMemberStore();
    const add = useMemberStore(state => state.add);
    const findMember = useMemberStore(state => state.findMember);
    const getPoints = useMemberStore(state => state.getPoints);
    const addPoints = useMemberStore(state => state.addPoints);
    const [showw, setShoww] = useState(false);
    const [show2, setShow2] = useState(false);
    const nevi = useNavigate();
    
    const handleButtonClick = (digit) => {
        if (num.length < 11) {
            setNum((prev) => prev + digit);
            setErrorMessage(""); 
        }};

    const handleClear = () => {
        setNum("");
        setErrorMessage(""); 
    };

    const handleConfirm = () => {
        const formattedNum = formatPhoneNumber(num);
        
        if (!isValidPhoneNumber(formattedNum)) {
            setErrorMessage("전화번호는 010으로 시작하고 11자리여야 합니다.");
            setNum("");
            return; 
        }

        const memb = findMember(num);
        
        if (memb) {
            setShoww(true);
            
        } else {
            add(num, 0);
            setShoww(true);
        }

        const p = getPoints(num);
        setPoiint(p);
        
    };

    // const onClickHandler = () => {
    //     nevi("/paycheck"); // x를 누르면 전에 page 로 간다.
    // }
        
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

    const closeModal =()=>{
        setShow2(false);
    };

    return(
        <>
            <ReactModal
                isOpen={show2}        // Modal visibility
                onRequestClose={closeModal}  // Close when clicking outside or pressing ESC
                contentLabel="적립금 사용을 위한 회원번호 입력"
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

            <div className="menuOrderModal">
            <h2>핸드폰 번호 입력</h2>
            <h3>핸드폰 번호를 입력해주세요</h3>
            <h4>{formatPhoneNumber(num)}</h4> 
            <h4 onClick={()=>closeModal()}>x</h4>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 

            <div>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((digit) => (
                    <button key={digit} onClick={() => handleButtonClick(digit)}>
                        {digit}
                    </button>
                ))}
                <button onClick={handleClear}>지우기</button>
                <button onClick={handleConfirm}>확인</button>
                {showw ? <MemberCheckPoint num={num} poiint={poiint} setShow={setShow} setDefa={setDefa} /> : null}
            </div>
            </div>
            </ReactModal>

            </>
        
    )
}

export default MemberCheckNumber;

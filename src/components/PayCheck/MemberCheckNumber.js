import { useState } from "react";
import MemberCheckPoint from "./MemberCheckPoint";
import { useMemberStore } from "../../store";
import ReactModal from "react-modal";
import MemberCheckNumberStyle from './MemberCheckNumber.css';
import { FaXmark, FaArrowLeft, FaDeleteLeft } from "react-icons/fa6";
ReactModal.setAppElement('#root');

const MemberCheckNumber = ({setShow, setDefa}) => {
    const [num, setNum] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [poiint, setPoiint] = useState("");
    const add = useMemberStore(state => state.add);
    const findMember = useMemberStore(state => state.findMember);
    const getPoints = useMemberStore(state => state.getPoints);
    
    const [showw, setShoww] = useState(false);
    const [show2, setShow2] = useState(true);
    
    
    const handleButtonClick = (digit) => {
        if (num.length < 11) {
            setNum((prev) => prev + digit);
            setErrorMessage(""); 
        }};

    const handleClear = () => {
        setNum("");
        setErrorMessage(""); 
    };

    const handleDelete = () => {
        setNum((prev)=> prev.slice(0,-1));
    }

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
            setShow2(false);
            
        } else {
            add(num, 0);
            setShoww(true);
            setShow2(false);
        }

        const p = getPoints(num);
        setPoiint(p);
        
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
                        width: 600,
                        borderRadius: 0,
                        border: "none",
                        padding: 0,
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'  // Background overlay
                    }
                }}
            >

            <div className="pointModal">
                <div className="modalTop">
                    <h2 className="title">휴대폰 번호 입력</h2>
                    <button className="btn-close" onClick={()=>closeModal()}><FaXmark /></button> 
                </div>
                <div className="top">
                    <h3>휴대폰 번호를 입력해주세요</h3>
                    <h4>
                        <span>{formatPhoneNumber(num)}</span>
                        {
                            num.length > 0 ? 
                            <button onClick={handleDelete} className="btn-delete">
                                <FaDeleteLeft />
                            </button>
                            : null
                        }
                    </h4> 
                    {errorMessage && <p style={{ color: "red", fontSize: '20px' }}>{errorMessage}</p>} 
                </div>
                
                <div className="numbers">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                        <button key={digit} onClick={() => handleButtonClick(digit)}>
                            {digit}
                        </button>
                    ))}
                    
                    
                    <button onClick={handleClear} className="btn-clear">삭제</button>
                    <button key="0" onClick={()=>handleButtonClick("0")}>0</button>
                    <button onClick={handleConfirm} className="btn-confirm">확인</button>
                    
                </div>
            </div>
            </ReactModal>
            {showw ? <MemberCheckPoint num={num} poiint={poiint} setShow={setShow} setDefa={setDefa} /> : null}

            </>
        
    )
}

export default MemberCheckNumber;

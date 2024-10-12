import { useState } from "react";
import { useMemberStore } from "../../store";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import PointSaveStyle from './PointSave.css';
import { FaXmark,FaDeleteLeft } from "react-icons/fa6";
ReactModal.setAppElement('#root');

const PointSave = ({lastPrice}) => {
    const [phoneNum, setPhoneNum] = useState("010"); // 입력받은 폰 번호
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
    const {members} = useMemberStore();
    const addPoints = useMemberStore(state => state.addPoints);
    const add = useMemberStore(state => state.add);
    const findMember = useMemberStore(state => state.findMember);
    const nevi = useNavigate();
    const [show2, setShow2] = useState(true);
    


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

    const handleDelete = () => {
        setPhoneNum((prev)=> prev.slice(0,-1));
    }


    return(
        <>
            <ReactModal
                isOpen={show2}       
                contentLabel="사용할 포인트 입력"
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

                <div className="pointSaveModal pointModal">
                    <div className="modalTop">
                        <h2 className="title">포인트 적립</h2>
                        <button className="btn-close" onClick={()=>nevi("/last")}><FaXmark /></button> 
                    </div>
                    
                    <div className="top">
                        <h3>적립하시려면 휴대폰 번호를 <br></br>입력해주세요.</h3>
                        <h4>
                            <span>{formatPhoneNumber(phoneNum)}</span>
                            {
                                phoneNum.length > 0 ? 
                                <button onClick={handleDelete} className="btn-delete">
                                    <FaDeleteLeft />
                                </button>
                                : null
                            }
                             {errorMessage && <p style={{ color: "red", fontSize: '20px' }}>{errorMessage}</p>} 
                        </h4>
                    </div>
                    
                    
                    
                    <div className="numbers">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                            <button key={num} onClick={() => handleButtonClick(num)}>
                                {num}
                            </button>
                        ))}
                        
                        
                        <button onClick={handleClear} className="btn-clear">삭제</button>
                        <button key="0" onClick={()=>handleButtonClick("0")}>0</button>
                        <button onClick={onClickHandler2} className="btn-confirm">확인</button>
                        
                    </div>
                   
                </div>

            </ReactModal>
           
        </>
    );
}

export default PointSave;
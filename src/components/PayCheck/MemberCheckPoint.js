import { useState, useEffect } from "react";
import { useMemberStore, orderStore } from "../../store";
import ReactModal from "react-modal";
import MemberCheckPointStyle from './MemberCheckPoint.css';
import { FaXmark, FaDeleteLeft } from "react-icons/fa6";

ReactModal.setAppElement('#root');

const MemberCheckPoint = ({ num, poiint, setShow, setDefa, setSubCategoryId ,setIsRequired}) => {
    const [plusPointNumber, setPlusPointNumber] = useState("0"); 
    const { totalPrice } = orderStore();
    const {plusPointNum, plusPhoneNum} = useMemberStore();
    const [show2, setShow2] = useState(true);
    // const p = totalPrice - plusPointNumber;

    
    const handleButtonClick = (n) => {
        if (poiint === 0) return;

        setPlusPointNumber((prev) => (prev === "0" ? n : prev + n));
    };

    const handleClear = () => {
        setPlusPointNumber("0");
    };

   

    const onClickHandlerr = () => {

        if (poiint === 0) {
            setDefa(0);
            setShow(false);
            setShow2(false);

        } else {
            const pointsToUse = parseInt(plusPointNumber, 10);

            if (totalPrice < pointsToUse){
                alert(`기존 포인트가 결제 금액보다 큽니다! \n 원하는 금액을 직접 입력해주세요`);
                setPlusPointNumber("0"); 
            }
           else if(totalPrice - plusPointNumber === 0){
                alert(`결제하실 금액이 0원입니다 ! \n 결제하기 버튼을 누르시면 결제가 완료됩니다 !`);
                plusPhoneNum(num);
                plusPointNum(pointsToUse);
                setIsRequired(false); 
                setShow2(false);
                

            }else if(poiint >= pointsToUse) {
                alert("확인!");
                plusPhoneNum(num);
                plusPointNum(pointsToUse);
                setDefa(pointsToUse);
                setShow(false);
                setShow2(false);
            }
            else {
                alert(`기존 포인트보다 작은 액수를 입력해주세요`);
                setPlusPointNumber("0"); 
            }
        } 
    };

    const onClickHandlerll = () => {
        
        // const pointsToUse = parseInt(plusPointNumber, 10);
        if(totalPrice < poiint){
            setPlusPointNumber(totalPrice.toString())
        }else {
            setPlusPointNumber(poiint.toString())
        }
       
    };

    const handleDelete = () => {
        setPlusPointNumber((prev) => {
            if (prev.length === 1) return "0"; 
            return prev.slice(0, -1);
        });
    };

    const closeModal = () => {
        setSubCategoryId(0);
        setShow(false);
        setShow2(false);
    };

    return (
        <>
            <ReactModal
                isOpen={show2}
                onRequestClose={closeModal}
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
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }
                }}
            >
                <div className="pointUseModal">
                    <div className="modalTop">
                        <h2 className="title">포인트 사용</h2>
                        <button className="btn-close" onClick={closeModal}><FaXmark /></button> 
                    </div>
                    <p>사용을 원하는 포인트를 입력해주세요!</p>
                    {poiint === 0 && (
                        <div className="txt">
                            <h4>고객님의 누적 포인트는 <span>0원</span>입니다. <br/>사용하기 버튼을 누르시면 바로 결제로 넘어갑니다.</h4>
                        </div>
                    )}
                    <div className="modalContainer">
                        <div className="left">
                            <p><span>회원 번호</span> <span>{num}</span></p>
                            <p><span>결제 금액</span> <span>{totalPrice}원</span></p>
                            <p><span>사용 가능 포인트</span> <span>{poiint}원</span></p>
                            <p><span>사용 포인트</span> <span className="red">{plusPointNumber}원</span></p>
                            <button className="btn btn-black" onClick={onClickHandlerll}>전체 포인트 사용하기</button>
                        </div>
                        <div className="right">
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
                                <button key={n} onClick={() => handleButtonClick(n)}>
                                    {n}
                                </button>
                            ))}
                            <button onClick={handleClear} className="btn-clear">지우기</button>
                            <button key="0" onClick={() => handleButtonClick("0")}>0</button>
                            <button className="btn-delete" onClick={handleDelete}><FaDeleteLeft /></button>
                        </div>
                    </div>
                    <div className="btn-wrap">
                        <button className="btn btn-gray btn-small" onClick={closeModal}>취소</button>
                        <button className="btn btn-red btn-small" onClick={onClickHandlerr}>사용하기</button>
                    </div>
                </div>
            </ReactModal>
        </>
    );
}

export default MemberCheckPoint;
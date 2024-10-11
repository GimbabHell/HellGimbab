// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMemberStore,orderStore} from "../../store";
import ReactModal from "react-modal";
import MemberCheckPointStyle from './MemberCheckPoint.css';
import { FaXmark, FaDeleteLeft } from "react-icons/fa6";
ReactModal.setAppElement('#root');

const MemberCheckPoint = ({num, poiint, setShow, setDefa, setSubCategoryId}) => {
    const [plusPointNumber, setPlusPointNumber] = useState(""); 
    const { totalPrice } = orderStore();
    const {plus} = useMemberStore();
    const [show2, setShow2] = useState(true);
    // const [homePoint, setHomePoint] = useState(0);
    
    
    // const subtractPoints = useMemberStore(state => state.subtractPoints);
    

    const handleButtonClick = (n) => {
        setPlusPointNumber((prev) => prev + n);
        
    };

    const handleClear = () => {
        setPlusPointNumber("");
    };

    // const onClickHandler2 = useCallback(() => {
        
    //      subtractPoints(num, plusPointNumber); 
         
    //     if ( poiint >= plusPointNumber){
         
    //         alert("확인!");
    //         setDefa(plusPointNumber);
    //         setShow(false);
    //         setShow2(false);
         
    //     } else {
    //         alert(`기존 포인트보다 작은 액수를 입력해주세요`); 
    //         setPlusPointNumber(""); 
    //     }
    // }, [plusPointNumber, num]);

    const onClickHandler3 = () => {
        setPlusPointNumber(""); 
    }

    const onClickHandlerr = () => {
        if(poiint === 0){
        setDefa(0);
        setShow(false);
        setShow2(false);

    } else{  
         
        if ( poiint >= plusPointNumber){
         
            alert("확인!");
            plus(plusPointNumber); // 입력받은 사용 할 포인트 담아줌.
            setDefa(plusPointNumber);
            setShow(false);
            setShow2(false);
         
        } else {
            alert(`기존 포인트보다 작은 액수를 입력해주세요`); 
            setPlusPointNumber(""); 
        }
    } 
    }

   
    const closeModal =()=>{
        setSubCategoryId(0);
        setShow(false);
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
    
                <div className="pointUseModal">
                    <div className="modalTop">
                        <h2 className="title">포인트 사용</h2>
                        <button className="btn-close" onClick={()=>closeModal()}><FaXmark /></button> 
                    </div>
                    <div className="container">
                        <div className="left">
                            <h3>회원 번호: {num}</h3>
                            <h3>결제 금액: {totalPrice}</h3>
                            <h3>사용 가능 포인트: {poiint}</h3>
                        </div>
                        <div className="right">
                            <p>사용을 원하는 포인트를 입력해주세요!</p>
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((n) => (
                                <button key={n} onClick={() => handleButtonClick(n)}>
                                    {n}
                                </button>
                            ))}
                            <button onClick={handleClear}>지우기</button>
                            <button onClick={onClickHandler3}>전체 삭제</button>
                        </div>
                    </div>
                
                    {poiint === 0 ? (
                        <div>
                            <h4>고객님의 누적 포인트는 0원입니다. 사용하기 버튼을 누르시면 바로 결제로 넘어갑니다.</h4>
                           
                        </div>
                    ) : (
                        <>
                            <h3>사용 포인트: {plusPointNumber}</h3>
                            
                        </>
                    )}
                     <button onClick={()=> closeModal()}>취소</button>
                    <button onClick={onClickHandlerr}>사용하기</button>
                </div>
             </ReactModal>
            </>
       )
}

export default MemberCheckPoint;

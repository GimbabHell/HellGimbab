// import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useMemberStore,orderStore} from "../../store";
import ReactModal from "react-modal";
ReactModal.setAppElement('#root');

const MemberCheckPoint = ({num, poiint, setShow, setDefa}) => {
    const [plusPointNumber, setPlusPointNumber] = useState(""); 
    // const [totalCount, setTotalCount] = useState(0);  //남아있는 포인트
    // const [lastPrice, setLastPrice] = useState(0); // 최최종 결제 금액
    const { totalPrice } = orderStore();
    const [show2, setShow2] = useState(true);
    
    const subtractPoints = useMemberStore(state => state.subtractPoints);
    // const navigate = useNavigate();

    const handleButtonClick = (n) => {
        setPlusPointNumber((prev) => prev + n);
    };

    const handleClear = () => {
        setPlusPointNumber("");
    };

    const onClickHandler2 = useCallback(() => {
        console.log(num);
        
         subtractPoints(num, plusPointNumber); 
         // num: 회원번호, plusPointNumber: 사용하고픈 포인트

        if ( poiint >= plusPointNumber){
            // setTotalCount(total);
            alert("확인!");
            setDefa(plusPointNumber);
            setShow(false);
            // setLastPrice(totalPrice-plusPointNumber);
            setShow2(false);
            // navigate(`/paycheck?poiint=${num}`); 
        } else {
            alert(`기존 포인트보다 작은 액수를 입력해주세요`); 
            setPlusPointNumber(""); 
        }
    }, [plusPointNumber, num,  subtractPoints]);

    const onClickHandler3 = () => {
        setPlusPointNumber(""); 
    }

    const onClickHandlerr = () => {
        setDefa(0);
        setShow(false);
        // navigate(`/paycheck?poiint=${num}`);
        setShow2(false);
    }

    const handlePayment = () => {
        setShow(false);
        setShow2(false);
        // console.log(poiint);
        // navigate(`/payCheck?poiint=${num}`); 
        }


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
    
        
            <h2>포인트 사용</h2>
            <h3>회원 번호: {num}</h3>
            <h3>결제 금액: {totalPrice}</h3>
            <h3>사용 가능 포인트: {poiint}</h3>

            {poiint === 0 ? (
                <div>
                    <h4>고객님의 누적 포인트는 0원입니다. 사용하기 버튼을 누르시면 바로 결제로 넘어갑니다.</h4>
                    <button onClick={onClickHandlerr}>사용하기</button>
                </div>
            ) : (
                <>
                    <h3>사용 포인트: {plusPointNumber}</h3>
                    {/* <h2>총 결제금액: {totalPrice}</h2> */}

                    <div>
                        <p>사용을 원하는 포인트를 입력해주세요!</p>
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((n) => (
                            <button key={n} onClick={() => handleButtonClick(n)}>
                                {n}
                            </button>
                        ))}
                        <button onClick={handleClear}>지우기</button>
                        <button onClick={onClickHandler3}>전체 삭제</button>
                    </div>

                    <button onClick={handlePayment}>취소</button>
                    <button onClick={onClickHandler2}>사용하기</button>
                </>
            )}
             </ReactModal>
            </>
       )
}

export default MemberCheckPoint;

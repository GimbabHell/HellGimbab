import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useMemberStore,orderStore} from "../../store";


// import NaverPay from "./NaverPay";
// import KakaoPay from "./KakaoPay";
// import CardPay from "./CardPay";

const MemberCheckPoint = ({ num, poiint, setShow}) => {
    const [plusPointNumber, setPlusPointNumber] = useState(""); 
    // const [totalCount, setTotalCount] = useState(0);  //남아있는 포인트
    // const [lastPrice, setLastPrice] = useState(0); // 최최종 결제 금액
    const { totalPrice } = orderStore();
    
    const subtractPoints = useMemberStore(state => state.subtractPoints);
    const navigate = useNavigate();

    const handleButtonClick = (num) => {
        setPlusPointNumber((prev) => prev + num);
    };

    const handleClear = () => {
        setPlusPointNumber("");
    };

    const onClickHandler2 = useCallback(() => {
        
         subtractPoints(num, plusPointNumber); // 기존포인트 - 사용할포인트

         // 최최종가격 = 기존totalprice - 사용할포인트

        if (num >= plusPointNumber) {
            // setTotalCount(total);
            alert("확인!");
            // setLastPrice(totalPrice-plusPointNumber);
            navigate(`/payCheck? poiint=${ poiint}`); 
        } else {
            alert(`기존 포인트보다 작은 액수를 입력해주세요`); 
            setPlusPointNumber(""); 
        }
    }, [plusPointNumber, num, navigate, subtractPoints]);

    // const renderPaymentComponent = useCallback(() => {
    //     switch (push) {
    //         case 0:
    //             return <CardPay totalCount={totalCount} />;
    //         case 1:
    //             return <KakaoPay totalCount={totalCount} />;
    //         case 2:
    //             return <NaverPay totalCount={totalCount} />;
    //         default:
    //             return alert("결제 수단을 선택해주세요!");
    //     }
    // }, [push, totalCount]);

    const onClickHandler3 = () => {
        setPlusPointNumber(""); 
    }

    const handlePayment = () => {
        setShow(false);
        console.log(poiint);
        navigate(`/payCheck? poiint=${ poiint}`); 
        }


    return (
        <>
            <h2>포인트 사용</h2>
            <h3>회원 번호: {num}</h3>
            <h3>결제 금액: {totalPrice}</h3>
            <h3>사용 가능 포인트: {poiint}</h3>

            {poiint === 0 ? (
                <div>
                    <h4>고객님의 누적 포인트는 0원입니다. 사용하기 버튼을 누르시면 바로 결제로 넘어갑니다.</h4>
                    <button onClick={onClickHandler2}>사용하기</button>
                </div>
            ) : (
                <>
                    <h3>사용 포인트: {plusPointNumber}</h3>
                    {/* <h2>총 결제금액: {totalPrice}</h2> */}

                    <div>
                        <p>사용을 원하는 포인트를 입력해주세요!</p>
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
                            <button key={num} onClick={() => handleButtonClick(num)}>
                                {num}
                            </button>
                        ))}
                        <button onClick={handleClear}>지우기</button>
                        <button onClick={onClickHandler3}>전체 삭제</button>
                    </div>

                    <button onClick={handlePayment}>취소</button>
                    <button onClick={onClickHandler2}>사용하기</button>
                </>
            )}
        </>
    );
};

export default MemberCheckPoint;

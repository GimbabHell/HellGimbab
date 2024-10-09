import MemberCheckNumber from "../components/PayCheck/MemberCheckNumber";
import { useState } from "react";


const PayCheckPage = ({ totalCount }) => {
    const [pay, setPay] = useState(null);
    const [show, setShow] = useState(false);
    // const [isPointsUsed, setIsPointsUsed] = useState(false);
    const [push, setPush] = useState(0);

    const onClickHandler = () => {
        setShow(true);
        // setIsPointsUsed(true);
    };

    // const selectPaymentMethod = (method) => {
    //     if (!isPointsUsed && method !== null) {
    //         alert("포인트 사용 여부를 확인해 주세요.");
    //         return;
    //     }
    //     setPay(method);
    // };

    // const renderPaymentComponent = () => {
    //     switch (pay) {
    //         case 0:
    //             return <CardPay totalCount={totalCount} />;
    //         case 1:
    //             return <KakaoPay totalCount={totalCount} />;
    //         case 2:
    //             return <NaverPay totalCount={totalCount} />;
    //         default:
    //             return null;
    //     }
    // };

    const handleNotUsingPoints = () => {
        // setIsPointsUsed(false);
        setShow(false); 
    };

    return (
        <>
            <p>포인트 사용 여부 확인</p>
            <button onClick={onClickHandler}>사용</button>
            {show ? <MemberCheckNumber push={push}/> : null}

            <button onClick={handleNotUsingPoints}>사용안함</button>

            <p>결제 수단 선택</p>
            <button onClick={() => setPush(0)}>카드결제</button>
            <button onClick={() => setPush(1)}>카카오Pay</button>
            <button onClick={() => setPush(2)}>네이버Pay</button>

            <h2>최종 결제 금액: {totalCount}</h2>
            {/* {renderPaymentComponent()} */}
        </>
    );
};

export default PayCheckPage;

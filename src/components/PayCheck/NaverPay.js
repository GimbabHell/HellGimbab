import { useEffect, useState } from "react";
import PointSave from "./PointSave";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { FaXmark } from "react-icons/fa6";
ReactModal.setAppElement('#root');

const NaverPay = ({ lastPrice }) => {
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [CardNumber, setCardNumber] = useState("");
    const [show2, setShow2] = useState(true);

    useEffect(() => {
        let timer;
        if (show2) {
            timer = setTimeout(() => {
              
                const cardNumberTimer = setTimeout(() => {
                    const randomCardNumber = Math.floor(10000000000 + Math.random() * 90000000000).toString();
                    setCardNumber(randomCardNumber);

                  
                    setTimeout(() => {
                        setLoading(true);

                        
                        setTimeout(() => {
                            setLoading(false);
                            setPaymentSuccess(true);
                            alert("결제가 완료되었습니다 !");
                        }, 1000);
                    }, 1000);
                }, 1000);

                return () => clearTimeout(cardNumberTimer);
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [lastPrice, show2]);

    const closeModal = () => {
        setShow2(false);
        resetPaymentStates(); 
    };

    const resetPaymentStates = () => {
        setLoading(false);
        setPaymentSuccess(false);
        setCardNumber(""); 
    };

    return (
        <>
            <ReactModal
                isOpen={show2}
                contentLabel="네이버페이"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        borderRadius: 0,
                        border: "none",
                        padding: 0,
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)' 
                    }
                }}
            >
                <div className="payModal">
                    <div className="modalTop">
                        <h2 className="title">네이버페이 결제</h2>
                        <button className="btn-close" onClick={closeModal}><FaXmark /></button>
                    </div>
                    <h2><span>결제 QR 코드를 스캔 </span> 해주세요</h2>
                    {loading && <h3>결제 중입니다... 잠시만 기다려 주세요.</h3>}
                    {!paymentSuccess ? (
                        <div className="payModalContainer">
                            <div className="imgBox">
                                <img src="../images/scan.svg" alt="페이 스캔 이미지" />
                            </div>
                            <div className="txt">
                                <h3><span>결제금액</span> <span>{lastPrice}원</span></h3>
                                <h3><span>카드번호</span> <span>{CardNumber}</span></h3>
                            </div>
                        </div>
                    ) : null}
                </div>
            </ReactModal>

            {paymentSuccess && <PointSave lastPrice={lastPrice} />}
        </>
    );
}

export default NaverPay;

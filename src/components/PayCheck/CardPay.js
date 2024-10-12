import { useEffect, useState } from "react";
import PointSave from "./PointSave";
import ReactModal from "react-modal";
import CardPayStyle from './CardPay.css';
import { FaXmark } from "react-icons/fa6";
ReactModal.setAppElement('#root');

const CardPay = ({ lastPrice}) => {
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);   
    const [show2, setShow2] = useState(true);
    
    useEffect(() => {
        let timer;
        if (show2) {
            timer = setTimeout(() => {
                setLoading(true);
                
                const paymentTimer = setTimeout(() => {
                    setLoading(false);
                    setPaymentSuccess(true);
                    alert("결제 완료되었습니다 !");
                }, 2000); 

                return () => clearTimeout(paymentTimer);
            }, 3000); 
        }

        return () => clearTimeout(timer);
    }, [lastPrice, show2]);

    const closeModal = () => {
       
        setShow2(false);
        resetPaymentStates(); // 결제 상태 초기화
    };

    const resetPaymentStates = () => {
        setLoading(false);
        setPaymentSuccess(false);
    };

    return (
        <>
            <ReactModal
                isOpen={show2}
                contentLabel="카드페이"
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
                <div className="cardModal">
                    <div className="modalTop">
                        <h2 className="title">카드 결제 안내</h2>
                        <button className="btn-close" onClick={closeModal}><FaXmark /></button> 
                    </div>
                    <h2>결제가 완료될 때까지 <span>카드를 빼지 마세요!</span></h2>
                    {loading && <h3>결제 중입니다... 잠시만 기다려 주세요.</h3>}
                    {!paymentSuccess ? (
                        <div className="cardModalContainer">
                            <div className="left">
                                <img src="../images/card.svg" alt="카드 결제 이미지" />
                            </div>
                            <div className="right">
                                <h3> <span>결제금액</span> <span>{lastPrice}원</span></h3>
                                <ul>
                                    <li>다음 그림과 같이 카드 리더기에 카드를 꽂아주세요.</li>
                                    <li>결제가 완료될 때까지 카드를 빼지 말고 기다려주세요.</li>
                                    <li>결제가 완료되면 카드를 회수해주세요.</li>
                                </ul>
                                <p>
                                    ※ 사용가능한 카드 안내 <br />
                                    <span>- 국내 결제 가능한 신용카드, 체크카드</span>
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </ReactModal>

            {/* 결제 완료 후 PointSave 컴포넌트를 표시, paymentSuccess가 true일 때만 표시 */}
            {paymentSuccess && <PointSave lastPrice={lastPrice} />}
        </>
    );
}

export default CardPay;

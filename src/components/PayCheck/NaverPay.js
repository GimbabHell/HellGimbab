import { useEffect, useState } from "react";
import PointSave from "./PointSave";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import { FaXmark } from "react-icons/fa6";
ReactModal.setAppElement('#root');

const NaverPay = ({lastPrice}) => {
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [show2, setShow2] = useState(true);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
            
            setTimeout(() => {
                setLoading(false);
                setPaymentSuccess(true);
                alert("결제 완료되었습니다 !");
                setShow2(false);
                
            }, 2000); 
        }, 3000); 

        return () => clearTimeout(timer);
    }, [lastPrice]);

    
    const closeModal =()=>{
        setShow2(false);
    };


    return(
        <>
            <ReactModal
                isOpen={show2}        // Modal visibility
                // onRequestClose={closeModal}  // Close when clicking outside or pressing ESC
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
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'  // Background overlay
                    }
                }}
            >

                <div className="cardModal">
                    <div className="modalTop">
                        <h2 className="title">네이버페이 결제 안내</h2>
                        <button className="btn-close" onClick={()=>closeModal()}><FaXmark /></button> 
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
                                    ※ 사용가능한 카드 안내 <br/>
                                    <span>- 국내 결제 가능한 신용카드, 체크카드</span>
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </ReactModal>


            {/* 결제 완료 후 PointSave 컴포넌트를 표시 */}
            {paymentSuccess && <PointSave lastPrice={lastPrice} />}
           
        </>
    );
}

export default NaverPay;
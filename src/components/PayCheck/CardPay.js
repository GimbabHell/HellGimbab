import { useEffect, useState } from "react";
import PointSave from "./PointSave";
import ReactModal from "react-modal";
ReactModal.setAppElement('#root');

const CardPay = ({lastPrice}) => {
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);   
    const [show2, setShow2] = useState(true);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
            
            setTimeout(() => {
                setLoading(false);
                setPaymentSuccess(true);
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
                contentLabel="카드페이"
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

            <h2>카드 결제 안내</h2>
            <button onClick={()=>closeModal()}>x</button>
            {loading && <h3>결제 중입니다... 잠시만 기다려 주세요.</h3>}
            {!paymentSuccess ? (
                <>
                    <h3>결제금액: {lastPrice}</h3>
                    <h5>
                        <ul>
                            <li>다음 그림과 같이 카드 리더기에 카드를 꽂아주세요.</li>
                            <li>결제가 완료될 때까지 카드를 빼지 말고 기다려주세요.</li>
                            <li>결제가 완료되면 카드를 회수해주세요.</li>
                            <li>사용 가능한 카드 안내: 국내 결제 가능한 신용카드, 체크카드</li>
                        </ul>
                    </h5>
                </>
            ) : null}
            </ReactModal>


            {/* 결제 완료 후 PointSave 컴포넌트를 표시 */}
            {paymentSuccess && <PointSave lastPrice={lastPrice} />}
           
        </>
    );
}

export default CardPay;
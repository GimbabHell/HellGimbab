// 주문리스트
// 결제창으로 가기전 마지막 체크

import { useEffect, useState } from "react";
import { orderStore } from "../../store";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import MenuOrderStyle from "./MenuOrder.css";

ReactModal.setAppElement('#root');


const OrderCheck= ({show, setShow})=>{

    const navigate = useNavigate();
    const { order, totalPrice } = orderStore();
    const [orders, setOrders] = useState();

    useEffect(()=>{
        
        const list = order.map((singleOrder,index)=> {
            let num = index + 1;
            return (
                <li key={index}>                  
                    <div>
                        <div className="left">
                            <span className="num">{num}</span>
                            <span> {singleOrder.menuName} </span>
                        </div>
                        <div className="right">
                            <span className="quantity notoSans"> {singleOrder.quantity}개 </span>
                            <span className="price"> {singleOrder.unitPrice}원 </span>
                        </div>
                    </div>
                    <h5>{singleOrder.detailsToShow===""? "": `- ${singleOrder.detailsToShow}`}</h5>                 
                </li>
            )
                
        });

        // 보여주기위한 장바구니 리스트
        setOrders(list);
        
    },[show]);

    const closeModal =()=>{
        setShow(false);
    };

    return(
        <>
            <ReactModal
                isOpen={show}        // Modal visibility
                onRequestClose={closeModal}  // Close when clicking outside or pressing ESC
                contentLabel="주문리스트"
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

            <div className="menuOrderModal">
                <div class="modalTop">
                    <h2 className="title">주문리스트</h2>
                    <button className="btn-close" onClick={()=>closeModal()}><FaXmark /></button>    
                </div>
                <div className="scrollContainer">
                    <ul>
                        {orders}
                    </ul>
                </div>
                <div className="totalPrice">
                    <p>총 결제 금액</p>
                    <p>{totalPrice}원</p>
                </div>
                <div className="btn-wrap">
                    <button className="btn btn-gray btn-small" onClick={()=>closeModal()}> 취소 </button>
                    <button className="btn btn-red btn-small" onClick={()=>navigate('/paycheck')}> 주문담기 </button>
                </div>
            </div>

            </ReactModal>
        </>
    )
}
export default OrderCheck;
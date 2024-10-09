// 주문리스트
// 결제창으로 가기전 마지막 체크

import { useEffect, useState } from "react";
import { orderStore } from "../../store";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
ReactModal.setAppElement('#root');

const OrderCheck= ({show, setShow})=>{

    const navigate = useNavigate();
    const { order, totalPrice } = orderStore();
    const [orders, setOrders] = useState();

    useEffect(()=>{
        
        const list = order.map((singleOrder,index)=> {
            let num = index + 1;
            return <ul>
                    <li key={index}>                  
                    <span>  {num}   </span>
                    <span> {singleOrder.menuName} </span>
                    <span> {singleOrder.quantity} </span>
                    <span> {singleOrder.unitPrice} </span>
                    <h5>{singleOrder.detailsToShow}</h5>                 
                    </li></ul>
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
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'  // Background overlay
                }
                }}
            >

            <h2>주문리스트</h2>
            {orders}
            <p>총 결제 금액   {totalPrice} </p>
            <button onClick={()=>closeModal()}> 취소 </button>
            <button onClick={()=>navigate('/paycheck')}> 주문담기 </button>

            </ReactModal>
        </>
    )
}
export default OrderCheck;
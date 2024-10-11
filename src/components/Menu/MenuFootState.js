// 하단에 나올 것들을 담아주는 container
// MenuOrder(장바구니)
// 시간초 카운터
// 주문하기 버튼 (장바구니 확인)

import { orderStore } from "../../store";
import MenuOrder from "./MenuOrder";
import { useState } from "react";
import OrderCheck from "./OrderCheck";
import MenuFootStateStyle from './MenuFootState.css';
import { FaTrashCan, FaCreditCard } from "react-icons/fa6";

const MenuFootState = ()=>{

    const { clearAll, order } = orderStore();
    const [show, setShow] = useState(false);

    const showModal = ()=>{
        if(order.length !== 0){
            setShow(true)
        }else{
            alert("뭐라도 담고 주문해주세요~");
        }
    };

    return(
        <div className="menuFootState">
            <MenuOrder />
            <div className="menu-btn-wrap">
                <button className="btn btn-black" onClick={()=>clearAll()} >
                    <FaTrashCan /> <p>전체삭제</p>
                </button>
                <button className="btn btn-red" onClick={()=> showModal()} >
                    <FaCreditCard />
                    <p>주문하기</p>
                </button>
            </div>
            <OrderCheck show={show} setShow={setShow} />
        </div>
    )
}

export default MenuFootState;
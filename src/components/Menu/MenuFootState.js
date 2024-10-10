// 하단에 나올 것들을 담아주는 container
// MenuOrder(장바구니)
// 시간초 카운터
// 결제 버튼 (장바구니 확인)

import { orderStore } from "../../store";
import MenuOrder from "./MenuOrder";
import { useState } from "react";
import OrderCheck from "./OrderCheck";
import MenuFootStateStyle from './MenuFootState.css';
import { FaTrashCan, FaCreditCard } from "react-icons/fa6";

const MenuFootState = ()=>{

    const { clearAll } = orderStore();
    const [show, setShow] = useState(false);

    return(
        <div className="menuFootState">
            <MenuOrder />
            <div className="menu-btn-wrap">
                <button className="btn btn-black" onClick={()=>clearAll()} >
                    <FaTrashCan /> <p>전체삭제</p>
                </button>
                <button className="btn btn-red" onClick={()=> setShow(true)} >
                    <FaCreditCard />
                    <p>주문하기</p>
                </button>
            </div>
            <OrderCheck show={show} setShow={setShow} />
        </div>
    )
}

export default MenuFootState;
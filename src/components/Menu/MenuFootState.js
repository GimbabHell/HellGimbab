// 하단에 나올 것들을 담아주는 container
// MenuOrder(장바구니)
// 시간초 카운터
// 결제 버튼 (장바구니 확인)

import { useNavigate } from "react-router-dom";
import { orderStore } from "../../store";
import MenuOrder from "./MenuOrder";
import { useState } from "react";

const MenuFootState = ()=>{

    const navigate = useNavigate();
    const { clearAll } = orderStore();
    const [show, setShow] = useState(false);

    return(
        <>
            <MenuOrder />
            <button onClick={()=>clearAll()}>전체삭제</button>
            <button onClick={()=>navigate('/paycheck')}>주문하기</button>
        </>
    )
}

export default MenuFootState;
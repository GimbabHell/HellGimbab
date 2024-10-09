// 하단에 나올 것들을 담아주는 container
// MenuOrder(장바구니)
// 시간초 카운터
// 결제 버튼 (장바구니 확인)

import { orderStore } from "../../store";
import MenuOrder from "./MenuOrder";

const MenuFootState = ()=>{

    const { clearAll } = orderStore();

    return(
        <>
            <MenuOrder />
            <button onClick={()=>clearAll()}>전체삭제</button>
            <button>주문하기</button>
        </>
    )
}

export default MenuFootState;
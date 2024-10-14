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

    const messages =[
        "뭐라도 담고 주문해주세요~",
        "흠.. 뭐라도 담고 주문을 해야지? 실수지? 봐 줄게! 🤔",
        "또..? 하나..",
        "둘..",
        "셋..",
        "악마는 참지 않긔!!!!",
        "...",
        "악마가 당신에게 다가오고 있습니다."
    ];
    let messageId = 0;
    

    const { clearAll, order } = orderStore();
    const [show, setShow] = useState(false);

    const showModal = ()=>{
        if(order.length !== 0){
            setShow(true)
        }else{
            if(messageId < messages.length){
                alert(messages[messageId]);
                messageId++;
                if(messageId >= messages.length ){
                messageId = 0;
    }
            }
            
            
        }
    };

    const onClickAsk = () =>{
        if(order.length === 0){
            alert("삭제할 상품이 없습니다. \n주문하실 상품을 선택해 주세요~")
        }else{
            if(window.confirm("REALLY 전체 삭제 하시겠습니까?")){
                clearAll()
            }
        }
    };

    return(
        <div className="menuFootState">
            <MenuOrder />
            <div className="menu-btn-wrap">
                <button className="btn btn-black" onClick={()=> onClickAsk()} >
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
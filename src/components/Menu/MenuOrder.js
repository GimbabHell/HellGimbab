// 장바구니
// menu 선택 --> detail 선택후 추가 --> menu 창으로 돌아와서 장바구니에 자동추가

import { useEffect } from "react";
import { getSingleMenu } from "../../api/MenuApi";
import { orderStore } from "../../store";

const MenuOrder = ()=>{

    const {orderSingleMenu, singleOrder, order, deleteSingleOrder} = orderStore();
    const menuCode = 1;
    const menuCode2 = 2;
    const menu = getSingleMenu(menuCode);
    const menu2 = getSingleMenu(menuCode2);

    useEffect(()=>{
        orderSingleMenu(menu.name, menu.price, menu.quantity, menu.details);
        singleOrder();
    },[])


    useEffect(()=>{
        console.log(order);
    },[order])

    const onClickDelete = index =>{
        deleteSingleOrder(index);
    }


    return(
        <>
            {order.map((singleOrder,index)=> {
                return <ul>
                    <button onClick={()=>onClickDelete(index)}>X</button>
                    <li key={index}>{singleOrder.menuName}
                        <button>-</button>
                        {singleOrder.quantity}
                        <button>+</button>
                        {singleOrder.price}
                        </li></ul>
            })}
            <button>전체삭제</button>
        </>
    )
}

export default MenuOrder;
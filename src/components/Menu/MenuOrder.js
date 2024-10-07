// 장바구니
// menu 선택 --> detail 선택후 추가 --> menu 창으로 돌아와서 장바구니에 자동추가

import { useEffect } from "react";
import { getSingleMenu } from "../../api/MenuApi";
import { orderStore } from "../../store";

const MenuOrder = ()=>{

    const {orderSingleMenu, singleOrder, order} = orderStore();
    const menuCode = 1;
    const menuCode2 = 2;
    const menu = getSingleMenu(menuCode);
    
    console.log(menu);

    useEffect(()=>{
        orderSingleMenu(menu.name, menu.price, menu.quantity, menu.details);
        singleOrder();
    },[])


    useEffect(()=>{
        console.log(order);
    },[order])
    




    return(
        <>
            
        </>
    )
}

export default MenuOrder;
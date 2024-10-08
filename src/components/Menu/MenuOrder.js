// 장바구니
// menu 선택 --> detail 선택후 추가 --> menu 창으로 돌아와서 장바구니에 자동추가

import { useEffect, useState } from "react";
import { getSingleMenu } from "../../api/MenuApi";
import { orderStore } from "../../store";

const MenuOrder = ()=>{

    const {orderSingleMenu, singleOrder, order, deleteSingleOrder} = orderStore();
    const menuCode = 1;
    const menuCode2 = 2;
    const menu = getSingleMenu(menuCode);
    const menu2 = getSingleMenu(menuCode2);
    const menuDetails = {rice : "백미",
                        vegi : ["지단 빼기", "당근 빼기", "오이 빼기", "적채 빼기"],
                        dipping : "소스없음",
                        topping : ["올리브", "청양고추", "갈릭칩"]};

    const [detailPrice, setDetailPrice] = useState(0);

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


    // 가격 계산
    // 넘어온 details 배열에서 key 값들만 추출
    // key 값의 배열들 중 밥, 디핑소스, 토핑 있는지 확인
    // 밥, 디핑소스가 있으면 해당 배열안에 건두부, 소스없음 있는지 확인 respectively
    // 있으면 가격 계산
    // 토핑 key 가 있으면...
    // topping 배열 전체를 for문 돌려서 menuDetail의 subCategoryCode 1005 만으로 이루어진 배열과 비교후 필터??(이중 for문??)

    const detailKeys = Object.keys(menuDetails);
    const detailValues = Object.values(menuDetails.topping);
    console.log(`menuDetails : ${menuDetails}`);
    console.log(`detailKeys : ${detailKeys}`);
    console.log(`detailValues : ${detailValues}`);
    console.log(Array.isArray(detailKeys));
    for(let i =0; i < detailKeys.length; i++){

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
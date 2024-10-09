// 장바구니
// menu 선택 --> detail 선택후 추가 --> menu 창으로 돌아와서 장바구니에 자동추가

import { useEffect, useMemo, useState } from "react";
import { getToppingDetails } from "../../api/MenuApi";
import { orderStore } from "../../store";

const MenuOrder = ()=>{

    const {price, details, singleOrder, order, deleteSingleOrder, setPrice, reset, reduceQuantity} = orderStore();
    const [orders, setOrders] = useState();


    useEffect(()=>{
        
        //details 로 인한 추가 가격 계산
        if(parseInt(price) !== 0){
            let detailPrice= 0;                         // 추가금 계산에 임시로 쓸 변수
            const detailKeys = Object.keys(details);    // zustand에 저장해 놓은 details 배열에서 key 값들만 추출

            // key 값의 배열들 중 밥, 디핑소스, 토핑 있는지 확인
            // 밥, 디핑소스가 있으면 해당 배열안에 건두부, 소스없음 있으면 가격 계산
            
            // 토핑 key 가 있으면...
            // 선택한 topping 배열과 토핑객체들만으로 이루어진 배열을 이중for문 돌려서 비교
            // 같은 이름에 토핑에 대한 가격 계산
            for(let k=0; k < detailKeys.length; k++){
                if(detailKeys[k] === "rice"){
                    const riceValue = details.rice;
                    console.log(detailPrice);
                    if(riceValue === "건두부"){ detailPrice += 300;}
                }else if(detailKeys[k] === "dipping"){
                    const dippingValue = details.dipping;
                    if(dippingValue === "소스없음"){detailPrice -= 300;}
                }
                else if(detailKeys[k] === "topping"){
                    const toppingValues = Object.values(details.topping);
                    const toppingDetails = getToppingDetails();
                    for(let i=0; i < toppingValues.length; i++){
                        for(let j=0; j < toppingDetails.length; j++){
                            if(toppingValues[i] === toppingDetails[j].name){
                                detailPrice += toppingDetails[j].price;
                            }
                        }
                    }
                }
            }

            // zustand로 기본가격에 추가금 계산
            setPrice(detailPrice);
            // 장바구니 추가
            singleOrder();
            // zustand의 한개 메뉴 비우기
            reset();
        }

    },[details]);


    const onClickDelete = orderNum =>{
        deleteSingleOrder(orderNum);
    };

    const onClickReduce = orderNum =>{
        reduceQuantity(orderNum);
    };

    useEffect(()=>{
        const orderList = order.map((singleOrder,index)=> {
            return <ul>
                <button onClick={()=>onClickDelete(singleOrder.orderNum)}>X</button>
                <li key={index}>{singleOrder.menuName}
                    <button onClick={()=>onClickReduce(singleOrder.orderNum)}>-</button>
                    {singleOrder.quantity}
                    <button>+</button>
                    <h5>{singleOrder.detailsToShow}</h5>
                    <h4>{singleOrder.price}</h4>                    
                    </li></ul>
        });
        setOrders(orderList);
    },[order]);
    


    
    return(
        <>
            {orders}
            <button>전체삭제</button>
        </>
    )
}

export default MenuOrder;


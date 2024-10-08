// 장바구니
// menu 선택 --> detail 선택후 추가 --> menu 창으로 돌아와서 장바구니에 자동추가

import { useEffect, useMemo, useState } from "react";
import { getSingleMenu, getToppingDetails } from "../../api/MenuApi";
import { orderStore } from "../../store";

const MenuOrder = ()=>{

    const {price, details, singleOrder, order, deleteSingleOrder, setPrice} = orderStore();
    const menuDetails = {rice : "백미",
                        vegi : ["지단 빼기", "당근 빼기", "오이 빼기", "적채 빼기"],
                        dipping : "소스없음",
                        topping : ["올리브", "청양고추", "갈릭칩"]};

    // 가격 계산
    // 넘어온 details 배열에서 key 값들만 추출
    // key 값의 배열들 중 밥, 디핑소스, 토핑 있는지 확인
    // 밥, 디핑소스가 있으면 해당 배열안에 건두부, 소스없음 있는지 확인 respectively
    // 있으면 가격 계산
    // 토핑 key 가 있으면...
    // topping 배열 전체를 for문 돌려서 menuDetail의 subCategoryCode 1005 만으로 이루어진 배열과 비교후 필터??(이중 for문??)

    //details 로 인한 추가 가격 계산
    useEffect(()=>{
        
        let detailPrice= 0;
        const detailKeys = Object.keys(details);

        for(let k=0; k < detailKeys.length; k++){
            if(detailKeys[k] === "밥"){
                const riceValues = Object.values(details.rice);
                for(let l=0; l < riceValues.length; l++){
                    if(riceValues[l] === "건두부"){
                        detailPrice += 300;
                        break;
                    }
                }
            }else if(detailKeys[k] === "디핑소스"){
                const dippingValues = Object.values(details.dipping);
                for(let m=0; m < dippingValues.length; m++){
                    if(dippingValues[m] === "소스없음"){
                        detailPrice -= 300;
                        break;
                    }
                }
            }
            else if(detailKeys[k] === "토핑"){
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

        // zustand 통해서 가격 계산 후 저장
        setPrice(detailPrice);
        console.log(detailPrice);
        console.log(price);
        // 장바구니 추가
        singleOrder();

    },[details]);

    

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
                        <h4>{singleOrder.price}</h4>                    
                        </li></ul>
            })}
            <button>전체삭제</button>
        </>
    )
}

export default MenuOrder;


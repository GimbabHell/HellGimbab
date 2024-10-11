// 장바구니
// menu 선택 --> detail 선택후 추가 --> menu 창으로 돌아와서 장바구니에 자동추가

import { useEffect, useState } from "react";
import { getToppingDetails } from "../../api/MenuApi";
import { checkDetail, orderStore } from "../../store";
import { FaCircleXmark, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

const MenuOrder = ()=>{

    const {price, details, singleOrder, order, deleteSingleOrder, setItemPrice, reset, reduceQuantity, 
        addQuantity, setDetailPrice, setUnitPrice, setTotalObjNum, setTotalPrice, totalObjNum, totalPrice, menuName, addQuantityBySelect} = orderStore();
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
            // zustand에 details 선택으로 인한 추가금 저장
            setDetailPrice(detailPrice);

            // zustand에  price + detailsPrice 저장
            setItemPrice();
            
            // zustand에 itemPrice * quantity 저장
            setUnitPrice();
            
            // 장바구니 추가
            const list=[];
            for(let i=0; i<order.length; i++){
                list.push(order[i].menuName);
            }

            if(JSON.stringify(details)==='{}' && list.includes(menuName)){
                addQuantityBySelect();
            }else{singleOrder();}

            // singleOrder();

            // zustand의 한개 메뉴 비우기
            reset();
        }

    },[details]);


    useEffect(()=>{
        
        const orderList = order.map((singleOrder,index)=> {
            let num = index + 1;
            return <li key={index}>
                        <div>
                            <div className="left">
                                <button className="btn-x" onClick={()=>deleteSingleOrder(singleOrder.orderNum)}>
                                    <FaCircleXmark />
                                </button>            
                                <span className="num">{num}</span>
                                <span>{singleOrder.menuName}</span>
                            </div>
                            <div className="right">
                                <button onClick={()=>reduceQuantity(singleOrder.orderNum)}>
                                    <FaCircleMinus />
                                </button>
                                <span className="notoSans"> {singleOrder.quantity}개 </span>
                                <button onClick={()=>addQuantity(singleOrder.orderNum)}>
                                    <FaCirclePlus />
                                </button>
                                <span className="price">{singleOrder.unitPrice}원</span>
                                   
                            </div> 
                        </div>                
                        <h5>{singleOrder.detailsToShow===""? "": `- ${singleOrder.detailsToShow}`}</h5>
                    </li>
        });

        // 보여주기위한 장바구니 리스트
        setOrders(orderList);
        // 총 상품 개수
        setTotalObjNum(orderList.length);

        let price = 0;
        for(let i = 0; i<order.length; i++){
            // setTotalPrice(value => value + parseInt(orderList[i].price));
            price += parseInt(order[i].unitPrice);
        }

        setTotalPrice(price);
    },[order]);
    


    
    return(
        <div className="menuOrder">
            <ul>
                {orders}
            </ul>
            <div className="orderBottom">
                <p><span>선택한 상품</span> &nbsp;{totalObjNum}개 </p>
                <p><span className="red">TOTAL</span> &nbsp;{totalPrice}원 </p>
            </div>
        </div>
    )
}

export default MenuOrder;


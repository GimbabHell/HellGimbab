// MenuOutlet에 담김
// 카테고리 선택시 해당하는 메뉴가 표시되는 Container

import { useNavigate } from "react-router-dom"
import MenuStateStyle from './MenuState.css';
import { checkDetail, orderStore } from "../../store";
import { useEffect } from "react";

const MenuState = ({menus})=>{

    const { order, selectedMenus, setSelectedMenus} = orderStore();
    const { selectedValues } = checkDetail();
    const navigate = useNavigate();
    
    useEffect(()=>{

        if(order.length > 0){
            const list=[];
            for(let i=0; i<order.length; i++){
                list.push(order[i].menuName);
            }
            setSelectedMenus(list);
        }
       
    },[order]);

    const onClickMenuSelector = (menu) =>{
        
        if(menu.categoryCode === 5 || menu.categoryCode === 6 || menu.categoryCode === 7 || menu.menuCode === 37){
            const orderData = {
                selectedValues,
                menu,
            };
            navigate(`/menu/${menu.categoryCode}`, { state: orderData });
            
        }else{
            navigate(`/detail?menuCode=${menu.menuCode}`, {state: menu});
        }
    }


    

    const menuList = menus.map((menu)=>{
        return(
            <li onClick={()=>onClickMenuSelector(menu)}
            className={selectedMenus.includes(menu.name) ? "active": null }
            >
                <div className="imgBox">
                    <img src={menu.imgURL}/> 
                </div>
                <p className="name">{menu.name}</p>
                <p className="price">{menu.price}원</p>
            </li>
        )
    })
    

    return(
       <div className="menuContainer">
         <div className="scrollContainer">
            <ul>
                {menuList}
            </ul>
         </div>
       </div>
    )
}

export default MenuState;
// MenuOutlet에 담김
// 카테고리 선택시 해당하는 메뉴가 표시되는 Container

import { useNavigate } from "react-router-dom"
import MenuStateStyle from './MenuState.css';
import { orderStore } from "../../store";

const MenuState = ({menus})=>{

    const {order} = orderStore();

    const navigate = useNavigate();
    
    const menuNames = order.length > 0 ? order[0].menuName : "";
    

    const menuList = menus.map((menu)=>{
        return(
            
            <li onClick={()=>{navigate(`/detail?menuCode=${menu.menuCode}`, {state: menu})}} 
            className={menu.name === menuNames ? "active": null}
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
// MenuOutlet에 담김
// 카테고리 선택시 해당하는 메뉴가 표시되는 Container

import { useNavigate } from "react-router-dom"

const MenuState = ({menus})=>{

    const navigate = useNavigate();

    const menuList = menus.map((menu)=>{
        return(
            
            <li onClick={()=>{navigate(`/detail?menuCode=${menu.menuCode}`, {state: menu})}}>
            {menu.menuCode}  {menu.categoryCode}  {menu.name}  {menu.price}  {menu.description} <img src={menu.imgURL}/> </li>
        )
    })
    

    return(
        <ul>
            {menuList}
        </ul>
    )
}

export default MenuState;
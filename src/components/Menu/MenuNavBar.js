// 메뉴 카테고리(김밥, 추천, 음료, 세트 등)

import { NavLink } from "react-router-dom"

const MenuNavBar =()=>{

    return(
        <ul>
            <li>
                <NavLink to={`/menuOutlet/`}>김밥</NavLink>
            </li>
            <li>
                <NavLink to={"/menuOutlet"}>비빔밥</NavLink>
            </li>
            <li>
                <NavLink to={"/menuOutlet"}>세트</NavLink>
            </li>
            <li>
                <NavLink to={"/menuOutlet"}>사이드</NavLink>
            </li>
        </ul>
    )
}

export default MenuNavBar;
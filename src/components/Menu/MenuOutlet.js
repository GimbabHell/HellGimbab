// MenuNavBar 에서 카테고리 선택시 해당하는 메뉴가 나오는 outlet

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuFromCate } from "../../api/MenuApi";

// 이 컨테이너에 MenuState(해당메뉴가 나오는 component),
// MenuFootState(하단에 나올 것들을 담아주는 container)

const MenuOutlet =()=>{

    const [menus, setMenus] = useState([]);
    const {catecode} = useParams();

    useEffect(()=>{

        // 선택한 카테고리의 menu들 반환
        const menuList = getMenuFromCate(catecode);

        // (menuCode, categoryCode, name, price, description, imgURL, quantity, soldout, state, details) 를 갖는 배열
        setMenus(menuList);
    },[]);
    console.log(catecode);
    console.log(menus);


    return(
        <>
            <h1>메뉴들???</h1>
            {menus.map((menu)=> {
                return <ul><li>{menu.menuCode}  {menu.categoryCode}  {menu.name}  {menu.price}  {menu.description}  </li>
                        <img src={menu.imgURL}/></ul>
            })}
        </>
    )
}
export default MenuOutlet;
// MenuNavBar 에서 카테고리 선택시 해당하는 메뉴가 나오는 outlet

import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getMenuFromCate } from "../../api/MenuApi";
import MenuState from "./MenuState";
import MenuFootState from "./MenuFootState";

// 이 컨테이너에 MenuState(해당메뉴가 나오는 component),
// MenuFootState(하단에 나올 것들을 담아주는 container)

const MenuOutlet =()=>{

    const [menus, setMenus] = useState([]);
    const {cateCode} = useParams();
    // const selectedMenu = menu;


    // NavBar 에서 카테고리 선택시
    useEffect(()=>{
        // 선택한 카테고리의 menu들 반환
        // (menuCode, categoryCode, name, price, description, imgURL, quantity, soldout, state, details) 를 갖는 배열
        setMenus(getMenuFromCate(cateCode));
    },[cateCode]);

    

    return(
        <>
            <h1>메뉴들???</h1>
            <MenuState menus ={menus} />
            <MenuFootState />
            
        </>
    )
}
export default MenuOutlet;
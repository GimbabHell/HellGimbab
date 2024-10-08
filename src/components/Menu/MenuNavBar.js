// 메뉴 카테고리(김밥, 추천, 음료, 세트 등)

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { getWholeMenuCate } from "../../api/MenuApi";

const MenuNavBar =()=>{

    const [categories, setCategories] = useState([]);
    const navi = useNavigate();

    useEffect(()=>{

        navi("/menu/1");
        // 1. 메뉴카테고리 배열 가져오기(categoryCode, name, products 포함 객체 배열)
        const cate = getWholeMenuCate();
        setCategories(cate);

    },[]);

    const categoryList = categories.map((cate)=>{
        return(
            <li>
            <NavLink to={`/menu/${cate.categoryCode}`}>{cate.name}</NavLink>
            </li>
    )});


    return(
        <ul>
            {categoryList}
        </ul>
        
    )
}

export default MenuNavBar;
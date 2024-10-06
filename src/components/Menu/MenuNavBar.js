// 메뉴 카테고리(김밥, 추천, 음료, 세트 등)

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { getWholeMenuCate } from "../../api/MenuApi";

const MenuNavBar =()=>{

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        // 1. 메뉴카테고리 배열 가져오기(categoryCode, name, products 포함 객체 배열)
        const cate = getWholeMenuCate();

        setCategories(cate);
    },[]);


    return(
        <>
            {categories.map((cate)=> {
                return(
                <li>
                <NavLink to={`/Menu/${cate.categoryCode}`}>{cate.name}</NavLink>
                </li>
            )})}
        </>
        
    )
}

export default MenuNavBar;
// 메뉴 카테고리(김밥, 추천, 음료, 세트 등)

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { getWholeMenuCate } from "../../api/MenuApi";
import MenuNavBarStyle from './MenuNavBar.css';
import { orderStore } from "../../store";

const MenuNavBar =()=>{

    const [categories, setCategories] = useState([]);
    const navi = useNavigate();
    const { categoryCode } = orderStore();

    useEffect(()=>{

        // 디폴트로 김밥류 보여주기
        navi(`/menu/${categoryCode}`);
        // 메뉴카테고리 배열 가져오기(categoryCode, name, products 포함 객체 배열)
        const cate = getWholeMenuCate();
        setCategories(cate);

    },[categoryCode]);

    const categoryList = categories.map((cate)=>{
        return(
            <li>
            <NavLink to={`/menu/${cate.categoryCode}`}>{cate.name}</NavLink>
            </li>
    )});


    return(
        <nav>
            <ul>
                {categoryList}
            </ul>
        </nav>
        
    )
}

export default MenuNavBar;
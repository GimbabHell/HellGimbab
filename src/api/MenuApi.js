import menus from "../data/menu.json";
import menuCategory from "../data/menuCategory.json";
import menuDetails from "../data/menuDetail.json";


// menuCategory 배열 전체 반환(categoryCode, name, products 포함 객체 배열)
export function getWholeMenuCate(){
    return menuCategory;
}

// 특정 categoryCode를 가지는 메뉴 배열 반환
export function getMenuFromCate(catecode){
    return menus.filter((menu) => menu.categoryCode === parseInt(catecode));
}

// 토핑 detail들만 반환
export function getToppingDetails(){
    return menuDetails.filter((detail)=> detail.subCategoryCode === 1005);
}
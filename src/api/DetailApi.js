import menu from "../data/menu.json";
import menuDetail from "../data/menuDetail.json";
import menuDetailCate from "../data/menuDetailCategory.json";

export function getDetails(id) {
    const details = menu.filter((item) => item.menuCode === parseInt(id))[0];
    return details.details; // 디테일 배열 반환
}

export function getSubCategoryCode(id) {
    const subCategory = menuDetail.filter((item) => item.detailCode === parseInt(id))[0];
    return subCategory.subCategoryCode; // 서브카테고리코드 배열을 반환
}

export function getSubCategoryName(id) {
    const codes = menuDetailCate.filter((item) => item.subCateogoryCode === parseInt(id))[0];
    return codes.name;
}

export function getDetailOption(cate) {
    return menuDetail.filter((item) => item.subCategoryCode === parseInt(cate));
}

export function getDetailGroup(cate) {
    const codes = menuDetailCate.filter((item) => item.subCateogoryCode === parseInt(cate))[0];
    return codes.group;
}

import { cloneElement, useEffect, useState } from "react";
import { getDetailGroup, getDetailOption, getDetails, getSubCategoryCode, getSubCategoryName } from "../api/DetailApi";
import { OptionList } from "../components/MenuDetail/OptionList";
import { checkDetail } from "../store";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const MenuDetailPage = () => {
    const [details, setDetails] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState([]);
    const [group, setGroup] = useState([]);

    const { selectedValues, resetValues } = checkDetail();
    const [detail] = useSearchParams();
    const menuCode = detail.get("menuCode");
    

    const navi = useNavigate();

    // 넘어온 메뉴코드
    const id = menuCode;

    useEffect(() => {
        // 1. 메뉴코드로 디테일코드들 가져옴
        const detailCodes = getDetails(id);
        // 2. 디테일코드로 서브카테고리 가져옴
        const subCategories = detailCodes.map((item) => getSubCategoryCode(item));
        // 3. 배열 중복값 제거
        const subCategoriesArr = subCategories.filter((el, index) => subCategories.indexOf(el) === index);

        // 4. 서브카테고리 코드로 서브카테고리 이름 가져오기
        const subCategoryNames = subCategoriesArr.map((item) => getSubCategoryName(item));

        // 5. 서브 카테고리로 디테일 옵션들 가져오기
        const detailsOptions = detailCodes.map((id) => getDetailOption(id));

        const totalArr = [];
        const arr = [];
        const arr2 = [];
        const arr3 = [];
        const arr4 = [];
        const arr5 = [];
        const arr6 = [];
        detailsOptions.map((item) => {
            if (item.subCategoryCode === 1001) {
                arr.push(item);
            } else if (item.subCategoryCode === 1002) {
                arr2.push(item);
            } else if (item.subCategoryCode === 1003) {
                arr3.push(item);
            } else if (item.subCategoryCode === 1004) {
                arr4.push(item);
            } else if (item.subCategoryCode === 1005) {
                arr5.push(item);
            } else if (item.subCategoryCode === 1006) {
                arr6.push(item);
            } else if (item.subCategoryCode === 1007) {
                arr6.push(item);
            } else if (item.subCategoryCode === 1006) {
                arr6.push(item);
            }
        });

        const detailsArr = totalArr.concat([arr], [arr2], [arr3], [arr4], [arr5], [arr6]);
        const filterDetails = detailsArr.filter((item) => Array.isArray(item) && item.length !== 0);

        // 6. 서브 카테고리로 디테일 그룹가져오기
        const detailsGroups = subCategoriesArr.map((cate) => getDetailGroup(cate));

        // 상태값 설정
        setSubCategoryName(subCategoryNames);
        setDetails(filterDetails);
        setGroup(detailsGroups);
    }, []);

    const onClickHandler = () => {
        resetValues();
        document.querySelectorAll("input").forEach((item) => (item.checked = false));
    };

    const onClickOrderHandler = () => {

    }
    
    

    return (
        <>
            <h3>선택하신 상품의 옵션 상품을 모두 선택해주세요.</h3>
            <div className="menuBox">
                {/* 여기 어떻게 넘겨줄지 확인해서 채우기 !!! */}
                <img src="" alt="" />
                <p className="name"></p>
                <p className="price">
                    <span>원</span>
                </p>
            </div>
            <div className="optionBox">
                <p>선택된 옵션 | </p>
                
                <p>
                    <span>{selectedValues.rice} </span>
                    <span className="check">{selectedValues.vegi} </span>
                    <span>{selectedValues.sauce} </span>
                    <span>{selectedValues.dipping} </span>
                    <span>{selectedValues.topping} </span>
                    <span>{selectedValues.noodle} </span>
                    <span>{selectedValues.ramen} </span>
                    {/* 데이터 추가 후에  더 있는거 추가하기 !! */}
                </p>
                <button onClick={onClickHandler}>초기화</button>
            </div>
            <form action={`/menu/${menuCode}`} >
                {details.map((cate, index) => {
                    return <OptionList key={index} cate={cate} subCategoryName={subCategoryName[index]} group={group[index]} />;
                })}
                <div className="button-wrap">
                    <button onClick={() => navi(-1)}>취소</button>
                    {/* 취소 navi 확인하기! */}
                    <button type="submit" onClick={onClickOrderHandler}>주문담기</button>
                    {/* 주문담기 창으로 이동 */}
                </div>
            </form>
            
        </>
    );
};

export default MenuDetailPage;

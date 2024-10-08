import { useEffect, useState } from "react";
import { getDetailGroup, getDetailOption, getDetails, getSubCategoryCode, getSubCategoryName } from "../api/DetailApi";
import { OptionList } from "../components/MenuDetail/OptionList";
import { checkDetail } from "../store";
import { useLocation, useNavigate } from "react-router-dom";

const MenuDetailPage = () => {
    const [details, setDetails] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState([]);
    const [group, setGroup] = useState([]);

    const { selectedValues, resetValues } = checkDetail();
   
    const location = useLocation();
    const menu = location.state;
    const menuCode = menu.menuCode;
    


    const navi = useNavigate();

    // 넘어온 메뉴코드
    const id = menuCode;

    useEffect(() => {
        // 1. 메뉴코드로 디테일코드들 가져옴
        const detailCodes = getDetails(id);
        
        if(detailCodes === undefined || detailCodes === null){
            // 디테일이 없는 페이지들 !
            document.querySelector(".optionBox").style.display = "none";
        }else {
           
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
            const arr7 = [];
            const arr8 = [];
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
                } else if (item.subCategoryCode === 1007) {
                    arr7.push(item);
                } else if (item.subCategoryCode === 1008) {
                    arr8.push(item);
                }
            });

            const detailsArr = totalArr.concat([arr], [arr2], [arr3], [arr4], [arr5], [arr6], [arr7], [arr8]);
            const filterDetails = detailsArr.filter((item) => Array.isArray(item) && item.length !== 0);

            // 6. 서브 카테고리로 디테일 그룹가져오기
            const detailsGroups = subCategoriesArr.map((cate) => getDetailGroup(cate));

            // 상태값 설정
            setSubCategoryName(subCategoryNames);
            setDetails(filterDetails);
            setGroup(detailsGroups);
        }
       
    }, []);

    const onClickHandler = () => {
        resetValues();
        document.querySelectorAll("input").forEach((item) => (item.checked = false));
    };

    const onClickOrderHandler = (e) => {
        e.preventDefault(); // 페이지 리로드 방지

        // 필요한 데이터를 객체로 구성
        const orderData = {
            selectedValues,
            menu,
        };

        // 다른 페이지로 이동하며 상태 전달
        navi(`/menu/${menu.categoryCode}`, { state: orderData });
    };
    
    

    return (
        <>
            <h3>선택하신 상품의 옵션 상품을 모두 선택해주세요.</h3>
            <div className="menuBox">
                <img src={menu.imgURL} alt={menu.name} />
                <p className="name">{menu.name}</p>
                <p className="price">
                    <span className="num">{menu.price}</span><span>원</span>
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
                    <span>{selectedValues.drink} </span>
                    {/* 데이터 추가 후에  더 있는거 추가하기 !! */}
                </p>
                <button onClick={onClickHandler}>초기화</button>
            </div>
            <form onSubmit={onClickOrderHandler}>
                {details.map((cate, index) => {
                    return <OptionList key={index} cate={cate} subCategoryName={subCategoryName[index]} group={group[index]} />;
                })}
                <div className="button-wrap">
                    <button onClick={() => navi(-1)}>취소</button>
                    {/* 취소 navi 확인하기! */}
                    <button type="submit">주문담기</button>
                    {/* 주문담기 창으로 이동 */}
                </div>
            </form>
            
        </>
    );
};

export default MenuDetailPage;

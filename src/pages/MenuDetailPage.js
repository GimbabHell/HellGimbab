import { useEffect, useState } from "react";
import { getDetailClassy, getDetailGroup, getDetailOption, getDetails, getSubCategoryCode, getSubCategoryName } from "../api/DetailApi";
import { OptionList } from "../components/MenuDetail/OptionList";

const MenuDetailPage = () => {
    const [details, setDetails] = useState([]);
    const [subCategoryName, setSubCategoryName] = useState([]);
    const [group, setGroup] = useState([]);
    // 넘어온 메뉴코드 test로 넣어둠
    const id = 1;

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
        detailsOptions.map((item)=>{
            if(item.subCategoryCode === 1001){
                arr.push(item);
            }else if(item.subCategoryCode === 1002) {
                arr2.push(item);
            }else if (item.subCategoryCode === 1003){
                arr3.push(item);
            }else if (item.subCategoryCode === 1004){
                arr4.push(item);
            }else if (item.subCategoryCode === 1005){
                arr5.push(item);
            }else if (item.subCategoryCode === 1006){
                arr6.push(item);
            }
        });

        const detailsArr = totalArr.concat([arr], [arr2], [arr3], [arr4], [arr5], [arr6]);
        const filterDetails = detailsArr.filter(item=> Array.isArray(item) && item.length !== 0);
        

        // 6. 서브 카테고리로 디테일 그룹가져오기
        const detailsGroups = subCategoriesArr.map((cate) => getDetailGroup(cate));

        
        // 상태값 설정
        setSubCategoryName(subCategoryNames);
        setDetails(filterDetails);       
        setGroup(detailsGroups);
    }, []);

    

    return (
        <>
            {details.map((cate, index) => {
                return <OptionList key={index} cate={cate} subCategoryName={subCategoryName[index]} group={group[index]} />;
            })}
        </>
    );
};

export default MenuDetailPage;

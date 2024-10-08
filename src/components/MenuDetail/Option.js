// checkbox

import { useEffect, useState } from "react";
import { checkDetail } from "../../store";

export const Option = ({ item, index, group }) => {
    const { toggleCheckbox } = checkDetail();
    const [isRequired, setIsRequired] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const onChangeHandler = (e, group) => {
        toggleCheckbox(group, e.target.value)
        if(e.target.checked){
            setIsChecked(true)
            // setSelectedCheckboxes([...selectedCheckboxes, e.target.name]);
        }else {
            setIsChecked(false)   
            // setSelectedCheckboxes(selectedCheckboxes.filter(item => item !== e.target.name));
        }
        const checkboxes = document.querySelectorAll(`input[name=${group}]`);
        const isAnyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    
        // 체크된 것이 하나라도 있으면 required 해제
        setIsRequired(!isAnyChecked);
    };

   

    useEffect(()=>{
        if(item.subCategoryCode === 1005){
            setIsRequired(false);
        }
    }, [])

    // 선택된 체크박스 수에 따라 required 속성 관리
    useEffect(() => {
        if (selectedCheckboxes.length > 0) {
            setIsRequired(false);
        } else {
            setIsRequired(true);
        }
    }, [selectedCheckboxes]);

    

    return (
        <>
            <li>
                <input type="checkbox" name={group} id={`${group}-${index}`} onChange={(e) => onChangeHandler(e, group)} value={item.name} required={isRequired} checked={isChecked}/>
                <label htmlFor={`${group}-${index}`}>
                    <img src={item.imgURL} alt={group} />
                    <span className="name">{item.name}</span>
                    <span className="price">{item.price >= 0 ? `+${item.price}원` : `${item.price}원`}</span>
                </label>
            </li>
        </>
    );
};

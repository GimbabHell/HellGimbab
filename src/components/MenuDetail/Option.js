// checkbox

import { useEffect, useState } from "react";
import { checkDetail } from "../../store";

export const Option = ({ item, index, group }) => {
    const { toggleCheckbox } = checkDetail();
    const [isRequired, setIsRequired] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (item.subCategoryCode === 1005) {
            setIsRequired(false);
        }
    }, []);

    const onChangeHandler = (e, group) => {
        toggleCheckbox(group, e.target.value);
        if (e.target.checked) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }

        const checkboxes = document.querySelectorAll('input[name="vegi"]');
        const isAnyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);

        // 체크된 것이 하나라도 있으면 required 해제
        if (isAnyChecked) {
            checkboxes.forEach((el) => (el.required = false));
        } else {
            checkboxes.forEach((el) => (el.required = true));
        }
    };

    return (
        <>
            <li>
                <input type="checkbox" name={group} id={`${group}-${index}`} onChange={(e) => onChangeHandler(e, group)} value={item.name} required={isRequired} checked={isChecked} />
                <label htmlFor={`${group}-${index}`}>
                    <div>
                        <img src={item.imgURL} alt={item.name} />
                    </div>
                    <p className="name">{item.name}</p>
                    <p className="price">{item.price >= 0 ? `+${item.price}원` : `${item.price}원`}</p>
                </label>
            </li>
        </>
    );
};

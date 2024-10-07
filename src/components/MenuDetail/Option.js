// checkbox

import { checkDetail } from "../../store";

export const Option = ({ item, index, group }) => {
    const { toggleCheckbox } = checkDetail();

    const onChangeHandler = (e, group) => toggleCheckbox(group, e.target.value);

    return (
        <>
            <li>
                <input type="checkbox" name={group} id={`${group}-${index}`} onChange={(e) => onChangeHandler(e, group)} value={item.name} />
                <label htmlFor={`${group}-${index}`}>
                    <img src={item.imgURL} alt={group} />
                    <span className="name">{item.name}</span>
                    <span className="price">{item.price >= 0 ? `+${item.price}원` : `${item.price}원`}</span>
                </label>
            </li>
        </>
    );
};

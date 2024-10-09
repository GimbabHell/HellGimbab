// radio

import { checkDetail } from "../../store";

export const Option2 = ({ item, index, group }) => {
    const { setSelectedValues } = checkDetail();

    const onChangeHandler = (e, group) => {
        setSelectedValues(group, e.target.value);
    };

    return (
        <>
            <li>
                <input type="radio" name={group} id={`${group}-${index}`} onChange={(e) => onChangeHandler(e, group)} value={item.name} required />
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

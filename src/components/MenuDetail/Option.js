export const Option = ({ item, index, group }) => {
    const onChangeHandler = (e) => {
        if (e.target.checked) {
            console.log(e.target.nextElementSibling.querySelector("span.name").textContent);
        }
    };
    return (
        <li>
            <input type="checkbox" name={group} id={`${group}-${index}`} onChange={onChangeHandler} />
            <label htmlFor={`${group}-${index}`}>
                <img src={item.imgURL} alt={group} />
                <span className="name">{item.name}</span>
                <span className="price">{item.price >= 0 ? `+${item.price}원` : `${item.price}원`}</span>
            </label>
        </li>
    );
};

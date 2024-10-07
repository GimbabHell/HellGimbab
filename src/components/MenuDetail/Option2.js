// radio

export const Option2 = ({ item, index, group, setTest }) => {
    const onChangeHandler = (e) => {
        if (e.target.checked) {
            const name = e.target.value;
            
            setTest([name]);
        }
       
    };

    
    return (
        <>
            <li>
                <input type="radio" name={group} id={`${group}-${index}`} onChange={onChangeHandler} value={item.name}/>
                <label htmlFor={`${group}-${index}`}>
                    <img src={item.imgURL} alt={group} />
                    <span className="name">{item.name}</span>
                    <span className="price">{item.price >= 0 ? `+${item.price}원` : `${item.price}원`}</span>
                </label>
            </li>
            
        </>
        
    );
};

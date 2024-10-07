import { useEffect } from "react";


// checkbox
export const Option = ({ item, index, group, test, setTest }) => {
    
    useEffect(()=>{
        console.log("현재 .....test : " + test)
    },[test])

    const onChangeHandler = (e) => {
        if (e.target.checked) {
            const name = e.target.value;
            setTest(prev => [...prev, name]);

        } else {
            setTest(test.filter(item=> item !== e.target.value));
        }
    };
    return (
        <>
                
                <li>
                    <input type="checkbox" name={group} id={`${group}-${index}`} onChange={onChangeHandler} value={item.name}/>
                    <label htmlFor={`${group}-${index}`}>
                        <img src={item.imgURL} alt={group} />
                        <span className="name">{item.name}</span>
                        <span className="price">{item.price >= 0 ? `+${item.price}원` : `${item.price}원`}</span>
                    </label>
                </li>
          
            
        </>
        
    );
};

import { checkDetail } from "../../store";


// checkbox
export const Option = ({ item, index, group, test, setTest }) => {
    const {setDetails, details, setDetailFilter} = checkDetail();
    
    // useEffect(()=>{
    //     console.log("현재 .....test : " + test)
    // },[test])

    const onChangeHandler = (e) => {
        if (e.target.checked) {
            const name = e.target.value;
            /* setTest(prev => [...prev, name]); */
            setDetails(name);
            
        } else {
            // setTest(test.filter(item=> item !== e.target.value));
            setDetailFilter(details.filter(item => item !== e.target.value))
            /* console.log(details.filter(item => item !== e.target.value)) */
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

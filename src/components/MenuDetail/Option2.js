// radio

import { useEffect, useState } from "react";
import { checkDetail } from "../../store";

export const Option2 = ({ item, index, group, setTest, arr2, setArr2 }) => {
    // const [checked, setChecked] = useState([]);
    const {setDetails, setDetailFilter, details, setDetailsRadio} = checkDetail();
    const [names, setNames] = useState('');

   const arr = [];
   useEffect(()=>{
        setArr2([...arr2, names]); 
        /* setArr2(prev=>{
            return[...prev,names]
        });  */
   }, [names]);


    const onChangeHandler = (e) => {

      /*   const name = e.target.value;
        const isChecked = e.target.checked;
        setDetailsRadio(name, isChecked); */
        const name = e.target.value;
        setNames(name);
        
        if (e.target.checked) {
            const name = e.target.value;
           /*  const name = e.target.value;
            setNames(name); */
            //console.log(arr2, arr2.filter(item=>item === name));
            const prev = arr2.filter(item=>item === name);
            console.log(prev);
            if(prev === name){
                console.log("같음");
                setDetails(name);
            }
            /* setDetails(checked.filter(item=>item === name)); */
            /* setDetails(name); */
            
            // setDetailFilter(details.filter(item => item !== name));
        }
        
    };

    
    
    return (
        <>
            <li>
                {/* {console.log(checked)} */}
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

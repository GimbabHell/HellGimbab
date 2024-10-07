import { useEffect, useState } from "react";
import { Option } from "./Option";
import { Option2 } from "./Option2";
import { checkDetail } from "../../store";

export const OptionList = ({ cate, subCategoryName, group }) => {
    const [test, setTest] = useState([]);
    const {setDetails, details} = checkDetail();
    const [arr2, setArr2] = useState([]);

    useEffect(()=>{
        // console.log("현재 ..test : " + test)
        
    },[])

    return (
        
        <div className="optionList">
            <h4 className="subCategoryName">{subCategoryName}</h4>
            <ul>
                {console.log(details)}
                {cate.map((item, index) => {
                    if(item.subCategoryCode === 1002 || item.subCategoryCode === 1005){
                        return <Option key={index} index={index} item={item} group={group} test={test} setTest={setTest}/>
                    }else {
                        return <Option2 key={index} index={index} item={item} group={group}  setTest={setTest} setArr2={setArr2} arr2={arr2}/>
                    }
                })}
            </ul>
        </div>
    );
};

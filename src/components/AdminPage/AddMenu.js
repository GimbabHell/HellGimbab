import {useState, useEffect} from "react";

// admin page 에서 메뉴 추가
// 일단 메뉴 추가 보류임 .....!!!!

const AddMenu = () => {

     // 추가할 메뉴의 속성을 담아줄 배열
    
     const {addMenuList, setAddMenuList} = useState([
        { menuCode: "" ,
         categoryCode: "",
         name: "",
         price: "",
         description: "",
         imgURL: "",
         quantity: "",
         soldout: false,
         state: false,
         details: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1028, 1029, 1030, 1031, 1032],
        }
    ]); 

    const onClickHandler = () => {
        // 기존의 menu.json 에 새로 입력받은 객체배열을 추가해줘야함.

    }

    
    useEffect = () => {
    <>
    <input type = "text" value={addMenuList.menuCode} onChange = {setAddMenuList.menuCode}/>
    <input type = "text" value={addMenuList.categoryCode} onChange = {setAddMenuList.categoryCode}/>
    <input type = "text" value={addMenuList.name} onChange = {setAddMenuList.name}/>
    <input type = "text" value={addMenuList.price} onChange = {setAddMenuList.price}/>
    <input type = "text" value={addMenuList.description} onChange = {setAddMenuList.description}/>
    {/* <input type = "file" accept="image/*" value={addMenuList.imgURL} onChange = {onChangeHandler1}/> 
    이미지 넣는법 아직 고민중 .. */}
    <input type = "text" value={addMenuList.quantity} onChange = {setAddMenuList.quantity}/>
    <input type = "checkbox" value={addMenuList.soldout} onChange = {setAddMenuList.soldout}/>
    <input type = "checkbox" value={addMenuList.state} onChange = {setAddMenuList.state}/>

    <button onClick = {onClickHandler}>등록!</button>
    </>

    }
}

export default AddMenu;


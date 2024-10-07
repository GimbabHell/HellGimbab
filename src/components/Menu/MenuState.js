// MenuOutlet에 담김
// 카테고리 선택시 해당하는 메뉴가 표시되는 Container

import { useNavigate } from "react-router-dom"

const MenuState = ({menus})=>{

    const navigate = useNavigate();
    
    // const onClickHandler = ()=>{
    //     navigate()
    // }


    return(
        <>
            {menus.map((menu)=> {
                return <ul><li onClick={()=>{navigate(`/detail?menuCode=${menu.menuCode}`)}}>{menu.menuCode}  {menu.categoryCode}  {menu.name}  {menu.price}  {menu.description}  </li>
                            <img src={menu.imgURL}/>
                        </ul>
            })}
        </>
    )
}

export default MenuState;
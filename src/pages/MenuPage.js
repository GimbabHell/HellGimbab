import { Outlet } from "react-router-dom";
import MenuNavBar from "../components/Menu/MenuNavBar";


const MenuPage = () => {


    return(
        <>
            <MenuNavBar/>
            <Outlet/>
        </>
                
    )
}

export default MenuPage;

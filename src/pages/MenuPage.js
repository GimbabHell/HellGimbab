import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import MenuNavBar from "../components/Menu/MenuNavBar";


const MenuPage = () => {
    const location = useLocation();
    const menu = location.state;
    console.log(menu);

    

    return(
        <>
            <MenuNavBar/>
            <Outlet/>
        </>
                
    )
}

export default MenuPage;

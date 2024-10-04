import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader";

const Layout = () => {
    return(
        <>
            <TopHeader/>
            <Outlet/>
        </>
    )
    
}

export default Layout;
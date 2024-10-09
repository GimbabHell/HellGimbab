import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import Footer from "../components/Footer";



const Layout = () => {
    return(
        <>
            <TopHeader/>
            <Outlet/>
            <Footer/>
        </>
    )
    
}

export default Layout;
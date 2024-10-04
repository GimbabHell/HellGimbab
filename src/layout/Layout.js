import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader";

const Layout = () => {
    <>
        <TopHeader/>
        <Outlet/>
    </>
}

export default Layout;
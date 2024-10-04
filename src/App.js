import { useEffect } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import MenuDetailPage from "./pages/MenuDetailPage";
import PayCheckPage from "./pages/PayCheckPage";
import LastPage from "./pages/LastPage";
import Layout from "./layout/Layout";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}>
            <Route path="main" element={<Layout/>}> {/* topHeader+Outlet+footer */}
              <Route path="menu" element={<MenuPage/>}> {/* menu */}
                
              </Route> 
              <Route path="detail" element={<MenuDetailPage/>}/> {/* menuDetail */}
              <Route path="paycheck" element={<PayCheckPage/>}/>
            </Route>
            <Route path="last" element={<LastPage/>}/>
            <Route path="admin" element={<AdminPage/>}/>
          </Route>
          <Route path="*" element={<Error/>}/>   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import MenuDetailPage from "./pages/MenuDetailPage";
import LastPage from "./pages/LastPage";
import Layout from "./layout/Layout";
import Error from "./pages/Error";
import PayCheckPage from "./pages/Pay/PayCheckPage";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route index element={<HomePage />} />

          <Route path="/" element={<Layout />}>
            <Route path="menu" element={<MenuPage />}/>
            <Route path="detail" element={<MenuDetailPage />} />
            <Route path="paycheck" element={<PayCheckPage />} />
          </Route>

          <Route path="/last" element={<LastPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Error />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

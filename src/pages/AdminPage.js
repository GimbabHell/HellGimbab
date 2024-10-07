import AddMenu from "../components/AdminPage/AddMenu"
import Stat from "../components/AdminPage/Stat"

const AdminPage = () => {


    return(
        <>
        <button onClick = {<AddMenu/>}>메뉴 추가</button>
        <button onClick = {<Stat/>}>매출 통계 확인</button>
        {/* <button onClick = {</>}>영수증 처리</button> */}
        </>
    )


}

export default AdminPage;
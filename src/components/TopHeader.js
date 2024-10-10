import { Link } from "react-router-dom";
import { checkDetail, orderStore } from "../store";
import { FaHouse } from "react-icons/fa6";

// 홈, 언어설정 버튼

const TopHeader = () => {
    const today = new Date();
    const { resetAll } = orderStore();
    const { resetValues } = checkDetail();

    const clickHomeHandler =()=>{
        resetAll();
        resetValues();
    }

    return (
        <header>
            <Link to="/" className="btn-home" onClick={()=>clickHomeHandler()}>
                <FaHouse />
            </Link>
            <h1 className="logo white">
                {/* <Link to="/" > */}
                    gimbab hell
                {/* </Link> */}
            </h1>
            <p className="time">{`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`}</p>
        </header>
    );
};

export default TopHeader;

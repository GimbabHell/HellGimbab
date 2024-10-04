import { Link } from "react-router-dom";

// 홈, 언어설정 버튼
const TopHeader = () => {
    return(
        <header>
            <Link to="/admin">Home</Link>
        </header>
    )
}

export default TopHeader;
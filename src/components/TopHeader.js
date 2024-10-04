import { Link } from "react-router-dom";

// 홈, 언어설정 버튼
const TopHeader = () => {
    return(
        <header>
            <Link to="/">Home</Link>
            <Link to="/admin"><img src="" alt="logo" /></Link>
            <div className="lang">
                <Link to="/">KR</Link>
                <span> / </span>
                <Link to="">EN</Link>
            </div>
        </header>
    )
}

export default TopHeader;
import { Link } from "react-router-dom";

// 홈, 언어설정 버튼

const TopHeader = () => {
    const today = new Date();
    return (
        <header>
            <h1>
                <Link to="/" className="logo white">
                    gimbab hell
                </Link>
            </h1>
            <p className="time">{`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`}</p>
        </header>
    );
};

export default TopHeader;

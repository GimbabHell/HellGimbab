import { useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
    // 현재 위치를 조회할 수 있는 기능
    const location = useLocation();

    return (
        <>
            <footer>
                <button
                    className="creepster btn-call"
                    onClick={() => {
                        alert("소환에 성공하였읍니다. 곧 당신의 사역마가 도착합니다..!?");
                    }}
                >
                    <FaPhone /> Devil Call
                </button>
                {/* 디테일, 페이첵, 라스트 페이지가 아니면 글씨를 두껍게 만들고, 셋 중 하나라도 현재 위치와 같으면 글씨체를 평범하게 돌립니다. */}
                <div>
                    <span className={location.pathname !== "/detail" && location.pathname !== "/paycheck" && location.pathname !== "/last" ? "active" : null}>메뉴선택</span>
                    <span className={location.pathname === "/detail" ? "active" : null}>옵션선택</span>
                    <span className={location.pathname === "/paycheck" ? "active" : null}>카드결제</span>
                    <span className={location.pathname === "/last" ? "active" : null}>메뉴수령</span>
                </div>
            </footer>
        </>
    );
};
export default Footer;

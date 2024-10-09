
import { useLocation } from "react-router-dom"



const Footer =()=>{

    // 현재 위치를 조회할 수 있는 기능
    const location =useLocation();
    console.log(location.pathname);

    return(
        <>
        <div>
            <button onClick={()=>{alert("소환에 성공하였읍니다. 곧 당신의 사역마가 도착합니다..!?")}}>악마소환</button>
            {/* 디테일, 페이첵, 라스트 페이지가 아니면 글씨를 두껍게 만들고, 셋 중 하나라도 현재 위치와 같으면 글씨체를 평범하게 돌립니다. */}
            <span style={{fontWeight :
                location.pathname !=="/detail" &&
                location.pathname !=="/paycheck" &&
                location.pathname !=="/last"? "bold" : "normal"}}>메뉴선택</span>
            <span> → </span>
            <span style={{fontWeight : location.pathname === "/detail"? "bold" : "normal"}}>주문확인</span>
            <span> → </span>
            <span style={{fontWeight : location.pathname === "/paycheck"? "bold" : "normal"}}>카드결제</span>
            <span> → </span>
            <span style={{fontWeight : location.pathname === "/last"? "bold" : "normal"}}>메뉴수령</span>
        </div>
        </>
        
    )
}
export default Footer;
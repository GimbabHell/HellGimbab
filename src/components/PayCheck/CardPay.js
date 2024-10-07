import { useEffect } from "react";
import PointSave from "./PointSave";

const CardPay = ({totalCount}) => {
    // payCheckPage 에서 총 결제금액 받아옴.

    // const Use = () =>{
    //     useEffect = () => {
    //         // alert 3초뒤에 뜨게할꺼임
    //         alert(`카드 정보를 읽고 있습니다... \n 카드를 리터에 읽혀주세요. \n 거래금액 : ${totalCount}`)
    //   }, [3000]}

    return(
        <>
        <h2>카드 결제 안내</h2>
        <h3>결제가 완료될 때까지 카드를 빼지 마세요 !</h3>
        <h3>결제금액 : {totalCount}</h3>
        <h5>
        <ul>
          <li>다음 그림과 같이 카드 리더기에 카드를 꽂아주세요..</li>
          <li>결제가 완료될 때 까지 카드를 빼지 말고 기다려주세요..</li>
          <li>결제가 완료되면 카드를 회수해주세요..</li>
          <li>사용가능한 카드 안내 -- 국내 결제 가능한 신용카드, 체크카드</li>
        </ul>
        </h5>
        {/* <Use/> */}
        <PointSave/>
        

        </>

    )

}
export default CardPay;
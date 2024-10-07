import MemberCheckNumber from "../pages/Admin/MemberCheckNumber"


const PayCheckPage = () => {



    return(
        <>
        <p>포인트 사용 여부 확인</p>
        <button onClick = {<MemberCheckNumber/>}>사용</button>
        <button >사용안함</button>
        {/* 그냥 다음으로 넘어가야하는데 .. */}

        {/* <p>결제 수단 선택</p>
        <button onClick = {}>크레딧</button>
        <button onClick = {}>카카오Pay</button>
        <button onClick = {}>네이버Pay</button> */}
        {/* 결제수단이 alert 느낌으로 띄우고 싶으면 component 로 만들어놔야 한다.. */}

        


        </>
    )



}

export default PayCheckPage;
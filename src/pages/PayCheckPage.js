import MemberCheckNumber from "../components/PayCheck/MemberCheckNumber";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { orderStore, useMemberStore } from "../store";
import CardPay from "../components/PayCheck/CardPay";
import KakaoPay from "../components/PayCheck/KakaoPay";
import NaverPay from "../components/PayCheck/NaverPay";
import PayCheckStyle from "./PayCheck.css";
import { FaCreditCard } from "react-icons/fa6";

const PayCheckPage = () => {
    const [show, setShow] = useState(false);
    const [push, setPush] = useState("");
    const [defa, setDefa] = useState(0);
    const nevi = useNavigate();
    const { totalPrice } = orderStore();
    // const { phoneNumber, getPoints } = useMemberStore();
    // const [search] = useSearchParams();
    // const num = search.get("poiint");
    // const [too, setToo] = useState("");
    // const [testNum, setTestNum] = useState(0);

    const [test, setTest] = useState(false);
    const [test2, setTest2] = useState(false);
    const [test3, setTest3] = useState(false);

    const onClickHandler = () => {
        setShow(true);
    };

    const handleNotUsingPoints = () => {
        setShow(false);
    };

    const onClickHandler2 = () => {
        nevi("/menu");
    };

    const onClickHandler3 = () => {
        console.log(push);
        if (push == 0) {
            return setTest(true);
        } else if (push == 1) {
            return setTest2(true);
        } else if (push == 2) {
            return setTest3(true);
        } else {
            return alert("결제수단을 다시 선택해주세요 !");
        }
    };

    // useEffect(() => {
    //     const nn = () => {
    //         return getPoints(phoneNumber);
    //     };
    //     setTestNum(nn);
    // });

    return (
        <div className="payCheckContainer">
            <form onSubmit={onClickHandler3}>
                <div className="pointUse borderBottom">
                    <p className="txtBold">포인트 사용 여부 확인</p>
                    <div>
                        <div>
                            <input type="radio" name="point" id="yes" onChange={onClickHandler}  required />
                            <label htmlFor="yes" className="btn btn-black">
                                사용
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="point" id="no" onChange={handleNotUsingPoints} />
                            <label htmlFor="no" className="btn btn-gray">
                                사용안함
                            </label>
                        </div>
                    </div>
                </div>
               
                {show ? <MemberCheckNumber setShow={setShow} setDefa={setDefa} /> : null}

                <div className="payMethod borderBottom">
                    <p className="txtBold">결제 수단 선택</p>
                    <div>
                        <div>
                            <input type="radio" name="pay" id="card" onChange={() => setPush(0)} required></input>
                            <label htmlFor="card">
                                <FaCreditCard /> 
                                <p>카드결제</p>
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="pay" id="kakao" onChange={() => setPush(1)}></input>
                            <label htmlFor="kakao"> 
                                <img src="../images/kakaoLogo.svg" alt="kakao" /> 
                                <p>카카오Pay</p> 
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="pay" id="naver" onChange={() => setPush(2)}></input>
                            <label htmlFor="naver"> 
                                <img src="../images/naverLogo.svg" alt="naver" />
                                <p>네이버Pay</p>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="payPricePoint borderBottom">
                    <h3 className="txtBold"> 
                        <span>결제 금액</span> 
                        <span>{totalPrice}원</span>
                    </h3>

                    <h3 className="txtBold">
                        <span>포인트 사용</span>
                        <span>{defa<0?`-${defa}`:defa}원</span>
                    </h3>
                </div>

                <h2 className="totalPrice">
                    <span>총 결제 금액</span>
                    <span>{totalPrice - defa}원</span>
                </h2>


                <div className="btn-wrap">
                    <button className="btn btn-gray" onClick={onClickHandler2}>취소</button>
                    <button className="btn btn-red" type="submit">결제하기</button>
                </div>
                
            </form>
            {test ? <CardPay lastPrice={totalPrice - defa} /> : null}
            {test2 ? <KakaoPay lastPrice={totalPrice - defa} /> : null}
            {test3 ? <NaverPay lastPrice={totalPrice - defa} /> : null}
        </div>
    );
};

export default PayCheckPage;

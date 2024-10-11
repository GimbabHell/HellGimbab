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
    const [show, setShow] = useState(0);
    const [push, setPush] = useState("");
    const [defa, setDefa] = useState(0);
    // const [contents, setContents] = useState("");
    const nevi = useNavigate();
    const { totalPrice } = orderStore();
    const { phoneNumber}= useMemberStore();
    // const { phoneNumber, getPoints } = useMemberStore();
    // const [search] = useSearchParams();
    // const num = search.get("poiint");
    // const [too, setToo] = useState("");
    // const [testNum, setTestNum] = useState(0);
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [subCategoryId, setSubCategoryId] = useState(0);
    const subtractPoints = useMemberStore(state => state.subtractPoints);
    // const [test, setTest] = useState(false);
    
    

    const onClickHandler = () => {
        setSubCategoryId(1);
        setShow(true);
        console.log(subCategoryId, show)
    };

    const handleNotUsingPoints = () => {
        setSubCategoryId(2);
        setShow(false);
    };

    const onClickHandler2 = () => {
        nevi("/menu");
    };

    const onClickHandler3 = (event) => {

        // subtractPoints(phoneNumber, plusPointNumber); 
        event.preventDefault();
        
        if (push === 0) {
            setModalContent(<CardPay lastPrice={totalPrice - defa} />);
            setShowModal(true);
        } else if (push === 1) {
            setModalContent(<KakaoPay lastPrice={totalPrice - defa} />);
            setShowModal(true);
        } else if (push === 2) {
            setModalContent(<NaverPay lastPrice={totalPrice - defa} />);
            setShowModal(true);
        } else {
            alert("결제수단을 다시 선택해주세요 !");
        }
    };


    

    return (
        <div className="payCheckContainer">
            <form onSubmit={onClickHandler3}>
                <div className="pointUse borderBottom">
                    <p className="txtBold">포인트 사용 여부 확인</p>
                    <div>
                        <div>
                            <input type="radio" name="point" id="yes" checked={subCategoryId === 1} onChange={onClickHandler}  required />
                            {console.log(subCategoryId)}
                            <label htmlFor="yes" className="btn btn-black">
                                사용
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="point" id="no" checked={subCategoryId === 2} onChange={handleNotUsingPoints} />
                            <label htmlFor="no" className="btn btn-gray">
                            {console.log(subCategoryId)}
                                사용안함
                            </label>
                        </div>
                    </div>
                </div>
               
                {show ? <MemberCheckNumber setShow={setShow} setDefa={setDefa} setSubCategoryId={setSubCategoryId} /> : null}

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

                {showModal && modalContent}
        </div>
    );
};


export default PayCheckPage;

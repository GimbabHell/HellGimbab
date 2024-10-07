import { useState } from "react";

const LastPage = () => {

    const [satanUrl, setSatanUrl] = useState("");
    setSatanUrl("https://loremflickr.com/320/240/satan")

    return(
        <>
        <img src={satanUrl}/>
        <h1>우리 지옥 김밥 먹어줘서 고맙다!</h1>
        </>
    )
}

export default LastPage;
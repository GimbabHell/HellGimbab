import { useNavigate } from "react-router-dom";



const HomePage = () => {

    const navigate = useNavigate();

    const onClickHandler= ()=>{
        navigate("/menu");
    }

    return(
        <>
            <p>home</p>
            <div>
            <button onClick={onClickHandler}>매장식사</button>
            <button onClick={onClickHandler}>포장</button>
            </div>
        </>
        
    )
}

export default HomePage;


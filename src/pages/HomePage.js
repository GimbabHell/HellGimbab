<<<<<<< Updated upstream
=======
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    const onClickHandler = ()=>{
        navigate(`/menu`)
    }

    return(
        <>
            <h1>home</h1>
            <button onClick={onClickHandler}>메뉴</button>
        </>
    )
}

export default HomePage;
>>>>>>> Stashed changes

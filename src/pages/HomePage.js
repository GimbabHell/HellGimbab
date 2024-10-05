import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



const HomePage = () => {
    const [hello,setHello] = useState("");

    const navigate = useNavigate();

    const onClickHandler= ()=>{
        navigate("/menu");
    }

    const bringAPI =async()=>{
        
        return(
            fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
        ).then(response=>response.json)
        .then(data=>setHello(data.insult))
        // const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
        // const data = await response.json();
        // setHello(data.insult);
    }

    useEffect(()=>{
        bringAPI(); 
    },[])
       

    return(
        <>
            <p>home</p>
            <div>
            <h1>{hello}</h1>
            <button onClick={onClickHandler}>매장식사</button>
            <button onClick={onClickHandler}>포장</button>
            </div>
        </>
        
    )
}

export default HomePage;


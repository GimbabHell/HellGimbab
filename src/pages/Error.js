import ErorrStyle from "./Error.css";

const Error = () => {
    return(
        <div className="container">
            <h1 className="title">ERROR 404</h1>
            <video className="scared-video" autoPlay loop muted>
                <source src="../video/iDontKnowIamScared.mp4" type="video/mp4"></source>
            </video>
            <p className="scared-text">어..? 이거 뭐야 무서워..</p>
        </div>
        
    )
}

export default Error;
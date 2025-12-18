import { useNavigate } from "react-router";

function Slider( {movie} ){
    const navigate = useNavigate()
    function navitm(){
        navigate(`/movie/${movie.imdbID}`)
    }
    return(
            <div className="t-index">
                    <div className="t-flex" onClick={navitm}>
                        <img src={movie.Poster} alt="" loading="lazy" />
                        <div className="t-desc">
                            <div className="name">{movie.Title}</div>
                            {/* <div className="release">{movie.Year}</div> */}
                        </div>
                    </div>
                    
              
            </div>
    )
}

export default Slider;


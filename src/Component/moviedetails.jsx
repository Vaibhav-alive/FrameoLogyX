import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./homethumb";

function Moviedetail() {
    const [vid, setVid] = useState();
    const [title, setTitle] = useState();
    const[year, setYear] = useState()
    const { id } = useParams();
    const [plot, setPlot] = useState([])
    const [genre, setGenrne] = useState();
    const name = `${title} + ${year} + official trailer`;
    const [movies, setMovies] = useState(null);

    const apiKey = "AIzaSyCAuV4sZ0os5P-t4HRCOabpi0pviPUY5cA";
    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=1e399cbd&i=${id}`).then((data) => {
            return data.json();
        }).then((data) => {
            setMovies(data);
            console.log(data);
            const genrearray = data.Genre.split(",").map((g) => g.trim());
            setGenrne(genrearray);
            setTitle(data.Title)
            setYear(data.Year)
        });
        fetch(`https://www.omdbapi.com/?apikey=1e399cbd&i=${id}&plot=full`).then((plot) => {
            return plot.json();
        }).then((plot) => {
            setPlot(plot)
        })
        
    }, [id]);
    useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(name)}&type=video&maxResults=1&key=${apiKey}`).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res);
                const videoId = res.items[0].id.videoId;
                
                setVid(`https://www.youtube.com/embed/${videoId}`);
            });
    },[title])

    if (!movies) return <div>
        <div className="blur-opacity">
            Loading....
        </div>
    </div>;
    if (!vid) return  <div>
        <div className="blur-opacity">
            Loading....
        </div>
    </div>;
    return (
        <>

           <div className="nav">
            
                <Home />
            
           </div>
              
            <div className="movie-details">

                <div className="movie-poster">
                    <img src={movies.Poster} alt="" />
                    <div className="rating">{movies.imdbRating}/10</div>
                </div>
                <div className="details">
                    <div className="d-header">
                        <h1> {movies.Title} </h1>
                        <div className="meta">
                            <span>{movies.Year}</span>
                            <span>{movies.Runtime}</span>
                            <span>{movies.Rated}</span>
                        </div>
                        <div className="genre">
                            {genre.map((gen) => (
                                <span>{gen}</span>
                            ))}
                        </div>
                    </div>
                    <div className="d-plot">
                        <p>{plot.Plot}</p>
                    </div>
                    <div className="info">
                        <div className="stat-item">
                            <div className="stat-label">Director</div>
                            <div className="stat-value">{movies.Director}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">Box Office </div>
                            <div className="stat-value">{movies.BoxOffice} </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">Author</div>
                            <div className="stat-value">{movies.Writer}</div>

                        </div>
                        <div className="stat-item">
                            <div className="stat-label">Country</div>
                            <div className="stat-value">{movies.Country}</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">Runtime</div>
                            <div className="stat-value">{movies.Runtime}</div>
                        </div>
                    </div>
                    
                    <div className="btns">
                        <button className="watch">Watch Trailer Below!!!</button>
                    </div>
                </div>

            </div>
            <div className="vid">
                <iframe src={vid} frameborder="0"></iframe>
            </div>
        </>
    );
}

export default Moviedetail;

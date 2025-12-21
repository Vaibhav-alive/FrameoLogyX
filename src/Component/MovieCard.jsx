import React, { useEffect, useState, useRef } from "react";
import Slider from "./slider";
import { Link } from "react-router";

const OMDB_KEY = "1e399cbd";

function MovieCard({ gid }) {
  const clientID =
    "70c3cc51cdd9d1e452812982f939f35d15aeec8f02d4e9bbd0a512cbe6a2363f";
  const [ids, setIds] = useState([]);
  const [details, setDetails] = useState([]);
  const [cache, setCache] = useState({});

  useEffect(() => {
    fetch(`https://api.trakt.tv/movies/popular?genres=${gid}&limit=8`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": clientID,
      },
    })
      .then((res) => res.json())
      .then((data) => setIds(data))
      .catch((err) => console.log("Trakt error:", err));
  }, [gid]);

  const [ani,SetAni] = useState(false)
  useEffect(() => {
    if (ids.length > 0) {
      Promise.all(
        ids.map(async (m) => {
          const imdbID = m.ids.imdb;

          if (cache[imdbID]) return cache[imdbID];

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}`
          );
          const data = await res.json();

          setCache((prev) => ({ ...prev, [imdbID]: data }));
          return data;
        })
      ).then((allDetails) => {
        const unique = allDetails.filter(
          (v, i, a) => v.imdbID && a.findIndex((t) => t.imdbID === v.imdbID) === i
        );
        setDetails(unique);
      });
    }
  }, [ids]);
  if (!details) return <div>
    <div className="blur-opacity">

    </div>
  </div>

  const slider = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          
        }
        else{
          entry.target.classList.remove('in-view')
          
        }
      })
    },
      {
        threshold: 0.5
      })
    slider.current.forEach(entry=>{
      if (entry){
        observer.observe(entry)
      }
    })
    return () => observer.disconnect()
  }, [cache])

  if (!cache) return <div></div>
  return (
    <div className="flex-card card">
      {details.map((item, index) => ( 
        <Link ref={el => (slider.current[index] = el)} className="idk" to={`/movie/${item.imdbID}`}  >
          <Slider movie={item} />
        </Link>
      ))}
    </div>
  );
}

export default MovieCard;

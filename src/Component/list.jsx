import React from 'react'
import { useRef, useEffect } from 'react'
import Genrelist from '../constant/genrelist'
import MovieCard from './MovieCard'
function list() {
  const card = useRef([])
  useEffect(() => {

  }, [])

  return (

    <div className="list" >
      {Genrelist.genere.map((item, index) => index <= 4 && (
        <section key={item.id} ref={(el) =>{if (el)card.current[index] = el }}>
          <h2>{item.name}</h2>
          <div className="line"></div>
          <MovieCard gid={item.id} />
        </section>
      ))}

    </div>
  )
}

export default list
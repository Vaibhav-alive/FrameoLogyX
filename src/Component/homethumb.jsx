import Icon from '../assets/movie.jpg'
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import List from "./list";
import { section } from "framer-motion/client";

function Home() {
  const idk = useRef();
  let [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [scroll, setScroll] = useState(false)

  const change = () => {
    setScroll(!scroll)
  }
  function handleSearch() {
    setLoader(true)
    const value = idk.current.value;
    if (value !== '') {
      navigate(`/movie/search/${value}`);
    }

  }

  function handleEsc() {
    navigate('/')
  }

  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setScroll(true)
      }
      else {
        setScroll(false)
      }
    }
    window.addEventListener('scroll', handlescroll)
    return () => window.removeEventListener('scroll', handlescroll)
  }, [])


  return (
    <>
      <section className="wrap">


        <section className={`navbar ${scroll ? 'scrolled' : 'unscroll'}`}>


          <div className="banner" onClick={handleEsc}>
            <div className="icon">
              <img src={Icon} alt="" loading="Lazy" />
            </div>
            <p className="heading">FrameologyX</p>
          </div>

          <div className="search">
            <input type="text" ref={idk} placeholder="Made by Vaibhav, Search a movie here..." onClick={change} />
            <button onClick={handleSearch}  >
              <p>Search</p>
            </button>
          </div>

        </section>
      </section>
      {location.pathname === "/" && (
        <section className="suggestion">
          <List />
        </section>
      )}



    </>
  );
}
export default Home;
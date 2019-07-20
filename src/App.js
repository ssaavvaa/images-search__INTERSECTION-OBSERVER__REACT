import React, { useEffect , useState } from 'react';
import './App.css';
import { InView } from 'react-intersection-observer'
import { Debounce } from 'react-throttle';
import Masonry from 'react-masonry-component';

const url = "https://pixabay.com/api/";
const key = "?key=13085519-d16216777a86c832ae99bc2be";





const App = () => {

const [images , setImages ] = useState([])
const [perPage , setPerPage] = useState(10)
const [ query , setQuery ] = useState("")


useEffect(() => {
fetch(url + key + `&q=${query}&per_page=${perPage}`)
   .then(response => response.json())
   .then(res => setImages(res))
},[perPage , query])


const addImages = () => {
  setPerPage(perPage + 5)
}
const setQuerySearch = e => {
  setQuery(e.target.value)
  setPerPage(30)
}

const { hits } = images;

  return (

  <div className="App">
    <h1>Search for images</h1>
    <Debounce time="400" handler="onChange">
        <input style={{ padding:"10px 30px" }} placeholder="search query" onChange={setQuerySearch} />
    </Debounce>
             <Masonry
                className={"mason"}
                elementType={'ul'}
            >
              {hits !== undefined && images.hits.map((image,idx) => 
               <InView threshold={0}  key = {idx} triggerOnce={true}  as="div" onChange={inView => inView && idx === perPage - 1?addImages():false}>
                  <li style={{listStyle:"none"}} >
                     <img style={{ width:300,padding:3 }} alt={ image.tags[0] } src={ image.largeImageURL } />
                  </li>
               </InView>
            )}
          </Masonry>
      {hits !== undefined && !hits.length && <h3>nothing was found</h3>}
  </div>
  );
}

export default App;

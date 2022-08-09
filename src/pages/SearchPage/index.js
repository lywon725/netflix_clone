import axios from "../../api/axios";
import React, { useEffect, useState } from 'react';
import { useLocation, } from 'react-router-dom'
import "./SearchPage.css";


export default function SearchPage() {

    const [searchResult, setsearchResult] = useState([]);

    
    const useQuery =()=>{
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    const searchTerm = query.get("q");  //q에 있는걸 가져온다. 
    // console.log(searchTerm)

    useEffect(() => {
        
        if(searchTerm){
            fetchSearchMovie(searchTerm);
        }
    }, [searchTerm]);

    const fetchSearchMovie = async (searchTerm) =>{
        try{
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            )
            setsearchResult(request.data.results);
        }catch(error){
            console.log("ERROR",error);

        }
    }

    const renderSearchResults = () =>{
        return searchResult.length > 0 ? (
            <section className="search-container">
                {searchResult.map((movie)=>{
                    if(movie.backdrop_path !== null && movie.media_type !== "person"){
                        const movieImageUrl = 
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return(
                            <div className="movie">
                                <div className="movie__column-poster">
                                    <img src={movieImageUrl} alt="movie" className="movie__poster">
                                    </img>
                                </div>
                            </div>
                        )
                    }
                })}

            </section>
        ) : (
        <section className="no-results">
            <div className="no-results__text">
                <p>
                    찾고자하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.
                </p>
            </div>

        </section>
        );
    };

    return renderSearchResults();
}
import React, {useEffect, useState} from "react";
import {  withRouter } from "react-router-dom";
import styled from "styled-components";
import {moviesApi, tvApi} from "../api";
import Loader from "./Loader";

const Context = styled.div`
  padding: 3px 6px;  
  margin: 2px 0;
  font-size: 40px;
  color: black;
  background-color: white;
  opacity: 0.7;
      justify-content: center;   

`;

const Container = styled.div`
    padding-top: 20px;
`;



function Country({location, match, history}) {

    const useCountry = () => {

        const [country, setCountry] = useState([]);
        const [loading, setLoading] = useState(true);
        const [isMovie, setIsMovie] = useState(location.pathname.includes("/movie/"));
        const [error, setError] = useState(null);

        const getData = async () => {

            const {params: { id } } = match;
            const parseId = parseInt(id);

            const result = null;


            try {

                if (isMovie){

                    const { data: result } = await moviesApi.movieDetail(parseId);
                    setCountry(result.production_countries);

                }else{
                    const { data: result } = await tvApi.showDetail(parseId);
                    setCountry(result.origin_country);
                }





            } catch (e) {
                setError("Can't find movie/show country");
            } finally {
                setLoading(false)
            }

        }

        useEffect(() => {
            getData();
        },[]);

        return {country, loading, isMovie, error};
    };

    const {country, loading, isMovie, error} = useCountry();
    return loading
        ? ( <Loader />)
        : (<Container>
                {country &&
                country.map((country, index) =>
                    <Context key={index}>{isMovie ? ` - ${country.name}` : ` - ${country}`}</Context>)}
        </Container>

    );



}


export default withRouter(Country);



import React, {useEffect, useState} from "react";
import {  withRouter } from "react-router-dom";
import styled from "styled-components";
import {moviesApi, tvApi} from "../api";
import Loader from "./Loader";
import Section from "./Section";


const Context = styled.div`
  padding: 3px 3px;  
  margin: 2px 0;
  font-size: 40px;
  color: black;
  background-color: white;
  opacity: 0.7;
      justify-content: center;   

`;

const Image = styled.div`
    background-image: url(${props => props.bgUrl});
    width: 150px;
    height: 250px;
    background-size: cover;
    border-radius: 1px;
    background-position: center center;
    margin-right: 30px;
`;

const Title = styled.div`
    font-size: 30px;
    text-align: center center;
`;



function Seasons({location, match, history}) {

    const useSeasons = () => {

        const [seasons, setSeasons] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        const getData = async () => {

            const {params: { id } } = match;
            const parseId = parseInt(id);

            const result = null;

            try {
                 const { data: result } = await tvApi.showDetail(parseId);
                 setSeasons(result.seasons);

            } catch (e) {
                setError("Can't find show season");
            } finally {
                setLoading(false)
            }

        }

        useEffect(() => {
            getData();
        },[]);

        return {seasons, loading, error};
    };

    const {seasons, loading, error} = useSeasons();
    return loading
        ? ( <Loader />)
        : (seasons &&
            <Section title="">
                {seasons.map((seasons, index) => (
                    <div key={index}>
                        <Image bgUrl={seasons.poster_path
                            ? `https://image.tmdb.org/t/p/w300${seasons.poster_path}`
                            : require("./assets/noPosterSmall.png")}
                        />
                        <Title>{seasons.name}</Title>
                    </div>
                ))}
            </Section>)





}


export default withRouter(Seasons);


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


function Company({location, match, history}) {

    const useCompany = () => {

        const [company, setCompany] = useState([]);
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
                    setCompany(result.production_companies);

                }else{
                    const { data: result } = await tvApi.showDetail(parseId);
                    setCompany(result.production_companies);
                }


            } catch (e) {
                setError("Can't find movie/show company");
            } finally {
                setLoading(false)
            }

        }

        useEffect(() => {
            getData();
        },[]);

        return {company, loading, isMovie, error};
    };

    const {company, loading, isMovie, error} = useCompany();
    return loading
        ? ( <Loader />)
        : (<Container>
                {company &&
                company.map((company, index) =>
                    <Context key={index}>{isMovie ? ` - ${company.name}` : ` - ${company.name}`}</Context>)}
        </Container>
        );



}

export default withRouter(Company);



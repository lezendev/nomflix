import React from "react";
import {Route, Link, withRouter, Switch, HashRouter as Router} from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Company from "../../Components/Company";
import Country from "../../Components/Country";
import Seasons from "../../Components/Seasons";
import Helmet from "react-helmet";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;    
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display : flex;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;    
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
     
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span`

`;

const Divider = styled.span`
    margin: 0 10px
`;

const Overview = styled.p`
    margin : 20px 0 ;
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
`;

const Icon = styled.a`
    font-size: 16px;
    background-color: #f5c518;
    font-weight: 600;
    color: black;
    border-radius: 4px;
    padding: 2px 2px
`


const SeasonTitle = styled.h1`
   font-size: 30px;
`;

const SubTitle = styled.div`
    text-align: center;
`;

const AddList = styled.ul`        
    display:flex;
    background-color: white;
    opacity: 0.7;
`;

const AddItem = styled.li`

    text-align: center;
    margin-right: 50px;
`;

const AddLink = styled(Link)`
    font-size: 30px;
    font-weight: 600;
    color: black;
    padding: 5px;

    display: flex;
    align-items: center;
    justify-content: center;   
`;

const DetailPresenter = ({result, loading, imdb_id, isMovie, error}) =>
    loading ? (
        <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
            <Loader/>
        </>

        ) : (
            <>
                <Helmet>
                    <title>{result.original_title
                        ? `${result.original_title} | Nomflix`
                        : `${result.original_name} | Nomflix`}</title>
                </Helmet>

                <Container>
                    <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}/>
                    <Content>
                        <Cover bgImage={result.poster_path
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require("/src/assets/noPosterSmall.png")}/>
                        <Data>
                            <Title>{result.original_title
                                ? result.original_title
                                : result.original_name}</Title>
                            <ItemContainer>
                                <Item>{result.release_date
                                    ? result.release_date.substring(0,4)
                                    : result.first_air_date.substring(0,4)}
                                </Item>
                                <Divider>●</Divider>
                                <Item>{result.runtime
                                    ? result.runtime
                                    : result.episode_run_time} min
                                </Item>
                                <Divider>●</Divider>
                                <Item>
                                    {result.genres &&
                                    result.genres.map((genre, index) =>
                                        index === result.genres.length -1
                                            ? genre.name
                                            : `${genre.name} / `
                                    )}
                                </Item>
                                <Divider>●</Divider>
                                <Item>
                                    <Icon href={`https://www.imdb.com/title/${imdb_id}`}>IMDB</Icon>
                                </Item>
                                <Overview>{result.overview}</Overview>
                                {/*=================================================================*/}
                                {isMovie
                                    ?  <AddList>
                                        <AddItem>
                                            <AddLink to={`/movie/${result.id}/company`}>Company</AddLink>
                                        </AddItem>
                                        <AddItem>
                                            <AddLink to={`/movie/${result.id}/country`}>Country</AddLink>
                                        </AddItem>
                                    </AddList>



                                    :  <AddList>
                                        <AddItem>
                                            <AddLink to={`/show/${result.id}/company`} result={result}>Company</AddLink>
                                        </AddItem>
                                        <AddItem>
                                            <AddLink to={`/show/${result.id}/country`}>Country</AddLink>
                                        </AddItem>
                                        <AddItem>
                                            <AddLink to={`/show/${result.id}/seasons`}>Seasons</AddLink>
                                        </AddItem>
                                    </AddList>
                                }


                                <Switch>
                                    <Route path="/movie/:id/company" component={Company}/>
                                    <Route path="/movie/:id/country" component= {Country}/>
                                    <Route path="/show/:id/company" component={Company}/>
                                    <Route path="/show/:id/country" component= {Country}/>
                                    <Route path="/show/:id/seasons" component= {Seasons}/>
                                </Switch>

                            </ItemContainer>
                        </Data>
                    </Content>
                </Container>

            </>

    );



    DetailPresenter.propTypes = {
        result: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string
    }



export default DetailPresenter;

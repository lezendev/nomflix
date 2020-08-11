import React from "react";
import DetailPresenter from "./DetailPresenter";
import {moviesApi, tvApi} from "../../api";

export default class extends React.Component{
    constructor(props){
        super(props);

        const { location : {pathname}} = props;

        this.state = {
            result: null,
            loading: true,
            imdb_id: null,
            error: null,
            isMovie: pathname.includes("/movie/")
        };

}


    async componentDidMount() {

        const {
            match : {
                params : { id }
            },
            history: { push },

        } = this.props;

        const { isMovie } = this.state;
        const parseId = parseInt(id);

        if(isNaN(parseId)){
           return push("/");
        }

        let result = null;
        let imdb_id = null;

        try {

            if(isMovie){
                ({data : result} = await moviesApi.movieDetail(parseId))
                ({data : {imdb_id}} = await moviesApi.externalId(parseId))
            }else{
                ({data : result} = await tvApi.showDetail(parseId))
                ({data : {imdb_id}} = await tvApi.externalId(parseId))
            }

        }catch (e) {
            this.setState({error : "Can't find anything."})
        }finally {
            this.setState({loading : false, result, imdb_id});
        }




    }

    render() {
        const { result, loading, imdb_id, isMovie, error} = this.state;
        return <DetailPresenter
            result={result}
            loading={loading}
            isMovie={isMovie}
            imdb_id={imdb_id}
            error={error}
        />;
    }
}
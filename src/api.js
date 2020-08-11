import axios from "axios";

const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    params:{
        "api_key": "18362c1149ea0f8a3fc8ac0db5e4fb01",
        "language": "en-US"
    }
});

/* /tv/~~ 로 시작하면 절대경로라서 api 주소를 아예 덮어씌워버림. 꼭 /를 빼고 할 것. */



export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing", {
        params:{
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    }),
    upcoming: () => api.get("movie/upcoming", {
        params:{
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    }),
    popular: () => api.get("movie/popular", {
        params:{
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    }),
    movieDetail: (id) => api.get(`movie/${id}`, {
        params: {
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US",
            append_to_response: "videos"
        }
    }),
    search: term => api.get("search/movie", {
        params: {
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US",
            query: encodeURIComponent(term)
        }
    }),
    externalId: (id) => api.get(`movie/${id}/external_ids`, {
        params: {
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    })
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated", {
        params:{
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    }),
    popular: () => api.get("tv/popular", {
        params:{
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    }),
    airingToday: () => api.get("tv/airing_today", {
        params:{
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    }),
    showDetail: (id) => api.get(`tv/${id}`, {
        params: {
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US",
            append_to_response: "videos"
        }
    }),
    search: term => api.get("search/tv", {
        params: {
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US",
            query: encodeURIComponent(term)
        }
    }),
    externalId: (id) => api.get(`tv/${id}/external_ids`, {
        params: {
            api_key: "18362c1149ea0f8a3fc8ac0db5e4fb01",
            language: "en-US"
        }
    })
};
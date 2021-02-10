import {
    POSTS_LOADING_FAILURE,
    POSTS_LOADING_REQUEST,
    POSTS_LOADING_SUCCESS
} from "../types";

const initialState = {
    isAuthenticated: null,
    posts: [],
    postDetail: "",
    postCount: "",
    loading: false,
    error: "",
    creatorId: "",
    categoryFindResult: "",
    title: "",
    searchBy: "",
    searchResult: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POSTS_LOADING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case POSTS_LOADING_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],//리스트 시간적 순서가 최신으로함
                loading: false,  //불러온다음
            }
        case POSTS_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            }

        default:
            return state;
    };
}

import { ThunkAction } from 'redux-thunk';
import { postsAPI } from '../../api/api';
import { PostsType } from '../../types/types';
import { AppStateType, InferActionsTypes } from '../store';


type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>


let initialState = {
   isLoading: false,
   posts: [] as Array<PostsType>,
   sortedPosts: [] as Array<PostsType>,
   error: '',
   limit: 3,
   name: ''
};

const postsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
   switch (action.type) {
      case 'IS_LOADING':
         return {
            ...state, isLoading: action.payload
         };
      case 'SET_ERROR':
         return {
            ...state, error: action.payload
         };
      case 'SET_SORTED_POSTS':
         return {
            ...state,
            sortedPosts: action.payload.posts.filter((p: PostsType) => p.userId === action.payload.id).slice(0, action.payload.limit),
            name: action.payload.name
         };
      case 'SET_POSTS':
         return {
            ...state,
            posts: action.payload,
         };
      default:
         return state;
   }
};

export const actions = {
   setIsLoading: (payload: boolean) => ({ type: 'IS_LOADING', payload } as const),
   setError: (payload: string) => ({ type: 'SET_ERROR', payload } as const),
   setPosts: (payload: Array<PostsType>) => ({ type: 'SET_POSTS', payload } as const),
   setSortedPosts: (posts: Array<PostsType>, limit: number, id: number, name: string) =>
      ({ type: 'SET_SORTED_POSTS', payload: { posts, limit, id, name } } as const),
}


export const requestPosts = (limit: number, id: number, name: string): ThunkType => async (dispatch) => {
   try {
      dispatch(actions.setIsLoading(true))
      let response = await postsAPI.getPosts()
      dispatch(actions.setPosts(response.data))
      dispatch(actions.setSortedPosts(response.data, limit, id, name))
      dispatch(actions.setIsLoading(false))
   } catch (error: any) {
      dispatch(actions.setIsLoading(false))
      dispatch(actions.setError(error.message))
   }
};




export default postsReducer;
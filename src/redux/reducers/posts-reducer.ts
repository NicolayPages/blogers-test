import { ThunkAction } from 'redux-thunk';
import { postsAPI } from '../../api/api';
import { PostsType } from '../../types/types';
import { AppStateType, InferActionsTypes } from '../store';
import { showError } from './errors-reducer';


type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>


let initialState = {
   isLoading: false,
   posts: [] as Array<PostsType>,
   limit: 3,
   name: ''
};

const postsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
   switch (action.type) {
      case 'IS_LOADING':
         return {
            ...state, isLoading: action.payload.isLoading
         };
      case 'SET_POSTS':
         return {
            ...state,
            posts: action.payload.posts,
         };
      case 'SET_NAME':
         return {
            ...state,
            name: action.payload.name,
         };
      default:
         return state;
   }
};

export const actions = {
   setIsLoading: (isLoading: boolean) => ({ type: 'IS_LOADING', payload: { isLoading } } as const),
   setPosts: (posts: Array<PostsType>) => ({ type: 'SET_POSTS', payload: { posts } } as const),
   setName: (name: string) => ({ type: 'SET_NAME', payload: { name } } as const),
}


export const requestPosts = (limit: number, id: number, name: string): ThunkType => async (dispatch) => {
   try {
      dispatch(actions.setIsLoading(true))
      let response = await postsAPI.getPosts(id, limit)
      if (response.status === 200) {
         dispatch(actions.setPosts(response.data))
         dispatch(actions.setName(name))
         dispatch(actions.setIsLoading(false))
      } else {
         dispatch(actions.setIsLoading(false))
         dispatch(showError(response.statusText))
      }
   } catch (error: any) {
      dispatch(actions.setIsLoading(false))
      dispatch(showError(error.message))
   }
};




export default postsReducer;
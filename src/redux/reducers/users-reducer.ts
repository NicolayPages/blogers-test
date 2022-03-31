import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../../api/api';
import { UsersType } from '../../types/types';
import { AppStateType, InferActionsTypes } from '../store';
import { showError } from './errors-reducer';


type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>


let initialState = {
   isLoading: false,
   users: [] as Array<UsersType>,
   isFollowing: [] as Array<number>,
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
   switch (action.type) {
      case 'IS_LOADING':
         return {
            ...state, isLoading: action.payload.isLoading
         };
      case 'SET_USERS':
         return {
            ...state, users: action.payload.users
         };
      case 'IS_FOLLOWING':
         return {
            ...state,
            isFollowing: action.payload.isFollowing
               ? [...state.isFollowing, action.payload.userId]
               : state.isFollowing.filter((id: number) => id != action.payload.userId)
         };
      default:
         return state;
   };
};

export const actions = {
   setIsLoading: (isLoading: boolean) => ({ type: 'IS_LOADING', payload: { isLoading } } as const),
   setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', payload: { users } } as const),
   toggleIsFollowing: (isFollowing: boolean, userId: number) => ({ type: 'IS_FOLLOWING', payload: { isFollowing, userId } } as const),
}



export const requestUsers = (): ThunkType => async (dispatch) => {
   try {
      dispatch(actions.setIsLoading(true))
      let response = await usersAPI.getUsers()
      if (response.status === 200) {
         dispatch(actions.setUsers(response.data))
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



export default usersReducer;
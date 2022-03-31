import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../../api/api';
import { AvatarsType, UsersType } from '../../types/types';
import { AppStateType, InferActionsTypes } from '../store';


type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>


let initialState = {
   isLoading: false,
   users: [] as Array<UsersType>,
   error: '',
   isFollowing: [] as Array<number>,
   avatars: [] as Array<AvatarsType>
};

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
   switch (action.type) {
      case 'IS_LOADING':
         return {
            ...state, isLoading: action.payload.isLoading
         };
      case 'SET_ERROR':
         return {
            ...state, error: action.payload.error
         };
      case 'SET_USERS':
         return {
            ...state, users: action.payload.users
         };
      case 'SET_AVATARS':
         return {
            ...state, avatars: action.payload.avatars
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
   setError: (error: string) => ({ type: 'SET_ERROR', payload: { error } } as const),
   setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', payload: { users } } as const),
   toggleIsFollowing: (isFollowing: boolean, userId: number) => ({ type: 'IS_FOLLOWING', payload: { isFollowing, userId } } as const),
   setAvatars: (avatars: Array<AvatarsType>) => ({ type: 'SET_AVATARS', payload: { avatars } } as const),
}


const renderAvatars = () => {
   let avatars = []
   for (let index = 0; index < 10; index++) {
      let random = Math.floor(Math.random() * (50 - 1)) + 1
      avatars.push({
         address: `https://i.pravatar.cc/300?img=${random}`
      })
   }
   return avatars
}

export const requestUsers = (): ThunkType => async (dispatch) => {
   try {
      dispatch(actions.setIsLoading(true))
      let response = await usersAPI.getUsers()
      dispatch(actions.setUsers(response.data))
      let avatars = renderAvatars()
      dispatch(actions.setAvatars(avatars))
      dispatch(actions.setIsLoading(false))
   } catch (error: any) {
      dispatch(actions.setIsLoading(false))
      dispatch(actions.setError(error.message))
   }
};



export default usersReducer;
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "../store";


type initialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>

let initialState = {
   errorMessage: null as string | null,
   errorsMode: false,
};



const errorsReducer = (state = initialState, action: ActionTypes): initialStateType => {
   switch (action.type) {
      case "ON_MODE":
         return {
            ...state,
            errorsMode: true,
            errorMessage: action.errorMessage,
         };
      case "OFF_MODE":
         return {
            ...state,
            errorsMode: false,
            errorMessage: null,
         };
      default:
         return state;
   }
};


export const actions = {
   activateMode: (errorMessage: string | null) => ({ type: 'ON_MODE', errorMessage } as const),
   deactivateMode: () => ({ type: 'OFF_MODE' } as const)
}



type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const showError = (errorMessage: string | null): ThunkType => (dispatch) => {
   dispatch(actions.activateMode(errorMessage));
};

export default errorsReducer;
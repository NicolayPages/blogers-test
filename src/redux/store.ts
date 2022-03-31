import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import errorsReducer from "./reducers/errors-reducer";
import postsReducer from "./reducers/posts-reducer";
import usersReducer from "./reducers/users-reducer";

const rootReducer = combineReducers({
   users: usersReducer,
   posts: postsReducer,
   errors: errorsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
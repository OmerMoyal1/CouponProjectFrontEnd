import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserDetailsModel from "../Models/UserDetailsModel";
import { UserModel } from "../Models/UserModel";
//1.Tokens we Store
export class AuthState {
  public token!: string;
  public user = new UserDetailsModel("GUEST", "", "");
}
//2.Action Types
export enum AuthActionType {
  Login,
  Register,
  Logout,
}
//3.Action interface with action type and payload
export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

//4.Action creators: functions to create Actions

export function loginAction(token: string) {
  return { type: AuthActionType.Login, payload: token };
}
export function registerAction(token: string) {
  return { type: AuthActionType.Register, payload: token };
}
export function logoutAction() {
  return { type: AuthActionType.Logout };
}

export function reducer(currentState = new AuthState(), action: AuthAction) {
  const newState = { ...currentState };
  switch (action.type) {
    case AuthActionType.Login:
    case AuthActionType.Register:
      newState.token = action.payload;
      newState.user = jwtDecode(newState.token);
      break;
    case AuthActionType.Logout:
      newState.token = "";
      newState.user = new UserDetailsModel("GUEST", "", "");
      break;
  }
  return newState;
}

export const authStore = createStore(reducer);

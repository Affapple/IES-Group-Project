import { createContext, Dispatch, SetStateAction } from "react";

export interface IUserData {
  role: string;
}
export interface IUserContext {
  currentUser: IUserData;
  setCurrentUser: Dispatch<SetStateAction<IUserData>> | undefined;
}
export const UserContext = createContext<IUserContext>({
  currentUser: {} as IUserData,
  setCurrentUser: undefined,
});

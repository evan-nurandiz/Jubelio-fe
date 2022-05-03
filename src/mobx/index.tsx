import React from "react";
import { AuthStore } from "./store/AuthStore";
import { ProductStore } from "./store/ProductStore";

type RootStateContextValue = {
    authStore: AuthStore
    productStore: ProductStore
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue)

const store = {
    authStore: new AuthStore(),
    productStore: new ProductStore()
}

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    return(
        <RootStateContext.Provider value={store}>
            {children}
        </RootStateContext.Provider>
    )
}

export const useRootStore = () => React.useContext(RootStateContext)
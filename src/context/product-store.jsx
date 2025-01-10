import { createContext, useState } from 'react'

const INITIAL_VALUE = {
    counter: false,
    setCounter: () => {}
}

export const StoreContext = createContext(INITIAL_VALUE);

export function StoreProvider({ children }) {
    const [ counter, setCounter ] = useState(INITIAL_VALUE.counter)
    return (
        <StoreContext.Provider value={{ counter, setCounter }} >
            {children}
        </StoreContext.Provider>
    )
}
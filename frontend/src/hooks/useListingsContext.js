import { ListingsContext } from "../context/ListingContext";
import { useContext } from "react";

export const useListingsContext = () => {
    const context = useContext(ListingsContext)

    if (!context) {
        throw Error('useListingsContext must be used inside a ListingsContextProvider')
    }

    return context
}
import NftContext from "@/contexts/NftContext"
import { useContext } from "react"

export default function SearchBar(){
    const {searchText, setSearchText} = useContext(NftContext)
    return ( 
        <div className="mb-10">
            <input type="text" className="text-gray-700" placeholder="Search" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} />
        </div>
    )
}
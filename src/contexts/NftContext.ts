// import context 
import { createContext } from 'react';

// create context
const NftContext = createContext({
    searchText: '',
    setSearchText: (search: string) => {}
});

export default NftContext;
import {useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {getNftCollections} from '@/client-api/nft-api';
import {Inter} from 'next/font/google';

import SearchBar from '@/components/SearchBar';
import NftGrid from '@/components/NftGrid';
import NftContext from '@/contexts/NftContext';
import NftItemResponse from '@/data/NftItemResponse.type';
import toast, {Toaster} from 'react-hot-toast';
const inter = Inter({subsets: ['latin']});

const MAX_RETRY_REQUESTS = 3;
export default function Home(props: any) {
  const [searchText, setSearchText] = useState('');

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} =
    useInfiniteQuery(
      ['nfts'],
      ({pageParam = 1}) => getNftCollections(pageParam),
      {
        staleTime: 1000 * 60 * 60 * 24,
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.nextCursor) {
            return pages.length + 1;
          }
          return undefined;
        },
        retry: (failureCount, error) => {
          if (failureCount >= MAX_RETRY_REQUESTS) {
            toast.error(
              'There was an error fetching the data, please try again if the problem persists contact the administrator.',
            );
            return false;
          }
          return true;
        },
      },
    );

  const nftsReduce = !searchText
    ? data?.pages.reduce<NftItemResponse[]>(
        (result, page) => result.concat(page.results),
        [],
      )
    : data?.pages.reduce<NftItemResponse[]>(
        (result, page) =>
          result.concat(
            page.results.filter((nft: NftItemResponse) =>
              nft.title.toLowerCase().includes(searchText.toLowerCase()),
            ),
          ),
        [],
      );

  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}>
      <NftContext.Provider
        value={{
          searchText,
          setSearchText,
        }}>
        <Toaster position="top-right" />
        <SearchBar />
        <NftGrid
          items={nftsReduce || []}
          isFetching={isFetchingNextPage}
          fetchItems={fetchNextPage}
          loadMoreItems={hasNextPage || false}
          status={status}
        />
      </NftContext.Provider>
    </main>
  );
}

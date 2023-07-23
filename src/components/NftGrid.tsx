import {
  InfiniteLoader,
  List,
  WindowScroller,
  AutoSizer,
  IndexRange,
} from 'react-virtualized';
import NftItemResponse from '@/data/NftItemResponse.type';
import NftItem from './NftItem';
import NftLoader from './Nft-Loader';

export default function NftGrid({
  items = [],
  fetchItems,
  isFetching,
  loadMoreItems,
  status,
}: {
  items: NftItemResponse[];
  fetchItems: () => void;
  isFetching: boolean;
  loadMoreItems: boolean;
  status: string;
}) {
  const itemWidth = 300;
  const itemHeight = 300;

  const loadMoreRows = async (_: IndexRange) => {
    if (!isFetching) {
      fetchItems();
    }
  };

  function generateIndexesForRow(
    rowIndex: number,
    rowWidth: number,
    itemWidth: number,
    itemsAmount: number,
  ) {
    const result = [];
    const maxItemsPerRow = getMaxItemsAmountPerRow(rowWidth, itemWidth);
    const startIndex = rowIndex * maxItemsPerRow;

    for (
      let i = startIndex;
      i < Math.min(startIndex + maxItemsPerRow, itemsAmount);
      i++
    ) {
      result.push(i);
    }

    return result;
  }

  function getMaxItemsAmountPerRow(rowWidth: number, itemWidth: number) {
    return Math.max(Math.floor(rowWidth / itemWidth), 1);
  }

  function getRowsAmount(
    rowWidth: number,
    itemWidth: number,
    itemsAmount: number,
    hasMore: boolean,
  ) {
    const maxItemsPerRow = getMaxItemsAmountPerRow(rowWidth, itemWidth);

    return Math.ceil(itemsAmount / maxItemsPerRow) + (hasMore ? 1 : 0);
  }

  //   QueryClientProvider doesn't have data yet
  if (status === 'loading') {
    return <NftLoader />;
  }

  if (status === 'success' && items.length === 0 && !isFetching) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-2xl">No items found</h1>
      </div>
    );
  }

  return (
    <section style={{width: '100%'}}>
      <AutoSizer disableHeight>
        {({width: rowWidth}) => {
          const rowsAmount = getRowsAmount(
            rowWidth,
            itemWidth,
            items.length,
            loadMoreItems,
          );

          return (
            <InfiniteLoader
              rowCount={rowsAmount}
              isRowLoaded={({index}) => {
                const allItemsLoaded = generateIndexesForRow(
                  index,
                  rowWidth,
                  itemWidth,
                  items.length,
                );

                return !loadMoreItems || allItemsLoaded.length > 0;
              }}
              loadMoreRows={loadMoreRows}>
              {({onRowsRendered, registerChild}) => (
                <WindowScroller>
                  {({height, isScrolling, scrollTop}) => (
                    <List
                      ref={registerChild}
                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      onRowsRendered={onRowsRendered}
                      rowCount={rowsAmount}
                      rowHeight={itemHeight}
                      rowRenderer={({index, key, style}) => {
                        const itemIndexes = generateIndexesForRow(
                          index,
                          rowWidth,
                          itemWidth,
                          items.length,
                        );

                        return (
                          <div
                            key={key}
                            style={{
                              ...style,
                              display: 'flex',
                              justifyContent: 'space-evenly',
                              alignContent: 'center',
                            }}>
                            {itemIndexes.map((itemIndex) => (
                              <NftItem key={itemIndex} nft={items[itemIndex]} />
                            ))}
                          </div>
                        );
                      }}
                      scrollTop={scrollTop}
                      width={rowWidth}
                    />
                  )}
                </WindowScroller>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
      {isFetching && <NftLoader />}
    </section>
  );
}

import Image from 'next/image';
import {useState} from 'react';

import NftItemResponse from '@/data/NftItemResponse.type';
import {getSubStringFromHashtag} from '@/utils/string-utils';

export default function NftItem({nft}: {nft: NftItemResponse}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const imgOptimization = (url: string) => {
    return `https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/${url}`;
  };

  return (
    <div className="nft-grid-item">
      <Image
        src={imgOptimization(nft.img)}
        alt={'Testing'}
        width={264}
        height={264}
        style={{
          ...(isLoaded
            ? {visibility: 'visible'}
            : {visibility: 'hidden', position: 'absolute'}),
          ...(isMouseEnter
            ? {
                opacity: 0.5,
              }
            : {}),
        }}
        onMouseEnter={() => {
          setIsMouseEnter(true);
        }}
        onMouseLeave={() => {
          setIsMouseEnter(false);
        }}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
      {!isLoaded && (
        <div
          className="skeleton-loading"
          style={{height: '264px', width: '264px'}}></div>
      )}

      {isMouseEnter && (
        <>
          <div className="nft-grid-item__title font-black">
            {getSubStringFromHashtag(nft.title)}
          </div>

          <div className="nft-grid-item__price font-black">
            {nft.price.toFixed(2)} SOL
          </div>
        </>
      )}
    </div>
  );
}

import NftItemResponse from "@/data/NftItemResponse.type"
import Image from 'next/image'

export default function NftItem({nft}: {nft: NftItemResponse}) {
    const nftImg = nft.properties.files.find((file) => file.type === 'image/png')!
    return (
        <div style={{width: '300px', height: '300px', border: '3px solid red'}}>
        <Image src={nftImg.uri}  alt={"Testing"} width={300} height={300} />
    </div>
    )
}
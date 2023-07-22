import NftItemResponse from "@/data/NftItemResponse.type";
import NftItem from "./NftItem";


export default function NftGrid({
    nfts
}: {
    nfts: NftItemResponse[]
}){

    return <div className="grid grid-cols-1 md:grid-cols-3  lg:gap-4">
        {nfts.map((nft) => <NftItem key={nft.id} nft={nft} />)}
    </div>
}
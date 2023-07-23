type Creator = {
  address: string;
  verified: number;
  share: number;
};

type OnChainCollectionData = {
  name: string;
  image: string;
  description: string;
};

type OnChainCollection = {
  key: string;
  verified: number;
  data: OnChainCollectionData;
};

type V2 = {
  auctionHouseKey: string;
  sellerReferral: string;
  expiry: number;
};

type RarityRank = {
  rank: number;
};

type Rarity = {
  howrare: RarityRank;
  moonrank: {
    rank: number;
    absolute_rarity: number;
    crawl: any;
  };
};

type PropertiesFile = {
  uri: string;
  type: string;
};

type PropertiesCreators = {
  share: number;
  address: string;
};

type Properties = {
  files: PropertiesFile[];
  category: string;
  creators: PropertiesCreators[];
};

type NftItemResponse = {
  mintAddress: string;
  supply: number;
  title: string;
  primarySaleHappened: boolean;
  updateAuthority: string;
  onChainCollection: OnChainCollection;
  sellerFeeBasisPoints: number;
  creators: Creator[];
  price: number;
  escrowPubkey: string;
  owner: string;
  v2: V2;
  id: string;
  tokenDelegateValid: boolean;
  isFrozen: boolean;
  tokenStandard: number;
  mip1State: number;
  img: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  properties: Properties;
  propertyCategory: string;
  externalURL: string;
  content: string;
  collectionName: string;
  collectionTitle: string;
  isTradeable: boolean;
  rarity: Rarity;
  listingType: string;
  listingUpdatedAt: {
    updatedAt: string;
    slot: number;
  };
  lastSalePrice: number;
  lastSalePriceWithFees: number;
  createdAt: string;
  updatedAt: string;
  animationURL: string;
};

export default NftItemResponse;

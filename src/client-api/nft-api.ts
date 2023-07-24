const BASE_API_URL = 'https://api-mainnet.magiceden.io';
const entriesPerPage = 20;
const PATH = `/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&agg=3&limit=${entriesPerPage}`;
function generateUrl() {
  return BASE_API_URL + PATH;
}

function handleApiCall(url: string) {
  return fetch(url).then(async (response) => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  });
}

export function getNftCollections(page: number) {
  const url = generateUrl();
  return handleApiCall(`${url}&offset=${(page - 1) * entriesPerPage}`);
}

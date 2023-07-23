import {MagnifyingGlass} from 'react-loader-spinner';

function NftLoader() {
  return (
    <MagnifyingGlass
      color="#FFFFFF"
      ariaLabel="loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        fontSize: '10rem',
      }}
    />
  );
}

export default NftLoader;

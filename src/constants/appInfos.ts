import {Dimensions} from 'react-native';

export const appInfos = {
  sizes: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fontFamilies: {
    fontBd: 'AirbnbCereal_W_Bd',
    fontBk: 'AirbnbCereal_W_Bk',
    fontBlk: 'AirbnbCereal_W_Blk',
    fontMd: 'AirbnbCereal_W_Md',
    fontXbd: 'AirbnbCereal_W_XBd',
  },
  BASE_URL: 'http://192.168.1.34:3001',
};

import {StyleSheet} from 'react-native';
import {appColors} from '../constants/appColors';
import {appInfos} from '../constants/appInfos';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },

  text: {
    fontFamily: appInfos.fontFamilies.fontBd,
    fontSize: 14,
    color: appColors.text,
  },

  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },

  shadow: {
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3d56f0',
    borderRadius: 100,
  },
});

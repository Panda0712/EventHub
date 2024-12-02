/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {Space} from '@bsdaoquang/rncomponent';
import {appInfos} from '../../constants/appInfos';
import {appColors} from '../../constants/appColors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/splash-img.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{
          width: appInfos.sizes.width * 0.7,
          resizeMode: 'contain',
        }}
      />

      <Space height={16} />
      <ActivityIndicator color={appColors.grey} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;

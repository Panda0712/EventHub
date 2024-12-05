/* eslint-disable react-native/no-inline-styles */
import {Row, Text} from '@bsdaoquang/rncomponent';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {appColors} from '../constants/appColors';
import {appInfos} from '../constants/appInfos';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  back?: boolean;
  children: ReactNode;
}

const Container = (props: Props) => {
  const {isImageBackground, isScroll, title, back, children} = props;

  const navigation: any = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{flex: 1, paddingTop: 30}}>
        {(title || back) && (
          <Row
            justifyContent="flex-start"
            styles={{
              backgroundColor: appColors.white,
              paddingHorizontal: 16,
              paddingVertical: 12,
              minHeight: 48,
              minWidth: 48,
              justifyContent: 'flex-start',
            }}>
            {back && (
              <TouchableOpacity
                style={{marginRight: 12}}
                onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={appColors.text} />
              </TouchableOpacity>
            )}
            {title && (
              <Text
                text={title}
                size={16}
                font={appInfos.fontFamilies.fontMd}
              />
            )}
          </Row>
        )}
        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView
      style={[globalStyles.container]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[globalStyles.container]}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/splash-img.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <View>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default Container;

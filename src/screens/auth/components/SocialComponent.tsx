/* eslint-disable react-native/no-inline-styles */
import {Button, Section, Space, Text} from '@bsdaoquang/rncomponent';
import React from 'react';
import {appColors} from '../../../constants/appColors';
import {appInfos} from '../../../constants/appInfos';
import {globalStyles} from '../../../styles/globalStyles';
import {Facebook, Google} from '../../../assets/svgs';

const SocialComponent = () => {
  return (
    <Section styles={{alignItems: 'center'}}>
      <Text
        text="OR"
        size={16}
        font={appInfos.fontFamilies.fontMd}
        styles={{textAlign: 'center'}}
        color={appColors.grey}
      />

      <Space height={16} />

      <Button
        radius={12}
        styles={[globalStyles.shadow, {width: appInfos.sizes.width * 0.8}]}
        color={appColors.white}
        textStyleProps={{fontFamily: appInfos.fontFamilies.fontBk}}
        title="Login with Google"
        icon={<Google />}
        onPress={() => {}}
      />
      <Space height={10} />
      <Button
        radius={12}
        styles={[globalStyles.shadow, {width: appInfos.sizes.width * 0.8}]}
        color={appColors.white}
        textStyleProps={{fontFamily: appInfos.fontFamilies.fontBk}}
        title="Login with Facebook"
        icon={<Facebook />}
        onPress={() => {}}
      />
    </Section>
  );
};

export default SocialComponent;

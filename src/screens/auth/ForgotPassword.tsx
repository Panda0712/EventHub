/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Section, Space, Text} from '@bsdaoquang/rncomponent';
import React, {useState} from 'react';
import {Container} from '../../components';
import {appInfos} from '../../constants/appInfos';
import {globalStyles} from '../../styles/globalStyles';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <Container back isImageBackground>
      <Section>
        <Text
          size={24}
          font={appInfos.fontFamilies.fontBd}
          text="Reset Password"
        />
        <Space height={6} />
        <Text
          size={16}
          font={appInfos.fontFamilies.fontBk}
          text="Please enter your email address to request a password reset"
        />

        <Space height={26} />

        <Input
          styles={{
            borderRadius: 12,
            borderColor: appColors.grey3,
            backgroundColor: appColors.white,
            paddingHorizontal: 14,
            minHeight: 56,
          }}
          inputStyles={[
            globalStyles.text,
            {fontFamily: appInfos.fontFamilies.fontMd},
          ]}
          value={email}
          placeholder="abc@gmail.com"
          placeholderColor="#747688"
          onChange={setEmail}
          prefix={<Sms size={20} color={appColors.grey} />}
          clear
        />

        <Space height={20} />

        <Section styles={{alignItems: 'center'}}>
          <Button
            title="Send"
            textStyleProps={{
              color: appColors.white,
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: 16,
            }}
            styles={[
              globalStyles.button,
              {
                width: appInfos.sizes.width * 0.8,
                backgroundColor: appColors.primary,
                minHeight: 64,
                borderRadius: 16,
              },
            ]}
            iconPosition="right"
            icon={
              <ArrowRight
                size={20}
                style={{position: 'absolute', right: 15}}
                color={appColors.white}
              />
            }
            onPress={() => {}}
          />
        </Section>
      </Section>
    </Container>
  );
};

export default ForgotPassword;

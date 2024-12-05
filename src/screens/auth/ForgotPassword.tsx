/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Section, Space, Text} from '@bsdaoquang/rncomponent';
import {ArrowRight, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import authenticationAPI from '../../api/authApi';
import {Container} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {LoadingModal} from '../../modals';
import {globalStyles} from '../../styles/globalStyles';
import {validateEmail} from '../../utils/helpers';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email is required',
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid email address',
      });
      return;
    }

    try {
      setIsLoading(true);
      const api = '/forgot';
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );

      console.log(res);
      setIsLoading(false);
      Alert.alert('We have sent new password to your email!');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      throw new Error('Reset password failed! Please try again!');
    }
  };

  return (
    <Container back isImageBackground>
      <Section>
        <Text
          size={24}
          font={appInfos.fontFamilies.fontBd}
          text="Reset Password"
        />
        <Space height={12} />
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
          required
          helpText={
            email.length > 0 && !validateEmail(email)
              ? 'Invalid email'
              : 'Please fill the email'
          }
          prefix={<Sms size={20} color={appColors.grey} />}
          clear
        />

        <Space height={20} />

        <Section styles={{alignItems: 'center'}}>
          <Button
            disable={email.length === 0 && !validateEmail(email)}
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
                backgroundColor:
                  email.length > 0 && validateEmail(email)
                    ? appColors.primary
                    : appColors.grey,
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
            onPress={handleForgotPassword}
          />
        </Section>
      </Section>

      <LoadingModal visible={isLoading} />
    </Container>
  );
};

export default ForgotPassword;

/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Input,
  Row,
  Section,
  Space,
  Text,
} from '@bsdaoquang/rncomponent';
import {Lock, PasswordCheck, Sms, User} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import authenticationAPI from '../../api/authApi';
import {Container} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {LoadingModal} from '../../modals';
import {globalStyles} from '../../styles/globalStyles';
import {validateEmail} from '../../utils/helpers';
import SocialComponent from './components/SocialComponent';

const SignUpScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const passwordShowHideButton = {
    show: <FontAwesome name="eye" size={22} color={appColors.grey} />,
    hide: <FontAwesome name="eye-slash" size={22} color={appColors.grey} />,
  };

  useEffect(() => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !username ||
      !validateEmail(email) ||
      confirmPassword !== password ||
      password.length < 6
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [username, email, password, confirmPassword]);

  const handleSignUp = async () => {
    const api = '/verification';

    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );

      setIsLoading(false);

      navigation.navigate('Verification', {
        code: res.data.code,
        email,
        password,
        username,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container isImageBackground isScroll back>
        <Section>
          <Text size={24} font={appInfos.fontFamilies.fontBd} text="Sign up" />
          <Space height={21} />
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
            required
            helpText="Please fill the username"
            value={username}
            placeholder="Username"
            placeholderColor="#747688"
            onChange={setUsername}
            prefix={<User size={22} color={appColors.grey} />}
            clear
          />

          <Space height={8} />

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
            required
            helpText={
              !validateEmail(email) && email
                ? 'Please fill the valid email'
                : 'Please fill the email'
            }
            placeholder="Email"
            placeholderColor="#747688"
            onChange={setEmail}
            prefix={<Sms size={22} color={appColors.grey} />}
            clear
          />

          <Space height={8} />

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
            required
            helpText={
              password.length < 6
                ? 'Password length must be 6 characters above'
                : 'Please fill the password'
            }
            value={password}
            passwordShowHideButton={passwordShowHideButton}
            placeholder="Password"
            placeholderColor="#747688"
            onChange={setPassword}
            prefix={<Lock size={22} color={appColors.grey} />}
            password
          />

          <Space height={8} />

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
            value={confirmPassword}
            password
            passwordShowHideButton={passwordShowHideButton}
            placeholder="Confirm password"
            placeholderColor="#747688"
            onChange={setConfirmPassword}
            prefix={<PasswordCheck size={22} color={appColors.grey} />}
            clear
          />
        </Section>

        <Space height={18} />

        <Section styles={{alignItems: 'center'}}>
          <Button
            disable={isDisable}
            title="Sign Up"
            textStyleProps={{
              color: appColors.white,
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: 16,
            }}
            styles={[
              globalStyles.button,
              {
                width: appInfos.sizes.width * 0.9,
                backgroundColor: isDisable
                  ? appColors.grey4
                  : appColors.primary,
                minHeight: 64,
                borderRadius: 16,
              },
            ]}
            onPress={handleSignUp}
          />
        </Section>

        <SocialComponent />

        <Section>
          <Row justifyContent="center">
            <Text size={16} text="Already have an account?" />
            <Space width={8} />
            <Button
              type="link"
              textStyleProps={{fontSize: 16}}
              styles={{marginBottom: 0}}
              title="Signin"
              onPress={() => navigation.navigate('LoginScreen')}
            />
          </Row>
        </Section>
      </Container>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;

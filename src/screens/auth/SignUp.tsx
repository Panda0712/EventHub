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
import {Container} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {globalStyles} from '../../styles/globalStyles';
import SocialComponent from './components/SocialComponent';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../api/authApi';
import Toast from 'react-native-toast-message';
import {validateEmail} from '../../utils/helpers';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const dispatch = useDispatch();

  const passwordShowHideButton = {
    show: <FontAwesome name="eye" size={22} color={appColors.grey} />,
    hide: <FontAwesome name="eye-slash" size={22} color={appColors.grey} />,
  };

  const handleSignUp = async () => {
    const values = {username, email, password};

    if (
      username &&
      validateEmail(email) &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      try {
        setIsLoading(true);

        const res = await authenticationAPI.HandleAuthentication(
          '/register',
          values,
          'post',
        );
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      if (!validateEmail(email)) {
        Toast.show({
          type: 'error',
          text1: 'Failed to register',
          text2: 'Please fill the valid email address',
        });
      }
      if (password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Failed to register',
          text2: 'Password length must be at least 6 characters',
        });
      }
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Failed to register',
          text2: 'Passwords do not match',
        });
      }
      Toast.show({
        type: 'error',
        text1: 'Failed to register',
        text2: 'Please fill all fields',
      });
      setErrorText('Please fill all fields');
    }
  };

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

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

        {errorText && (
          <Section>
            <Text text={errorText} size={14} color={appColors.danger} />
          </Section>
        )}

        <Section styles={{alignItems: 'center'}}>
          <Button
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
                backgroundColor: appColors.primary,
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

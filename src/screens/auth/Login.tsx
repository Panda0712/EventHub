/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Input,
  Row,
  Section,
  Space,
  Text,
} from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Lock, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, Switch} from 'react-native';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../api/authApi';
import {Container} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {addAuth} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
import {validateEmail} from '../../utils/helpers';
import SocialComponent from './components/SocialComponent';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);

  const dispatch = useDispatch();

  const passwordShowHideButton = {
    show: <FontAwesome name="eye" size={22} color={appColors.grey} />,
    hide: <FontAwesome name="eye-slash" size={22} color={appColors.grey} />,
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your email and password.',
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid email address.',
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password should be at least 6 characters long.',
      });
      return;
    }

    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        {email, password},
        'post',
      );

      dispatch(addAuth(res.data));
      await AsyncStorage.setItem(
        'auth',
        isRemember ? JSON.stringify(res.data) : email,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container isImageBackground isScroll>
      <Section
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
        }}>
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{width: 162, height: 114, marginBottom: 30}}
        />
      </Section>

      <Section>
        <Text size={24} font={appInfos.fontFamilies.fontBd} text="Sign in" />
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
          value={email}
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
          value={password}
          passwordShowHideButton={passwordShowHideButton}
          placeholder="Password"
          placeholderColor="#747688"
          onChange={setPassword}
          prefix={<Lock size={22} color={appColors.grey} />}
          password
        />

        <Row alignItems="center" justifyContent="space-between">
          <Row onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <Space width={6} />
            <Text
              styles={[
                globalStyles.text,
                {fontFamily: appInfos.fontFamilies.fontBk, fontSize: 16},
              ]}
              text="Remember me"
            />
          </Row>

          <Button
            textStyleProps={{
              color: appColors.black,
              fontFamily: appInfos.fontFamilies.fontBk,
            }}
            styles={{marginBottom: 0}}
            title="Forgot password?"
            type="link"
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </Row>
      </Section>

      <Space height={18} />

      <Section styles={{alignItems: 'center'}}>
        <Button
          title="Sign In"
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
          onPress={handleLogin}
        />
      </Section>

      <SocialComponent />

      <Section>
        <Row justifyContent="center">
          <Text size={16} text="Don't have an account?" />
          <Space width={8} />
          <Button
            type="link"
            textStyleProps={{fontSize: 16}}
            styles={{marginBottom: 0}}
            title="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </Row>
      </Section>
    </Container>
  );
};

export default LoginScreen;

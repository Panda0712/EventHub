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
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Container} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {globalStyles} from '../../styles/globalStyles';
import SocialComponent from './components/SocialComponent';

const SignUpScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordShowHideButton = {
    show: <FontAwesome name="eye" size={22} color={appColors.grey} />,
    hide: <FontAwesome name="eye-slash" size={22} color={appColors.grey} />,
  };

  return (
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
          onPress={() => {}}
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
  );
};

export default SignUpScreen;

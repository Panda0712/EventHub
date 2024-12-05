/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space, Text} from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowRight} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../api/authApi';
import {Container} from '../../components';
import {appColors} from '../../constants/appColors';
import {appInfos} from '../../constants/appInfos';
import {LoadingModal} from '../../modals';
import {addAuth} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';

const Verification = ({route}: any) => {
  const {code, email, password, username} = route.params;

  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [timeLimit, setTimeLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;

    setCodeValues(data);
  };

  const handleResendVerificationCode = async () => {
    const api = '/verification';
    setNewCode('');
    setCodeValues([]);

    try {
      setLoading(true);
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );

      console.log(res);
      setErrorMessage('');
      setTimeLimit(20);
      setCurrentCode(res.data.code);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw new Error('Cannot send verification code');
    }
  };

  const handleVerification = async () => {
    if (timeLimit > 0) {
      if (Number(newCode) !== currentCode) {
        setErrorMessage('Wrong verification code! Please try again!');
      } else {
        setErrorMessage('');

        const api = '/register';
        const data = {
          email,
          password,
          username,
        };

        try {
          const res = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );

          console.log(res);
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage('User email has already existed!');
          console.log(error);
          throw new Error('Register failed! Please try again!');
        }
      }
    } else {
      setErrorMessage('Timeout, please resend verification code');
    }
  };

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLimit > 0) {
        setTimeLimit(limit => limit - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLimit]);

  useEffect(() => {
    let item = '';
    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);

  return (
    <Container back isImageBackground isScroll>
      <Section>
        <Text
          size={24}
          font={appInfos.fontFamilies.fontBd}
          text="Verification"
        />
        <Space height={12} />
        <Text
          size={16}
          font={appInfos.fontFamilies.fontBk}
          text={`We have sent you a verification code to your email ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
        <Space height={26} />

        <Row justifyContent="space-around">
          <TextInput
            value={codeValues[0]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
            ref={ref1}
            placeholder="-"
            style={[styles.input]}
          />
          <TextInput
            value={codeValues[1]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref3.current.focus();
              handleChangeCode(val, 1);
            }}
            ref={ref2}
            placeholder="-"
            style={[styles.input]}
          />
          <TextInput
            value={codeValues[2]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref4.current.focus();
              handleChangeCode(val, 2);
            }}
            ref={ref3}
            placeholder="-"
            style={[styles.input]}
          />
          <TextInput
            value={codeValues[3]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
            ref={ref4}
            placeholder="-"
            style={[styles.input]}
          />
        </Row>
      </Section>

      <Section styles={{marginTop: 40}}>
        <Button
          disable={newCode.length !== 4}
          title="Continue"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  position: 'absolute',
                  right: 16,
                  backgroundColor:
                    newCode.length === 4 ? '#3d56f0' : appColors.grey,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
          iconPosition="right"
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
              backgroundColor:
                newCode.length !== 4 ? appColors.grey4 : appColors.primary,
              minHeight: 64,
              borderRadius: 16,
            },
          ]}
          onPress={handleVerification}
        />
      </Section>

      {errorMessage && (
        <Section>
          <Text
            styles={{textAlign: 'center'}}
            text={errorMessage}
            color={appColors.danger}
          />
        </Section>
      )}

      <Section>
        {timeLimit > 0 ? (
          <Row justifyContent="center">
            <Text text="Re-send code in " />
            <Text
              text={`00:${timeLimit < 10 ? `0${timeLimit}` : timeLimit}`}
              color={appColors.link}
            />
          </Row>
        ) : (
          <Button
            type="link"
            title="Resend verification code"
            onPress={handleResendVerificationCode}
          />
        )}
      </Section>

      <LoadingModal visible={loading} />
    </Container>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    width: 55,
    height: 55,
    textAlign: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.grey2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontFamily: appInfos.fontFamilies.fontBd,
  },
});

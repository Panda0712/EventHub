import {Button} from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.setItem('auth', auth.email);
          dispatch(removeAuth({}));
        }}
      />
    </View>
  );
};

export default HomeScreen;

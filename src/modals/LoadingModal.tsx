/* eslint-disable react-native/no-inline-styles */
import {Text} from '@bsdaoquang/rncomponent';
import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {appColors} from '../constants/appColors';

interface Props {
  visible: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
  const {visible, mess} = props;

  return (
    <Modal
      visible={visible}
      style={[{flex: 1}]}
      transparent
      statusBarTranslucent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={appColors.white} size={32} />
        <Text text="Loading" flex={0} color={appColors.white} size={16} />
      </View>
    </Modal>
  );
};

export default LoadingModal;

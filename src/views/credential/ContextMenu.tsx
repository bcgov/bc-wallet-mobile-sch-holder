import React, {useState} from 'react';
import styled from '@emotion/native';
import {theme} from '../../../App';
import {Alert} from 'react-native';
// import {View} from 'react-native';

export interface IModalMenuProps {
  state: any;
}

const TextButton = styled.Text`
  color: ${theme.colors.textGray};
  font-family: 'BCSans-Bold';
  font-size: 21px;
  margin-left: 10px;
  // background-color: #ffff00;
`;

const ContextView = styled.View`
  position: absolute;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${theme.colors.white};
  opacity: 1;
  width: 200px;
  border-radius: 10px;
  elevation: 5;
  z-index: 5;
`;

export const ContextMenu: React.FC<IModalMenuProps> = ({state}) => {
  const [modalIsVisible, setModalIsVisible] = state;

  console.log('Context ....');

  if (!modalIsVisible) {
    console.log('Nope..');
    return null;
  }

  const showCardDetails = () => {
    console.log('Show details touched');

    Alert.alert(
      'Coming Soon',
      'This feature is not implemented yet. Check back later for Card Details functionality.',
      [{text: 'OK'}],
    );
  };

  const deleteCardTouched = () => {
    console.log('Delete card touched');

    Alert.alert(
      'Coming Soon',
      'This feature is not implemented yet. Check back later for Delete functionality.',
      [{text: 'OK'}],
    );
  };

  return (
    <ContextView onStartShouldSetResponder={() => true}>
      <TextButton onPress={showCardDetails}>Card Details</TextButton>
      <TextButton
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: 'red',
          marginTop: 10,
        }}
        onPress={deleteCardTouched}>
        Delete...
      </TextButton>
    </ContextView>
  );
};

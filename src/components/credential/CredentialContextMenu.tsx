import React from 'react';
import styled from '@emotion/native';
import {theme} from '../../../App';

export interface IModalMenuProps {
  state: any;
  location: any;
  onDeleteTouched: () => void;
  onShowDetailsTouched: () => void;
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
  border-radius: 4px;
  elevation: 5;
  z-index: 5;
`;

export const CrendentialContextMenu: React.FC<IModalMenuProps> = ({
  state,
  location,
  onDeleteTouched,
  onShowDetailsTouched,
}) => {
  const [modalIsVisible] = state;
  const [loc] = location;
  const popUpMenuWidth = 200;
  const popUpMenuVerticalOffset = 68;

  if (!modalIsVisible) {
    return null;
  }

  return (
    <ContextView
      onStartShouldSetResponder={() => true}
      // TODO:(jl) Cleanup magic numbers and layout.
      style={{
        left: loc[0] - (popUpMenuWidth - loc[2] * 1.5),
        top: loc[1] + popUpMenuVerticalOffset,
      }}
      // onLayout={event => {
      //   console.log('cccc', event.nativeEvent.layout);
      // }}
      accessible={false}
    >
      <TextButton
        onPress={onShowDetailsTouched}
        accessibilityLabel="Details"
        accessibilityHint="Show credential details"
        accessibilityRole="button"
        accessible={true}
      >
        Card Details
      </TextButton>
      <TextButton
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: 'red',
          marginTop: 10,
        }}
        onPress={onDeleteTouched}
        accessibilityLabel="Delete"
        accessibilityHint="Delete this credential"
        accessibilityRole="button"
      >
        Delete...
      </TextButton>
    </ContextView>
  );
};

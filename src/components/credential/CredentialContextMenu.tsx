import React from 'react';
import {MenuView} from '@react-native-menu/menu';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {theme} from '../../../App';
import {css} from '@emotion/native';

const menuStyle = css`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: flex-end;
`;

export interface IModalMenuProps {
  onDeleteTouched: () => void;
  onShowDetailsTouched: () => void;
}

export const CrendentialContextMenu: React.FC<IModalMenuProps> = ({
  onDeleteTouched,
  onShowDetailsTouched,
}) => {
  return (
    <MenuView
      onPressAction={({nativeEvent}) => {
        const {event} = nativeEvent;
        switch (event) {
          case 'details':
            return onShowDetailsTouched();
          case 'delete':
            return onDeleteTouched();
          default:
            return;
        }
      }}
      actions={[
        {
          id: 'details',
          title: 'Details',
        },
        {
          id: 'delete',
          title: 'Remove',
          attributes: {
            destructive: true,
          },
        },
      ]}
      shouldOpenOnLongPress={false}>
      <TouchableOpacity style={menuStyle}>
        <FontAwesomeIcon icon="ellipsis-h" color={theme.colors.white} />
      </TouchableOpacity>
    </MenuView>
  );
};

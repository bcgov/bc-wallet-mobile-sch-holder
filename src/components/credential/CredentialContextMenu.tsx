import React from 'react';
import {MenuView} from '@react-native-menu/menu';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {theme} from '../../../App';

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
          title: 'Delete',
          attributes: {
            destructive: true,
          },
        },
      ]}
      shouldOpenOnLongPress={false}>
      <TouchableOpacity
        style={{
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <FontAwesomeIcon icon="ellipsis-h" color={theme.colors.white} />
      </TouchableOpacity>
    </MenuView>
  );
};

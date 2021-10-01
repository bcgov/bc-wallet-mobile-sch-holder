import styled, {css} from '@emotion/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {Alert, Dimensions, TouchableHighlight, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {theme} from '../../../App';
import {
  boldText,
  text,
  vaccinationStatusColor,
  vaccinationStatusText,
} from '../../assets/styles';
import {DispatchAction} from '../../Reducer';
import {Context} from '../../Store';
import {CredentialHelper} from '../../utils/credhelper';
import {formatAsIssuedDate} from '../../utils/date';
import {CrendentialContextMenu} from './CredentialContextMenu';

const {width} = Dimensions.get('window');

const ContentView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primaryBlue};
  border-radius: 16px;
`;

const HeaderView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: 16px;
  padding-top: 16px;
  padding-bottom: 8px;
`;

const LineView = styled.View`
  height: 2px;
  background-color: ${theme.colors.betaYellow};
`;

const StatusView = styled.View`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.headerBlue};
`;

const QRCodeView = styled.View`
  display: flex;
  margin-vertical: 8px;
  align-items: center;
  justify-content: center;
`;

const NormalText = styled.Text`
  ${text}
  font-size: 16px;
  color: ${theme.colors.white};
  text-align: center;
`;

const LargeText = styled.Text`
  ${text}
  font-size: 18px;
  color: ${theme.colors.white};
  text-align: center;
`;

const LargeBoldText = styled.Text`
  ${boldText}
  font-size: 18px;
  color: ${theme.colors.white};
  text-align: center;
`;

const flexGrow = css`
  flex-grow: 1;
`;

const leftPadding = css`
  padding-left: 16px;
`;

const topPadding = css`
  padding-top: 16px;
`;

const verticalPadding = css`
  padding-vertical: 8px;
`;

export const CredentialCardExpanded: React.FC<any> = ({credential}) => {
  const [, dispatch] = useContext(Context);
  const navigation = useNavigation();
  // const [data, setData] = useState<string>('no data');
  const contextMenuState = useState(false);
  const [modalIsVisible, setModalIsVisible] = contextMenuState;
  const locationState = useState<any>([0, 0, 0]);
  const [, setLocation] = locationState;
  // let marker: any;

  const deleteCard = () => {
    console.log('Delete card');

    try {
      dispatch({type: DispatchAction.RemoveCredential, payload: [credential]});
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Yikes!', 'There was a problem removing this card.', [
        {text: 'OK'},
      ]);
    }
  };

  const showCardDetails = () => {
    console.log('Show details touched');

    Alert.alert(
      'Coming Soon',
      'This feature is not implemented yet. Check back later for Card Details functionality.',
      [{text: 'OK'}],
    );
  };

  const showContextMenu = () => {
    if (modalIsVisible) {
      return;
    }

    setModalIsVisible(true);
  };

  const hideContextMenu = () => {
    if (!modalIsVisible) {
      return;
    }

    setModalIsVisible(false);
  };

  return (
    <TouchableHighlight
      onPress={hideContextMenu}
      underlayColor={theme.colors.transparent}
      activeOpacity={1}>
      <ContentView onStartShouldSetResponder={() => !modalIsVisible}>
        <HeaderView>
          <LargeBoldText style={[flexGrow, leftPadding]}>
            BC Vaccine Card
          </LargeBoldText>
          <View
            // style={{
            //   backgroundColor: '#F00',
            // }}
            onLayout={event => {
              // console.log('btn layout', event.nativeEvent.layout);
              setLocation([
                event.nativeEvent.layout.x,
                event.nativeEvent.layout.y,
                event.nativeEvent.layout.width,
              ]);
            }}
            // ref={view => {
            //   marker = view;
            // }}
            // onLayout={({event}: {event: any}) => {
            //   setLocation([
            //     event.nativeEvent.layout.x,
            //     event.nativeEvent.layout.y,
            //     event.nativeEvent.layout.width,
            //   ]);
            // if (marker) {
            //   marker.measure((x, y, width, height, pageX, pageY) => {
            //     setLocation([
            //       event.nativeEvent.layout.x,
            //       event.nativeEvent.layout.y,
            //     ]);
            //     console.log('**', x, y, width, height, pageX, pageY);
            //   });
            // }
            // }}
            onTouchStart={showContextMenu}>
            <FontAwesomeIcon icon="ellipsis-h" color={theme.colors.white} />
          </View>
        </HeaderView>
        <LineView style={{width: width - 64}} />
        <CrendentialContextMenu
          state={contextMenuState}
          location={locationState}
          onDeleteTouched={deleteCard}
          onShowDetailsTouched={showCardDetails}
        />
        <View style={[verticalPadding]}>
          <LargeText>
            {CredentialHelper.familyNameForCredential(
              CredentialHelper.nameForCredential(credential.record),
            ).toUpperCase()}
            ,
          </LargeText>
          <LargeText>
            {CredentialHelper.givenNameForCredential(
              CredentialHelper.nameForCredential(credential.record),
            ).toUpperCase()}
          </LargeText>
        </View>
        <StatusView
          style={[
            topPadding,
            {
              backgroundColor: vaccinationStatusColor(
                CredentialHelper.immunizationStatus(credential.record),
              ),
            },
          ]}>
          <LargeBoldText>
            {vaccinationStatusText(
              CredentialHelper.immunizationStatus(credential.record),
            )}
          </LargeBoldText>
          <NormalText>
            Issued{' '}
            {formatAsIssuedDate(
              CredentialHelper.issueAtDate(credential.record),
            )}
          </NormalText>
          <QRCodeView>
            <QRCode value={credential.raw} quietZone={4} size={width - 64} />
          </QRCodeView>
        </StatusView>
      </ContentView>
    </TouchableHighlight>
  );
};

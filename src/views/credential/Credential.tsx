import React, {useState, useContext} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {CredentialHelper} from '../../utils/credhelper';
import styled from '@emotion/native';
import {theme} from '../../../App';
import {
  boldText,
  text,
  vaccinationStatusColor,
  vaccinationStatusText,
} from '../../assets/styles';
import {formatAsIssuedDate} from '../../utils/date';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ContextMenu} from '../../components/ContextMenu';
import {DispatchAction} from '../../Reducer';
import {Context} from '../../Store';

export interface IRouteProps {
  navigation: any;
  route: any;
}

const ContentView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 16px 32px 16px;
  background-color: ${theme.colors.primaryBlue};
  border-radius: 16px;
`;

const StatusView = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  background-color: ${theme.colors.headerBlue};
`;

const QRContainerView = styled.View`
  display: flex;
  margin-top: 16px;
  margin-bottom: 32px;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  ${boldText}
  font-size: 21px;
  color: ${theme.colors.white};
  text-align: center;
  margin-left: 55px;
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  width: 90%;
`;

const LineView = styled.View`
  height: 1px;
  width: 90%;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: ${theme.colors.betaYellow};
`;

const LargeText = styled.Text`
  ${text}
  font-size: 24px;
  color: ${theme.colors.white};
  text-align: center;
`;

const LargerText = styled.Text`
  ${boldText}
  font-size: 36px;
  color: ${theme.colors.white};
  text-align: center;
  margin-top: 16px;
`;

const NormalText = styled.Text`
  ${text}
  font-size: 16px;
  color: ${theme.colors.white};
  text-align: center;
`;

export const Credential: React.FC<IRouteProps> = ({route, navigation}) => {
  const {item} = route.params;
  // const [data, setData] = useState<string>('no data');
  const contextMenuState = useState(false);
  const [modalIsVisible, setModalIsVisible] = contextMenuState;
  const locationState = useState<any>([0, 0, 0]);
  const [location, setLocation] = locationState;
  const [state, dispatch] = useContext(Context);
  // let marker: any;

  const deleteCard = () => {
    console.log('Delete card');

    try {
      dispatch({type: DispatchAction.RemoveCredential, payload: [item]});
      navigation.goBack(null);
    } catch (e) {
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
    <ScrollView>
      <TouchableOpacity onPress={hideContextMenu} activeOpacity={1}>
        <ContentView onStartShouldSetResponder={() => !modalIsVisible}>
          <HeaderContainer>
            <HeaderText>BC Vaccination Card</HeaderText>
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
              <FontAwesomeIcon
                icon="ellipsis-h"
                size={32}
                color={theme.colors.white}
              />
            </View>
          </HeaderContainer>
          <LineView />
          <ContextMenu
            state={contextMenuState}
            location={locationState}
            onDeleteTouched={deleteCard}
            onShowDetailsTouched={showCardDetails}
          />
          <LargeText>
            {CredentialHelper.fullNameForCredential(item.record)}
          </LargeText>
          <StatusView
            style={{
              backgroundColor: vaccinationStatusColor(
                CredentialHelper.immunizationStatus(item.record),
              ),
            }}>
            <LargerText>
              {vaccinationStatusText(
                CredentialHelper.immunizationStatus(item.record),
              )}
            </LargerText>
            <NormalText>
              Issued{' '}
              {formatAsIssuedDate(CredentialHelper.issueAtDate(item.record))}
            </NormalText>

            <QRContainerView>
              <QRCode
                value={item.raw}
                quietZone={5}
                size={Dimensions.get('window').width - 64}
              />
            </QRContainerView>
          </StatusView>
        </ContentView>
      </TouchableOpacity>
    </ScrollView>
  );
};

import React, {useState, useContext} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {CredentialHelper} from '../../utils/credhelper';
import styled, {css} from '@emotion/native';
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

const {width} = Dimensions.get('window');

const ContentView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 16px 32px 16px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.headerBlue};
`;

const QRCodeView = styled.View`
  display: flex;
  margin-top: 8px;
  margin-bottom: 16px;
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

export const Credential: React.FC<IRouteProps> = ({route, navigation}) => {
  const {item} = route.params;
  // const [data, setData] = useState<string>('no data');
  const contextMenuState = useState(false);
  const [modalIsVisible, setModalIsVisible] = contextMenuState;
  const locationState = useState<any>([0, 0, 0]);
  const [, setLocation] = locationState;
  const [, dispatch] = useContext(Context);
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
          <ContextMenu
            state={contextMenuState}
            location={locationState}
            onDeleteTouched={deleteCard}
            onShowDetailsTouched={showCardDetails}
          />
          <View style={[verticalPadding]}>
            <LargeText>
              {CredentialHelper.familyNameForCredential(
                CredentialHelper.nameForCredential(item.record),
              ).toUpperCase()}
              ,
            </LargeText>
            <LargeText>
              {CredentialHelper.givenNameForCredential(
                CredentialHelper.nameForCredential(item.record),
              ).toUpperCase()}
            </LargeText>
          </View>
          <StatusView
            style={[
              topPadding,
              {
                backgroundColor: vaccinationStatusColor(
                  CredentialHelper.immunizationStatus(item.record),
                ),
              },
            ]}>
            <LargeBoldText>
              {vaccinationStatusText(
                CredentialHelper.immunizationStatus(item.record),
              )}
            </LargeBoldText>
            <NormalText>
              Issued{' '}
              {formatAsIssuedDate(CredentialHelper.issueAtDate(item.record))}
            </NormalText>
            <QRCodeView>
              <QRCode value={item.raw} quietZone={4} size={width - 64} />
            </QRCodeView>
          </StatusView>
        </ContentView>
      </TouchableOpacity>
    </ScrollView>
  );
};

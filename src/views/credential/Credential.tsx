import React, {useMemo, useState} from 'react';
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
import {ContextMenu} from './ContextMenu';
import {reduce} from 'lodash';

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

export const Credential: React.FC<IRouteProps> = ({route}) => {
  const {itemId, record} = route.params;
  const [data, setData] = useState<string>('no data');
  const contextMenuState = useState(false);
  const [modalIsVisible, setModalIsVisible] = contextMenuState;
  const locationState = useState<any>([0, 0, 0]);
  const [location, setLocation] = locationState;
  let marker: any;

  useMemo(() => {
    async function wrap() {
      try {
        const credHelper = new CredentialHelper();
        const results = await credHelper.credentialWithId(itemId, true);
        if (!results) {
          return;
        }

        // @ts-ignore
        setData(results.record);
      } catch (err) {
        const msg = 'Unable to fetch credentials';
        console.error(msg);
      }
    }
    wrap();
  }, [itemId]);

  const showContextMenu = (e: any) => {
    console.log('Show...', e.nativeEvent.locationX, e.nativeEvent.locationY);

    if (modalIsVisible) {
      console.log('Context already visible. Skipping.');
      return;
    }

    console.log('Showing context menu now.');
    // setLocation([e.nativeEvent.locationX, e.nativeEvent.locationY]);
    setModalIsVisible(true);
  };

  const hideContextMenu = () => {
    console.log('Hide...');

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
              onTouchStart={e => showContextMenu(e)}>
              <FontAwesomeIcon
                icon="ellipsis-h"
                size={32}
                color={theme.colors.white}
              />
            </View>
          </HeaderContainer>
          <LineView />
          <ContextMenu state={contextMenuState} location={locationState} />
          <LargeText>
            {CredentialHelper.fullNameForCredential(record)}
          </LargeText>
          <StatusView
            style={{
              backgroundColor: vaccinationStatusColor(
                CredentialHelper.immunizationStatus(record),
              ),
            }}>
            <LargerText>
              {vaccinationStatusText(
                CredentialHelper.immunizationStatus(record),
              )}
            </LargerText>
            <NormalText>
              Issued {formatAsIssuedDate(CredentialHelper.issueAtDate(record))}
            </NormalText>

            <QRContainerView>
              <QRCode
                value={data}
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

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
import {Dimensions, ScrollView} from 'react-native';

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
  font-size: 24px;
  color: ${theme.colors.white};
  text-align: center;
  margin-top: 16px;
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

  return (
    <ScrollView>
      <ContentView>
        <HeaderText>BC Vaccination Card</HeaderText>
        <LineView />
        <LargeText>{CredentialHelper.fullNameForCredential(record)}</LargeText>
        <StatusView
          style={{
            backgroundColor: vaccinationStatusColor(
              CredentialHelper.immunizationStatus(record),
            ),
          }}>
          <LargerText>
            {vaccinationStatusText(CredentialHelper.immunizationStatus(record))}
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
    </ScrollView>
  );
};

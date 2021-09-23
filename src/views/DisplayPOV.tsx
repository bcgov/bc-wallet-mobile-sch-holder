import React, {useMemo, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {CredentialHelper} from '../utils/credhelper';
import styled from '@emotion/native';
import {theme} from '../../App';

export interface IRouteProps {
  navigation: any;
  route: any;
}

const ContainerView = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const ContentView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: ${theme.colors.primaryBlue};
  border-radius: 10px;
`;

const StatusView = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background-color: ${theme.colors.headerBlue};
`;

const QRContainerView = styled.View`
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  font-family: 'BCSans-Bold';
  font-size: 26px;
  color: ${theme.colors.white};
  text-align: center;
  margin-top: 20px;
`;

const LineView = styled.View`
  height: 1px;
  width: 90%;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: ${theme.colors.betaYellow};
`;

const NormalText = styled.Text`
  font-family: 'BCSans-Regular';
  font-size: 26px;
  color: ${theme.colors.white};
  text-align: center;
`;

export const DisplayPOV: React.FC<IRouteProps> = ({route}) => {
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
    <ContainerView>
      <ContentView>
        <HeaderText>BC Vaccination Card</HeaderText>
        <LineView />
        <NormalText>
          {CredentialHelper.fullNameForCredential(record)}
        </NormalText>
        <StatusView>
          <NormalText style={{marginTop: 20}}>
            {CredentialHelper.vaccinationStatus(record)}
          </NormalText>
          <QRContainerView>
            <QRCode value={data} quietZone={5} size={300} />
          </QRContainerView>
        </StatusView>
      </ContentView>
    </ContainerView>
  );
};
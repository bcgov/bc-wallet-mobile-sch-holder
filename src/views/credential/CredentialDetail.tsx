import styled, {css} from '@emotion/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext} from 'react';
import {View} from 'react-native';
import {theme} from '../../../App';
import {boldText, text} from '../../assets/styles';
import {CredentialHelper} from '../../utils/credhelper';
import {LocalizationContext} from '../../LocalizationProvider';

const Container = styled.ScrollView`
  flex: 1;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: ${theme.colors.messageColor};
  border: 1px solid ${theme.colors.messageBorderColor};
  border-radius: 4px;
  margin: 16px;
`;

const IconContainer = styled.View`
  padding-right: 8px;
`;

const MessageTextContainer = styled.View`
  padding-left: 8px;
  padding-right: 16px;
`;

const ListItemContainer = styled.View`
  padding: 8px 16px;
`;

const TextContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textGray};
`;

const HeaderText = styled.Text`
  ${boldText}
  font-size: 20px;
  color: ${theme.colors.primaryBlue};
`;

const LargeText = styled.Text`
  ${text}
  font-size: 18px;
`;

const LargeBoldText = styled.Text`
  ${boldText}
  font-size: 18px;
`;

const moreLeftPadding = css`
  padding-left: 16px;
`;

const evenMoreLeftPadding = css`
  padding-left: 32px;
`;

const topPadding = css`
  padding-top: 8px;
`;

const moreTopPadding = css`
  padding-top: 16px;
`;

const bottomPadding = css`
  padding-bottom: 8px;
`;

export const CredentialDetail: React.FC<any> = ({route}) => {
  const {credential} = route.params;
  const {record} = credential;
  const {translations} = useContext(LocalizationContext);

  // Ideally these will be formatted directly from the credential.
  // There wouldn't be any assumptions of how the data should be formatted.
  const data = [
    {
      title: '',
      data: [
        {
          label: translations.CredentialDetails.Name,
          text:
            CredentialHelper.fullNameForCredential(
              CredentialHelper.nameForCredential(record),
            ) || ' ',
          child: false,
        },
        {
          label: `${translations.CredentialDetails.DoB} (YYYY-MMM-DD)`,
          text: CredentialHelper.dobForCredential(record) || ' ',
          child: false,
        },
        {
          label: translations.CredentialDetails.Immunization,
          text: 'COVID-19',
          child: false,
        },
      ],
    },
  ].concat(
    CredentialHelper.immunizationsForRecord(record).map(
      (immunization: any, idx: number) => ({
        title: `Dose ${idx + 1}`,
        data: [
          {
            label: translations.CredentialDetails.Product,
            text: CredentialHelper.vaccineForImmunization(immunization) || ' ',
            child: true,
          },
          {
            label: `${translations.CredentialDetails.Date} (YYYY-MMM-DD)`,
            text: CredentialHelper.dateForImmnunization(immunization) || ' ',
            child: true,
          },
          {
            label: translations.CredentialDetails.Lot,
            text:
              CredentialHelper.lotNumberForImmnunization(immunization) || ' ',
            child: true,
          },
          {
            label: translations.CredentialDetails.Provider,
            text:
              CredentialHelper.providerForImmnunization(immunization) || ' ',
            child: true,
          },
        ],
      }),
    ),
  );

  return (
    <Container>
      <MessageContainer>
        <IconContainer>
          <FontAwesomeIcon icon="info-circle" size={24} />
        </IconContainer>
        <MessageTextContainer>
          <LargeBoldText>
            {translations.CredentialDetails.PrivacyMessage}
          </LargeBoldText>
        </MessageTextContainer>
      </MessageContainer>
      {data.map((datum, index) => (
        <View key={datum.title + index} style={bottomPadding}>
          {datum.title ? (
            <ListItemContainer
              style={[
                topPadding,
                moreLeftPadding,
                {
                  backgroundColor: theme.colors.backgroundGray,
                },
              ]}
            >
              <HeaderText>{datum.title}</HeaderText>
            </ListItemContainer>
          ) : null}
          {datum.data.map(item => (
            <ListItemContainer
              key={datum.title + item.label + index}
              style={item?.child ? [moreTopPadding, evenMoreLeftPadding] : []}
            >
              <TextContainer>
                <LargeText style={[bottomPadding]}>{item.label}</LargeText>
                <LargeBoldText>{item.text}</LargeBoldText>
              </TextContainer>
            </ListItemContainer>
          ))}
        </View>
      ))}
    </Container>
  );
};

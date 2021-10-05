import styled, {css} from '@emotion/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {SectionList} from 'react-native';
import {theme} from '../../../App';
import {boldText, text} from '../../assets/styles';
import {CredentialHelper} from '../../utils/credhelper';

const Container = styled.View`
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

const moreTopPadding = css`
  padding-top: 16px;
`;

const bottomPadding = css`
  padding-bottom: 8px;
`;

export const CredentialDetail: React.FC<any> = ({route}) => {
  const {credential} = route.params;
  const {record} = credential;

  // Ideally these will be formatted directly from the credential.
  // There wouldn't be any assumptions of how the data should be formatted.
  const data = [
    {
      title: '',
      data: [
        {
          label: 'Name',
          text:
            CredentialHelper.fullNameForCredential(
              CredentialHelper.nameForCredential(record),
            ) || ' ',
          child: false,
        },
        {
          label: 'Date of Birth (YYYY-MMM-DD)',
          text: CredentialHelper.dobForCredential(record) || ' ',
          child: false,
        },
        {
          label: 'Immunization',
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
            label: 'Date (YYYY-MMM-DD)',
            text: CredentialHelper.dateForImmnunization(immunization) || ' ',
            child: true,
          },
          {
            label: 'Lot Number',
            text:
              CredentialHelper.lotNumberForImmnunization(immunization) || ' ',
            child: true,
          },
          {
            label: 'Provider or Clinic',
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
            You do not need to share this information with anyone
          </LargeBoldText>
        </MessageTextContainer>
      </MessageContainer>
      <SectionList
        sections={data}
        renderSectionHeader={({section: {title}}) => {
          return title ? (
            <ListItemContainer
              style={[
                moreTopPadding,
                moreLeftPadding,
                {
                  backgroundColor: theme.colors.backgroundGray,
                },
              ]}
            >
              <HeaderText>{title}</HeaderText>
            </ListItemContainer>
          ) : null;
        }}
        renderItem={({item}) => (
          <ListItemContainer
            style={item?.child ? [moreTopPadding, evenMoreLeftPadding] : []}
          >
            <TextContainer>
              <LargeText style={[bottomPadding]}>{item.label}</LargeText>
              <LargeBoldText>{item.text}</LargeBoldText>
            </TextContainer>
          </ListItemContainer>
        )}
      />
    </Container>
  );
};

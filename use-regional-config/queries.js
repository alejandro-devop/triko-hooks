import gql from 'graphql-tag';

export const GET_REGION_CONFIG = gql`
  query getRegionConfig($region: Int) {
    response: configs(region_id: $region) {
      emails {
        backgroundCheck
      }
      orders {
        prefix
      }
      rate {
        rateStep
        minimunRate
        maximunRate
      }
      payments {
        placetopay {
          place2payUrl
          paymentContactEmail
        }
      }
      support {
        contactWhatsApp
        contactEmail
        supportEmailSubject
        whatsappMessage
        termsUrl
      }
    }
  }
`;

import gql from 'graphql-tag';

export const GET_TRIKO_SERVICES = gql`
  query getTrikoServices($trikoId: Int, $locale: String = "en") {
    response: trikosservices(triko_id: $trikoId, locale: $locale) {
      id
      price_base
      service {
        id
        name
        icon
        type: servicetype {
          id
          name
          icon
        }
      }
    }
  }
`;

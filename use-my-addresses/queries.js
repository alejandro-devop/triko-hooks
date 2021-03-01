import gql from 'graphql-tag';

export const GET_ADDRESSES_TRIKO = gql`
  query getMyAddressesTriko($triko: Int, $locale: String = "en") {
    response: trikoaddress(triko_id: $triko, locale: $locale) {
      id
      title
      address
      latitude
      isMain
      latitude
      longitude
    }
  }
`;

export const GET_ADDRESSES_CLIENT = gql`
  query getMyAddresesClient($client: Int, $locale: String = "en") {
    response: clientsaddresses(client_id: $client, locale: $locale) {
      id
      title
      address
      latitude
      isMain
      latitude
      longitude
    }
  }
`;

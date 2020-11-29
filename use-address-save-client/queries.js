import gql from 'graphql-tag';

export const SAVE_ADDRESS = gql`
  mutation addAddress(
    $address: String
    $client: Int
    $buildingType: Int!
    $title: String
    $isMain: Int
    $lat: String
    $lng: String
    $locale: String = "en"
  ) {
    response: clientAddress(
      address: $address
      client_id: $client
      building_type_id: $buildingType
      title: $title
      isMain: $isMain
      latitude: $lat
      longitude: $lng
      locale: $locale
    ) {
      id
      title
      address
      description
      buildingtype {
        id
        name
        icon
      }
      isMain
      lat: latitude
      lng: longitude
      title
    }
  }
`;

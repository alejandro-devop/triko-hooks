import gql from 'graphql-tag';

export const UPDATE_TRIKO_LOCATION = gql`
  mutation logoutUser(
    $user: Int
    $lat: String
    $lng: String
    $locale: String = "en"
  ) {
    response: trackinglocation(
      user_id: $user
      latitude: $lat
      longitude: $lng
      locale: $locale
    ) {
      id
      attrs
    }
  }
`;

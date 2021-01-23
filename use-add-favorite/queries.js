import gql from 'graphql-tag';

export const ADD_FAVORITE = gql`
  mutation addFavorite(
    $id: Int
    $triko: Int
    $client: Int
    $remove: Boolean
    $locale: String = "es"
  ) {
    response: trikoFavorite(
      triko_id: $triko
      triko_favorite_id: $id
      client_favorite_id: $client
      remove: $remove
      locale: $locale
    ) {
      id
      user {
        id
        photo_url
        photo: photo_url
      }
      pi: personalinformation {
        id
        first_name
        last_name
        firstName: first_name
        lastName: last_name
      }
    }
  }
`;

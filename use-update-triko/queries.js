import gql from 'graphql-tag';

export const UPDATE_TRIKO = gql`
  mutation updateTriko(
    $id: Int
    $user: Int
    $attrs: String
    $locale: String = "en"
  ) {
    response: triko(
      triko_id: $id
      attrs: $attrs
      locale: $locale
      user_id: $user
    ) {
      id
    }
  }
`;

import gql from 'graphql-tag';

export const LOGOUT = gql`
  mutation logoutUser($user: Int, $locale: String = "en") {
    response: logout(user_id: $user, locale: $locale) {
      id
    }
  }
`;

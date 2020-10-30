import gql from 'graphql-tag';

export const FINALIZE_REGISTER = gql`
  mutation finalizeRegister($user: Int, $locale: String = "en") {
    finalizeregister(user_id: $user, locale: $locale) {
      id
      transition: workflowtransition {
        workflow
      }
    }
  }
`;

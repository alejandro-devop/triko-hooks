import gql from 'graphql-tag';

export const FINALIZE_REGISTER = gql`
  mutation finalizeRegister($userId: Int, $locale: String = "en") {
    response: finalizeregister(user_id: $userId, locale: $locale) {
      id
      transition: workflowtransition {
        workflow
      }
    }
  }
`;

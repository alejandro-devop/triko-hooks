import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation updateUser($id: Int, $email: String, $attrs: String) {
    response: userupdate(user_id: $id, email: $email, attrs: $attrs) {
      attrs
    }
  }
`;

import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation updateUser($id: Int, $attrs: String) {
    response: userupdate(user_id: $id, attrs: $attrs) {
      attrs
    }
  }
`;

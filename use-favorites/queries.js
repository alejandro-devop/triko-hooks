import gql from 'graphql-tag';

export const GET_FAVORITES = gql`
  query getFavorites($client: Int) {
    response: clients(id: $client) {
      id
      favorite {
        id
        trikos {
          id
          user {
            id
            photo_url
            photo: photo_url
          }
          pi: personalinformation {
            first_name
            last_name
            firstName: first_name
            lastName: last_name
          }
        }
        clients {
          id
        }
      }
    }
  }
`;

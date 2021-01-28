import gql from 'graphql-tag';

export const GET_CLIENT_INFO = gql`
  query getClientInfo($client: Int, $locale: String = "en") {
    response: clients(id: $client, locale: $locale) {
      id
      attrs
      shareCode: registercode
      friends
      friendship {
        friends: clientAccepted {
          id
          user {
            photo: photo_url
          }
          pi: personalinformation {
            firstName: first_name
            lastName: last_name
          }
        }
      }
      user {
        id
        photo: photo_url
        phone: phonenumber
        email
      }
      pi: personalinformation {
        id
        city {
          name
          state {
            id
            name
          }
          country {
            id
            name
          }
        }
        firstName: first_name
        lastName: last_name
      }
    }
  }
`;

import gql from 'graphql-tag';

export const GET_TRIKO_CREDITS = gql`
  query getTrikoCredits($triko: Int, $client: Int) {
    response: trikoCredit(triko_id: $triko, client_id: $client) {
      id
      account
      amount
      orders {
        id
      }
    }
  }
`;

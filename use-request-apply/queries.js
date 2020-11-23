import gql from 'graphql-tag';

export const POSTULATE_TO_SERVICE = gql`
  mutation applyToService(
    $accepted: Boolean
    $request: Int
    $triko: Int
    $rejected: Boolean
    $locale: String = "en"
  ) {
    response: servicerequestapply(
      service_request_id: $request
      triko_id: $triko
      rejected: $rejected
      locale: $locale
      acepted: $accepted
    ) {
      id
      triko {
        id
      }
    }
  }
`;

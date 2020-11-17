import gql from 'graphql-tag';

export const POSTULATE_TO_SERVICE = gql`
  mutation applyToService(
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
    ) {
      id
      triko {
        id
      }
    }
  }
`;

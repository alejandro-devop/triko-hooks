import gql from 'graphql-tag';

export const UPDATE_REQUEST = gql`
  mutation updateRequest($request: Int, $locale: String, $cancel: Boolean) {
    servicerequestupdateworkflow(
      service_request_id: $request
      locale: $locale
      cancel_service: $cancel
    ) {
      id
      transition: workflowtransition {
        workflow
      }
    }
  }
`;

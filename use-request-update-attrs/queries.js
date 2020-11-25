import gql from 'graphql-tag';

export const UPDATE_REQUEST_ATTRS = gql`
  mutation updateRequestAttrs(
    $request: Int
    $byHour: Int
    $address: String
    $duration: Float
    $longitude: String
    $latitude: String
    $date: String
    $attrs: String
    $locale: String = "en"
    $image: String
  ) {
    response: servicerequestupdate(
      service_request_id: $request
      by_hour: $byHour
      address: $address
      duration: $duration
      longitude: $longitude
      latitude: $latitude
      application_date: $date
      attrs: $attrs
      locale: $locale
      image: $image
    ) {
      id
    }
  }
`;

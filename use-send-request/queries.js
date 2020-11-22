import gql from 'graphql-tag';

export const SAVE_REQUEST = gql`
  mutation saveServiceRequest(
    $client: Int
    $date: String
    $triko: Int
    $address: String
    $duration: Float
    $lng: String
    $lat: String
    $attrs: String
    $services: String
    $locale: String = "es"
    $type: Int
    $byHour: Int
  ) {
    response: servicerequest(
      client_id: $client
      application_date: $date
      triko_id: $triko
      address: $address
      duration: $duration
      latitude: $lat
      longitude: $lng
      attrs: $attrs
      service_collection: $services
      locale: $locale
      service_request_type_id: $type
      by_hour: $byHour
    ) {
      id
      triko {
        id
        user {
          id
          photo_url
        }
      }
      order {
        id
        total
      }
      transition: workflowtransition {
        workflow
      }
      address
      duration
      attrs {
        by_hour
        longitude
        latitude
        chat_id
        payment_method
        tip
        transport
      }
    }
  }
`;

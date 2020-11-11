import gql from 'graphql-tag';

export const CALC_RATE = gql`
  query calculateRate(
    $byService: Boolean
    $services: String
    $triko: ID
    $region: Int
    $date: String
    $duration: Int
    $byHour: Int
    $type: Int
    $distance: String
    $time: String
    $transport: Float
    $locale: String
    $tip: Float
  ) {
    response: calculaterate(
      rate_by_service: $byService
      service_ids: $services
      triko_id: $triko
      region_id: $region
      application_date: $date
      duration: $duration
      by_hour: $byHour
      service_request_type_id: $type
      distance: $distance
      time: $time
      transport: $transport
      locale: $locale
      tip: $tip
    ) {
      id
      user {
        id
      }
      services {
        id
        name
        detail: ratedetail {
          Rate
          Commission
          Transport
          AdminExpenses
          SubTotal
          Tip
          Tax
          Total
        }
      }
    }
  }
`;

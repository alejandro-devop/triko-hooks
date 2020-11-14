import gql from 'graphql-tag';

export const SAVE_RATING = gql`
  mutation sendRating(
    $request: Int
    $rating: Int
    $isClient: Boolean
    $comment: String
    $locale: String = "en"
  ) {
    response: servicerequestrating(
      service_request_id: $request
      apply_client: $isClient
      rating: $rating
      comment: $comment
      locale: $locale
    ) {
      id
    }
  }
`;

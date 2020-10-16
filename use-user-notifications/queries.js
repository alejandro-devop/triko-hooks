import gql from 'graphql-tag';

export const GET_NOTIFIES = gql`
  query getUserNotifications($userId: Int) {
    response: usernotifications(id: $userId) {
      id
      title
      message
      viewed
      created_at
    }
  }
`;

export const UPDATE_NOTIFY = gql`
  mutation updateNotify(
    $message: String
    $title: String
    $userId: Int
    $id: Int
    $viewed: Boolean
  ) {
    usernotification(
      notification_id: $id
      user_id: $userId
      viewed: $viewed
      title: $title
      message: $message
    ) {
      id
    }
  }
`;

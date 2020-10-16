import {GET_NOTIFIES} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

/**
 * This hook allows to fetch the user notifications
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{total: *, refresh: *, loading: *, notifications: *}}
 */
const useUserNotifications = () => {
  const {
    stack: {user = {}},
  } = useSession();
  const {data = {}, loading, refetch} = useQuery(GET_NOTIFIES, {
    fetchPolicy: 'no-cache',
    variables: {
      userId: user.id,
    },
  });
  const notifications = data.response ? data.response : [];
  const refresh = async () => {
    await refetch();
  };
  return {
    loading,
    notifications,
    refresh,
    total: notifications.length,
  };
};

export default useUserNotifications;

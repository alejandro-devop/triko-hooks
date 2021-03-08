import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {LOGOUT} from './queries';
import {useSession} from 'hooks/index';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'shared/hooks/use-notification';

/**
 * This hook allows to expire the user session.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{expireSession: *, loading: *}}
 */
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-logout/index.js',
  });
  const {
    logout,
    stack: {user = {}, locale},
  } = useSession();
  const [sendRequest] = useMutation(LOGOUT);
  const {error} = useNotify();
  const expireSession = async () => {
    setLoading(true);
    try {
      await sendRequest({
        variables: {
          user: user.id,
          locale,
        },
      });
      await logout();
    } catch (e) {
      reportError(e);
      setLoading(false);
      error('Error while expiring session');
    }
  };
  return {
    loading,
    expireSession,
  };
};

export default useLogout;

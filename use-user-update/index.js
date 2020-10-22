import {useMutation} from '@apollo/react-hooks';
import {UPDATE_USER} from './queries';
import useNotify from 'hooks/useNotification';
import useTranslation from 'hooks/useTranslation';
import useSession from 'hooks/useSession';

/**
 * This hook allows to update the user information, it updates the
 * user in API and localStorage.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{updateUser: updateUser, loading: *}}
 */
const useUserUpdate = () => {
  const [sendUpdate, {loading}] = useMutation(UPDATE_USER);
  const {error} = useNotify();
  const {_t} = useTranslation();
  const {
    stack: {user = {}},
    setKey,
  } = useSession();
  /**
   * This function allows to update the user information, receives attrs
   * and other user attributes
   * TODO: receive other user params
   * @param attrs
   * @returns {Promise<void>}
   */
  const updateUser = async ({attrs = {}}) => {
    try {
      const newAttrs = {
        ...user.attrs,
        ...attrs,
      };

      // Then, send the request to the api.
      await sendUpdate({
        variables: {
          id: user.id,
          attrs: JSON.stringify(newAttrs),
        },
      });

      // First, update the user attrs in session.
      setKey('user', {
        ...user,
        attrs: newAttrs,
      });
    } catch (e) {
      console.log('Error: ', e);
      error(_t('generic_error', {code: 'TK-00031'}));
    }
  };

  return {
    loading,
    updateUser,
  };
};

export default useUserUpdate;

import {useDispatch, useSelector} from 'react-redux';
import {
  setSession,
  removeSession,
  setAllSession,
  clearSession,
} from 'store/actions/session.actions';
import SessionService from 'services/SessionService';

/**
 * This hook allows to connect directly to the session store.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client
 * @param {*} callBack
 */
const useSession = callBack => {
  const dispatch = useDispatch();
  const stack = useSelector(state => {
    return callBack ? callBack(state.session) : state.session;
  });
  return {
    stack,
    setKey: async (key, value) => {
      dispatch(setSession(key, value));
      SessionService.write(key, value);
    },
    removeKey: key => {
      dispatch(removeSession(key));
      SessionService.remove(key);
    },
    setAll: async keys => {
      dispatch(setAllSession(keys));
      await SessionService.writeAll(keys);
    },
    logout: async () => {
      dispatch(clearSession());
      await SessionService.clear({
        locale: stack.locale,
        dictionary: stack.dictionary,
        region: stack.region,
        regionId: stack.regionId,
        regionalConfig: stack.regionalConfig,
      });
    },
    login: async payload => {
      const {
        api_token: token,
        id,
        name,
        photo_url,
        email,
        transition = {},
        phonenumber,
        region = {},
        client = {},
      } = payload;
      const userKeys = {
        id,
        name,
        email,
        workflow: transition.workflow,
        photo_url,
        phonenumber,
      };
      const generalKeys = {
        logged: true,
        token,
        client,
        region: region.code,
        regionId: region.id,
        recovering: null,
        myAddresses: client.addresses || {},
      };
      await SessionService.writeAll(generalKeys);
      await SessionService.write('user', userKeys);
      await SessionService.write('clientId', client.id);
      dispatch(setAllSession(generalKeys));
      dispatch(setSession('user', userKeys));
      dispatch(setSession('clientId', client.id));
    },
  };
};

export default useSession;

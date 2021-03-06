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
const useSession = (callBack) => {
  const dispatch = useDispatch();
  const stack = useSelector((state) => {
    return callBack ? callBack(state.session) : state.session;
  });
  return {
    stack,
    setKey: async (key, value) => {
      dispatch(setSession(key, value));
      SessionService.write(key, value);
    },
    removeKey: (key) => {
      dispatch(removeSession(key));
      SessionService.remove(key);
    },
    setAll: async (keys) => {
      dispatch(setAllSession(keys));
      await SessionService.writeAll(keys);
    },
    logout: async () => {
      dispatch(clearSession());
      await SessionService.clear({
        locale: stack.locale,
        dictionary: stack.dictionary,
        region: stack.region,
        appRegion: stack.appRegion,
        countryCode: stack.countryCode,
        regionId: stack.regionId,
        regionalConfig: stack.regionalConfig,
      });
    },
    login: async (payload) => {
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
        attrs = '{}',
      } = payload;
      const userAttrs = JSON.parse(attrs);
      const userKeys = {
        id,
        name,
        email,
        workflow: transition.workflow,
        photo_url,
        phonenumber,
        attrs: userAttrs,
      };
      const sessionKeys = {
        logged: true,
        token,
        client,
        region: region.code,
        regionId: region.id,
        recovering: null,
        myAddresses: client.addresses || {},
        user: userKeys,
        clientId: client.id,
      };
      await SessionService.writeAll(sessionKeys);
      await dispatch(setAllSession(sessionKeys));
      return sessionKeys;
    },
  };
};

export default useSession;

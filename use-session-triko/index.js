import {useDispatch, useSelector} from 'react-redux';
import {
  setSession,
  removeSession,
  setAllSession,
  clearSession,
} from 'shared/store/actions/triko.session.actions';
import SessionService from 'shared/services/session-service';

/**
 * This hook allows to connect directly to the session store.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Triko-Only
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} callBack
 */
const useSession = (callBack = null) => {
  const dispatch = useDispatch();
  const stack = useSelector(state => {
    return callBack ? callBack(state.session) : state.session;
  });
  return {
    stack,
    setKey: (key, value) => {
      dispatch(setSession(key, value));
      SessionService.write(key, value);
    },
    removeKey: key => {
      dispatch(removeSession(key));
      SessionService.remove(key);
    },
    setAll: keys => {
      dispatch(setAllSession(keys));
      SessionService.writeAll(keys);
    },
    logout: () => {
      dispatch(clearSession());
      SessionService.clear({
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
        triko = {},
        attrs = '{}',
        region = {},
      } = payload;
      try {
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
        const generalKeys = {
          logged: true,
          token,
          triko,
          recovering: null,
          region: region.code,
          regionId: region.id,
          myServices: triko.services || {},
        };
        const viewed = {
          welcomeVideo: userAttrs.welcome_video_viewed,
          welcomeTriko: userAttrs.welcomeTriko,
        };
        const payloadToPersist = {
          ...generalKeys,
          user: userKeys,
          trikoId: triko.id,
          viewed,
        };
        dispatch(setAllSession(payloadToPersist));
        await SessionService.writeAll(payloadToPersist);
      } catch (e) {
        throw e;
      }
    },
  };
};

export default useSession;

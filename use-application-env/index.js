import {
  APP_VERSION,
  APP_PACKAGE_ANDROID,
  APP_PACKAGE_IOS,
  GRAPHQL_SERVER,
  PUSHER_CHANNEL_AUTH_URL,
  PUSHER_CHANNEL_PREFIX,
  PUSHER_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER,
  TRANSLATION_GROUP,
  GOOGLE_API_KEY,
  APP_CODE,
  IP_LOCALIZER,
} from 'react-native-dotenv';

/**
 * This hook allows to abbreviate access to dot env variables
 * @author Jako <jakop.box@gmail.com>
 * @returns {{
 *  pusher: {
 *      cluster: *,
 *      auth: *,
 *      channel: *,
 *      id: *,
 *      secret: *,
 *      key: *
 *  },
 *  iosId: *,
 *  ipFinderUrl: *, Url to fetch ip information
 *  translation: {
 *      group: *
 *  },
 *  apiServer: *, Graphql client url
 *  google: {
 *      apiKey: *
 *  },
 *  appCode: *,
 *  version: *,
 *  androidID: *
 *  }}
 */
const useApplicationConfig = () => ({
  androidID: APP_PACKAGE_ANDROID,
  apiServer: GRAPHQL_SERVER,
  appCode: APP_CODE,
  google: {
    apiKey: GOOGLE_API_KEY,
  },
  iosId: APP_PACKAGE_IOS,
  ipFinderUrl: IP_LOCALIZER,
  pusher: {
    auth: PUSHER_CHANNEL_AUTH_URL,
    channel: PUSHER_CHANNEL_PREFIX,
    id: PUSHER_ID,
    key: PUSHER_KEY,
    secret: PUSHER_SECRET,
    cluster: PUSHER_CLUSTER,
  },
  translation: {
    group: TRANSLATION_GROUP,
  },
  version: APP_VERSION,
});

export default useApplicationConfig;

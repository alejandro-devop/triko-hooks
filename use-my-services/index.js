import useSession from 'hooks/useSession';
import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import {GET_TRIKO_SERVICES} from './queries';
import useNotify from 'shared/hooks/use-notification';
import useTranslation from 'shared/hooks/use-translate';
import useRegionConfig from 'shared/hooks/use-regional-config';
import useErrorReporter from 'shared/hooks/use-error-reporter';

/**
 * This hook allows to fetch the triko services and stored into the myServices array (Session Stack)
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{trikoServices: *, refresh: *, getServices: *, fetching: *, loading: *}}
 */
const useMyServices = () => {
  const {
    stack: {triko, locale, myServices = []},
    setKey,
  } = useSession();
  const {trikoFavorIds = []} = useRegionConfig();
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-my-services/index.js',
  });
  const [fetchTrikoServices, {loading: fetching}] = useLazyQuery(
    GET_TRIKO_SERVICES,
  );
  const {refetch, loading} = useQuery(GET_TRIKO_SERVICES, {
    fetchPolicy: 'no-cache',
    variables: {
      trikoId: triko.id,
      locale,
    },
    onCompleted: ({response}) => {
      saveMyServices(response);
    },
  });

  /**
   * This function allows to check if the service requires a rate.
   * @param service
   * @returns {boolean}
   */
  const doesItRequireRate = ({service = {}}) => {
    const {type = {}} = service;
    return !trikoFavorIds.includes(type.id);
  };

  const saveMyServices = (response) => {
    if (Array.isArray(response)) {
      setKey(
        'myServices',
        response.map((serviceItem) => ({
          trikoServiceId: serviceItem.id,
          ...serviceItem.service,
          requireRate: doesItRequireRate(serviceItem),
          price_base: serviceItem.price_base,
        })),
      );
    } else {
      setKey('myServices', []);
    }
  };

  const refresh = async () => {
    try {
      const {data = {}} = await refetch();
      if (Array.isArray(data.response)) {
        saveMyServices(data.response);
      }
    } catch (e) {
      reportError(e, {
        code: 'TWA-000007',
        message: 'Error while refreshing the services',
      });
    }
  };

  const getServices = async () => {
    try {
      await fetchTrikoServices({
        variables: {
          trikoId: triko.id,
          locale,
        },
      });
    } catch (e) {
      reportError(e, {
        code: 'TWA-000008',
        message: 'Error while getting the triko services',
      });
    }
  };
  return {
    getServices,
    trikoServices: myServices,
    fetching,
    loading,
    refresh,
  };
};

export default useMyServices;

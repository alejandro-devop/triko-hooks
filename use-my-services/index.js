import useSession from 'hooks/useSession';
import {useLazyQuery, useQuery} from '@apollo/react-hooks';
import {GET_TRIKO_SERVICES} from './queries';
import useNotify from 'hooks/useNotification';
import useTranslation from 'hooks/useTranslation';
import useRegionConfig from 'shared/hooks/use-regional-config';

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
  const {error} = useNotify();
  const {_t} = useTranslation();
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
      console.log('Error: ', e);
      error(_t('generic_error', {code: 'TK-00018'}));
    }
  };

  const getServices = async (callback) => {
    try {
      await fetchTrikoServices({
        variables: {
          trikoId: triko.id,
          locale,
        },
      });
    } catch (e) {
      console.log('error: ', error);
      error(_t('generic_error', {code: 'TK-00019'}));
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

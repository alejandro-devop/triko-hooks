import {useQuery} from '@apollo/react-hooks';
import {GET_CLIENT_INFO} from './queries';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';

const useClientInfo = ({clientId}) => {
  const {
    stack: {locale},
  } = useSession();
  const {data = {}, loading} = useQuery(GET_CLIENT_INFO, {
    fetchPolicy: 'no-cache',
    variables: {
      locale,
      client: clientId,
    },
  });
  const info = !isEmpty(data.response) ? data.response : {};
  return {
    info,
    loading,
  };
};

export default useClientInfo;

import {GET_TRIKO_CREDITS} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';

const useTrikoCredits = () => {
  const {
    stack: {triko = {}, client = {}},
  } = useSession();
  const {loading, data = {}} = useQuery(GET_TRIKO_CREDITS, {
    pollInterval: 5000,
    fetchPolicy: 'no-cache',
    variables: {
      triko: !isEmpty(triko) ? triko.id : null,
      client: !isEmpty(client) ? client.id : null,
    },
  });

  const info = !isEmpty(data.response) ? data.response : {};
  return {
    loading,
    ...info,
  };
};

export default useTrikoCredits;

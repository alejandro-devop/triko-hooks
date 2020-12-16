import {useQuery} from '@apollo/react-hooks';
import {GET_EXECUTION_REQUESTS} from './queries';
import {useSession} from 'hooks/index';
import {WORKFLOWS_MAP} from 'shared/commons/constants';

const SHOPPER_WORKFLOWS = {
  shopping: 45,
};

const useExecutionRequest = (options = {}) => {
  const {
    stack: {locale},
  } = useSession();
  const {loading, data = {}} = useQuery(GET_EXECUTION_REQUESTS, {
    fetchPolicy: 'no-cache',
    pollInterval: 8000,
    variables: {
      locale,
      workflow: JSON.stringify([
        SHOPPER_WORKFLOWS.shopping,
        WORKFLOWS_MAP.started,
      ]),
    },
  });
  const requests =
    data.response && Array.isArray(data.response) ? data.response : [];
  return {
    requests,
    loading,
  };
};

export default useExecutionRequest;

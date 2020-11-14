import {
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_ON_YOUR_DOOR,
  STATUS_QUALIFY,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_STARTED,
} from 'config/request-statuses';

const useExecutionStep = (request = {}) => {
  const {transition = {}} = request;
  const {workflow} = transition;
  const contains = (items = []) => items.includes(workflow);
  if (contains([STATUS_CONFIRM_START, STATUS_ON_YOUR_DOOR])) {
    return 1;
  } else if (contains([STATUS_STARTED])) {
    return 2;
  } else if (
    contains([
      STATUS_FINISHED,
      STATUS_CONFIRM_FINISHED,
      STATUS_QUALIFY,
      STATUS_QUALIFY_CLIENT,
      STATUS_QUALIFY_TRIKO,
    ])
  ) {
    return 3;
  } else {
    return 0;
  }
};

export default useExecutionStep;

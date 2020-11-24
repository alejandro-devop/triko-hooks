import {
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_PAYMENT,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_GOING_TO_SHOP,
  STATUS_IN_THE_SHOP,
  STATUS_ON_MY_WAY_DESTINATION,
  STATUS_ON_YOUR_DOOR,
  STATUS_PAYING_CART,
  STATUS_PAYING_ORDER,
  STATUS_QUALIFY,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_SHOPPING,
  STATUS_STARTED,
  STATUS_WAITING_FOR_CLIENT,
} from 'config/request-statuses';

const contains = (items = [], workflow) => items.includes(workflow);

const normalExecution = (workflow) => {
  if (contains([STATUS_CONFIRM_START, STATUS_ON_YOUR_DOOR], workflow)) {
    return 1;
  } else if (contains([STATUS_STARTED], workflow)) {
    return 2;
  } else if (
    contains(
      [
        STATUS_FINISHED,
        STATUS_CONFIRM_FINISHED,
        STATUS_QUALIFY,
        STATUS_QUALIFY_CLIENT,
        STATUS_QUALIFY_TRIKO,
      ],
      workflow,
    )
  ) {
    return 3;
  } else {
    return 0;
  }
};

const shopperExecution = (workflow) => {
  console.log('the: workflow: ', workflow);
  if (contains([STATUS_GOING_TO_SHOP, STATUS_IN_THE_SHOP], workflow)) {
    return 0;
  } else if (contains([STATUS_SHOPPING, STATUS_WAITING_FOR_CLIENT], workflow)) {
    return 1;
  } else if (contains([STATUS_PAYING_CART], workflow)) {
    return 2;
  } else if (contains([STATUS_ON_MY_WAY_DESTINATION], workflow)) {
    return 3;
  } else if (
    contains(
      [STATUS_ON_YOUR_DOOR, STATUS_PAYING_ORDER, STATUS_CONFIRM_PAYMENT],
      workflow,
    )
  ) {
    return 4;
  } else if (contains([STATUS_QUALIFY_CLIENT], workflow)) {
    return 5;
  } else {
    return 0;
  }
};

const useExecutionStep = (request = {}, options = {}) => {
  const {isShopper, isCourier, isTask} = options;
  const {transition = {}} = request;
  const {workflow} = transition;
  if (isShopper) {
    return shopperExecution(workflow);
  } else if (isCourier) {
  } else if (isTask) {
  } else {
    return normalExecution(workflow);
  }
};

export default useExecutionStep;

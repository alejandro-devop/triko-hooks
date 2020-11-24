import {
  STATUS_ACCEPTED,
  STATUS_CANCEL,
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_GOING_TO_SHOP,
  STATUS_IN_THE_SHOP, STATUS_ON_GOING,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_PAYING_CART,
  STATUS_PAYING_ORDER,
  STATUS_PAYMENT,
  STATUS_PENDING,
  STATUS_QUALIFY,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_SHOPPING,
  STATUS_STARTED,
  STATUS_WAITING_FOR_CLIENT,
  STATUS_WAITING_FOR_TRIKO,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';

export const startedStatuses = [
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_STARTED,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_FINISHED,
  STATUS_GOING_TO_SHOP,
  STATUS_IN_THE_SHOP,
  STATUS_SHOPPING,
  STATUS_ON_GOING,
  STATUS_PAYING_ORDER,
];

export const acceptedStatuses = [
  STATUS_ACCEPTED,
  STATUS_CONFIRM_START,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_QUALIFY,
  STATUS_PAYMENT,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_STARTED,
];

const useRequestStatus = (workflow, detailed, paidOut) => {
  const {_t} = useTranslation();
  if (workflow === STATUS_PAYMENT && paidOut && !detailed) {
    return _t('services_status_label_paid');
  } else if (workflow === STATUS_PAYMENT && paidOut && detailed) {
    return _t('services_status_label_paid_detailed');
  }
  const status = ((workflowStatus) => {
    switch (workflowStatus) {
      case STATUS_ACCEPTED:
        return !detailed
          ? 'services_status_label_accepted'
          : 'services_status_label_accepted_detailed';
      case STATUS_PENDING:
        return !detailed
          ? 'services_status_label_pending'
          : 'services_status_label_pending_detailed';
      case STATUS_PAYMENT:
        return 'services_status_label_payment';
      case STATUS_ON_MY_WAY:
        return 'services_status_label_on_my_way';
      case STATUS_ON_YOUR_DOOR:
        return 'services_status_label_on_your_door';
      case STATUS_CONFIRM_START:
        return 'services_status_label_confirm_start';
      case STATUS_STARTED:
        return 'services_status_label_started';
      case STATUS_CONFIRM_FINISHED:
        return 'services_status_label_confirm_finished';
      case STATUS_QUALIFY:
        return 'services_status_label_qualify';
      case STATUS_QUALIFY_CLIENT:
        return 'services_status_label_qualify';
      case STATUS_QUALIFY_TRIKO:
        return 'services_status_label_qualify_triko';
      case STATUS_FINISHED:
        return 'services_status_label_finished';
      case STATUS_CANCEL:
        return 'services_status_label_cancel';
      case STATUS_WAITING_FOR_TRIKO:
        return 'services_status_label_waiting_for_triko';
      case STATUS_GOING_TO_SHOP:
        return 'services_status_going_to_shopping_place';
      case STATUS_IN_THE_SHOP:
        return 'services_status_in_the_shop';
      case STATUS_WAITING_FOR_CLIENT:
        return 'services_status_waiting_for_client_confirmation';
      case STATUS_PAYING_CART:
        return 'services_status_paying_the_cart';
      case STATUS_PAYING_ORDER:
        return 'services_status_paying_the_order';
      case STATUS_SHOPPING:
        return 'services_status_shopping';
      default:
        return 'Unknown';
    }
  })(workflow);

  return _t(status);
};

export default useRequestStatus;

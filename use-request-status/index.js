import {
  STATUS_ACCEPTED,
  STATUS_CANCEL,
  STATUS_CONFIRM_FINISHED,
  STATUS_CONFIRM_START,
  STATUS_FINISHED,
  STATUS_ON_MY_WAY,
  STATUS_ON_YOUR_DOOR,
  STATUS_PAYMENT,
  STATUS_PENDING,
  STATUS_QUALIFY,
  STATUS_QUALIFY_CLIENT,
  STATUS_QUALIFY_TRIKO,
  STATUS_STARTED,
} from 'config/request-statuses';
import useTranslation from 'hooks/useTranslation';

const useRequestStatus = workflow => {
  const {_t} = useTranslation();
  const status = (workflowStatus => {
    switch (workflowStatus) {
      case STATUS_ACCEPTED:
        return 'services_status_label_accepted';
      case STATUS_PENDING:
        return 'services_status_label_pending';
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
      default:
        return 'Unknown';
    }
  })(workflow);

  return _t(status);
};

export default useRequestStatus;

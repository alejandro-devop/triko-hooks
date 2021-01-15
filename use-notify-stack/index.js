import {useDispatch, useSelector} from 'react-redux';
import {
  addNotifies,
  addNotify,
  removeNotify,
} from 'store/actions/notification.actions';
import {STATUS_ACCEPTED} from 'config/request-statuses';
import moment from 'moment';

const serviceRequestResolver = ({id, triko = {}, transition}) => {
  if (transition.workflow === STATUS_ACCEPTED) {
    const {pi = {}, user = {}} = triko;
    const {photo_url} = user;
    return {
      id: moment().unix(),
      avatar: photo_url,
      type: 'service-accepted',
      title: 'Servicio aceptado',
      data: {
        id,
      },
      message: `${pi.first_name} ha aceptado tu servicio`,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
  }
  return null;
};

const buildNotifies = (data = []) => {
  let notifies = [];
  data.forEach((item) => {
    const {__typename} = item;
    if (__typename === 'servicerequest') {
      const notify = serviceRequestResolver(item);
      if (notify) {
        notifies.push(notify);
      }
    }
  });
  return notifies;
};

/**
 * this hook allows to create add stack notification on screen top.
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @apps Client, Triko
 * @returns {{buildNotifies: *, addNotifies: (function(*=)), addNotify: (function(*=)), removeNotify: (function(*=)), notifications: *}}
 */
const useNotifications = () => {
  const dispatch = useDispatch();
  const {notifications} = useSelector((state) => {
    return state.notify;
  });

  return {
    notifications,
    addNotify: (notify) => dispatch(addNotify(notify)),
    addNotifies: (notifies) => dispatch(addNotifies(notifies)),
    buildNotifies,
    removeNotify: (id) => dispatch(removeNotify(id)),
  };
};

export default useNotifications;

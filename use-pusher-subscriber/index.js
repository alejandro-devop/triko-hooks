import {useContext} from 'react';
import {PusherContext} from 'shared/components/pusher-provider';
import {isEmpty} from 'shared/utils/functions';

/**
 * This hook allows to connect to the pusher context and use the client functions
 * @author Jako <jakop.box@gmail.com>
 * @app Client, Triko
 * @version 1.0.0
 * @returns {{subscribeEvent: (function(*=, *=): (void|*)), unSubscribeEvent: (function(*=, *=): void)}}
 */
const usePusherSubscriber = () => {
  const context = useContext(PusherContext);
  const {client} = !isEmpty(context) ? context : {};
  console.log('Client: ', client);
  return {
    subscribeEvent: (eventName, callBack) => {
      if (!isEmpty(client)) {
        client.subscribeEvent(eventName, callBack);
      }
    },
    unSubscribeEvent: (eventName, subscriptionId) => {
      if (!isEmpty(client)) {
        client.unSubscribe(eventName, subscriptionId);
      }
    },
  };
};

export default usePusherSubscriber;

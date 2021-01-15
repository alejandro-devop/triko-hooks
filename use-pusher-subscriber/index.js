import {useContext} from 'react';
import {PusherContext} from 'shared/components/pusher-provider';

/**
 * This hook allows to connect to the pusher context and use the client functions
 * @author Jako <jakop.box@gmail.com>
 * @app Client, Triko
 * @version 1.0.0
 * @returns {{subscribeEvent: (function(*=, *=): (void|*)), unSubscribeEvent: (function(*=, *=): void)}}
 */
const usePusherSubscriber = () => {
  const {client} = useContext(PusherContext);
  return {
    subscribeEvent: (eventName, callBack) =>
      client.subscribeEvent(eventName, callBack),
    unSubscribeEvent: (eventName, subscriptionId) =>
      client.unSubscribe(eventName, subscriptionId),
  };
};

export default usePusherSubscriber;

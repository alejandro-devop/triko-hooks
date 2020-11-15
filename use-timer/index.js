import {useEffect, useState} from 'react';
import moment from 'moment';
/**
 * This hook allows to start a timer and keep track on the the elapsed time.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param initialValues
 * @returns {{elapsed: number, hours: *, seconds: *, minutes: *}|{initTimer: *, formatted: *}}
 */
const useTimer = (initialValues = {}) => {
  const {
    hours: initialH,
    minutes: initialM,
    seconds: initialS,
    initialDate,
    duration = 0,
  } = initialValues;
  const [time, setTime] = useState({
    seconds: initialS,
    minutes: initialM,
    hours: initialH,
  });
  const initialDateObj = moment(initialDate, 'YYYY-MM-DD HH:mm:ss');
  let timer = null;
  useEffect(() => {
    let elapsedTime = 0;
    let prevElapsedTime = 0;

    timer = setInterval(() => {
      const currentTime = moment();
      elapsedTime = currentTime.diff(initialDateObj, 'seconds');
      const elapsedMinutes = currentTime.diff(initialDateObj, 'minutes');
      const hours = currentTime.diff(initialDateObj, 'hours');
      const minutes = elapsedMinutes - hours * 60;
      const seconds = elapsedTime - elapsedMinutes * 60;

      if (elapsedTime !== prevElapsedTime) {
        prevElapsedTime = elapsedTime;
        setTime({
          seconds,
          minutes,
          hours,
          overPassed: elapsedMinutes > duration * 60,
        });
      }
    }, 120);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const format = (num) => `${num < 10 ? '0' : ''}${num}`;
  const formattedAlt = `${format(time.hours)}:${format(time.minutes)}`;
  const {hours, minutes, seconds, overPassed} = time;
  return {
    formattedAlt,
    time: {hours, minutes, seconds},
    overPassed,
  };
};

export default useTimer;

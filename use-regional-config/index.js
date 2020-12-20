import useSession from 'hooks/useSession';
import {APP_CODE} from 'react-native-dotenv';

/**
 * This hook returns the application regional configuration.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{appVersion: *, defaultSearchDistance: *, place2payUrl: *, welcomeVideo: string, minimumScheduleAnticipation: *, minimumAnticipation: number, courierMinimumRate: *, maximumRate: *, minimumRate: *, shopperIds: *, taskMinimumRate: *, dayEndsAt: *, landingUrl: string, minimumMoneyStep: *, contactEmail: *, bankInfoDocs: *, rateStep: *, trikoFavorIds: number[], minimumIncentiveStep: *, docsForShopper: *, whatsappMessage: *, termsUrl: *, supportEmailSubject: *, shopperMinimumRate: *, dayStartsAt: *, paymentContactEmail: *, availableCountries: [string, string], contactWhatsApp: *}}
 */
const useRegionConfig = () => {
  const {
    stack: {regionalConfig},
  } = useSession();
  const {
    payments = {},
    rate = {},
    support = {},
    general = {},
    applications = {},
  } = regionalConfig || {};
  const {triko = {}, client = {}} = applications;

  const getApplicationConfig = () => {
    if (APP_CODE === 'CLS') {
      return client;
    } else if (APP_CODE === 'TKR') {
      return triko;
    } else {
      return {};
    }
  };

  const {placetopay = {}} = payments || {};
  const {version: appVersion = '1.0.3'} = getApplicationConfig();
  const {
    contactEmail,
    supportEmailSubject,
    contactWhatsApp,
    whatsappMessage,
    termsUrl,
  } = support;
  const {
    dayStartsAt = '04:00:00 am',
    dayEndsAt = '11:59:59 pm',
    trikoFavorIds,
    bankInfoDocs = [9],
    docsForShopper = [13, 12],
    shopperIds = [39, 80],
    events = {},
    search = {},
    requests = {},
  } = general;
  const {minimumScheduleAnticipation = 30} = requests;
  const {radius = '20'} = search;
  const {place2payUrl, paymentContactEmail} = placetopay;
  const {
    maximumRate,
    minimumRate,
    rateStep,
    minimumIncentiveStep = 100,
    minimumMoneyStep = 50,
    shopperMinimumRate = 10000,
    taskMinimumRate = 10000,
    courierMinimumRate = 10000,
  } = rate;

  const appConfigs = {
    appVersion,
    availableCountries: ['CO', 'US'],
    dayStartsAt,
    dayEndsAt,
    rateStep,
    minimumRate: minimumRate,
    maximumRate: maximumRate,
    minimumIncentiveStep,
    contactWhatsApp,
    whatsappMessage,
    contactEmail,
    supportEmailSubject,
    minimumAnticipation: 60,
    minimumScheduleAnticipation,
    minimumMoneyStep,
    place2payUrl,
    bankInfoDocs,
    paymentContactEmail,
    termsUrl,
    welcomeVideo: '3O8C2d9e4i0', // Deprecated
    landingUrl: 'https://triko.co',
    docsForShopper,
    shopperIds,
    trikoFavorIds: trikoFavorIds || [11, 22],
    defaultSearchDistance: parseFloat(radius),
    shopperMinimumRate,
    taskMinimumRate,
    courierMinimumRate,
  };
  return appConfigs;
};

export default useRegionConfig;

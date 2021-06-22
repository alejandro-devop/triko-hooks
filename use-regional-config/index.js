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
    stack: {regionalConfig, region},
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
    shareIncentive = 1000,
    trikoFavorIds,
    bankInfoDocs = [9],
    requestFetchInterval = 2000,
    docsForShopper = [13, 12],
    shopperIds = [39, 80],
    search = {},
    requests = {},
    minimumAge = 18,
  } = general;
  const {minimumScheduleAnticipation = 30} = requests;
  const {radius = '20'} = search;
  const {place2payUrl, paymentContactEmail} = placetopay;

  const regionSelect = (options, defValue = null) =>
    options[region] || defValue;

  const {
    maximumRate,
    minimumRate = regionSelect({'es-CO': 6000, 'en-US': 1}),
    rateStep,
    rateStepAlternative = regionSelect({'es-CO': 1000, 'en-US': 1}),
    minimumIncentiveStep = regionSelect({'es-CO': 100, 'en-US': 1}),
    minimumMoneyStep = regionSelect({'es-CO': 50, 'en-US': 1}),
    shopperMinimumRate = regionSelect({'es-CO': 10000, 'en-US': 10}),
    taskMinimumRate = regionSelect({'es-CO': 10000, 'en-US': 10}),
    courierMinimumRate = regionSelect({'es-CO': 10000, 'en-US': 10}),
    minimumTrikoCreditAmount = regionSelect({'es-CO': 1000, 'en-US': 10}),
  } = rate;

  const appConfigs = {
    appVersion,
    availableCountries: ['CO', 'US'],
    dayStartsAt,
    dayEndsAt,
    rateStep,
    minimumAge,
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
    rateStepAlternative,
    termsUrl,
    welcomeVideo: '3O8C2d9e4i0', // Deprecated
    landingUrl: 'https://triko.co',
    docsForShopper,
    shareIncentive,
    shopperIds,
    trikoFavorIds: trikoFavorIds || [11, 22],
    defaultSearchDistance: parseFloat(radius),
    shopperMinimumRate,
    taskMinimumRate,
    courierMinimumRate,
    requestFetchInterval,
    minimumTrikoCreditAmount,
  };
  return appConfigs;
};

export default useRegionConfig;

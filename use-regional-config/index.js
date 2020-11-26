import useSession from 'hooks/useSession';

/**
 * This hook returns the application regional configuration.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{contactEmail: *, rateStep: *, place2payUrl: *, welcomeVideo: string, whatsappMessage: *, termsUrl: *, minimumAnticipation: number, maximumRate: *, supportEmailSubject: *, minimumRate: *, paymentContactEmail: *, landingUrl: string, availableCountries: [string, string], contactWhatsApp: *}}
 */
const useRegionConfig = () => {
  const {
    stack: {regionalConfig},
  } = useSession();
  const {payments = {}, rate = {}, support = {}, general = {}, application} =
    regionalConfig || {};
  const {placetopay = {}} = payments || {};
  const {version: appVersion = '1.0.3'} = application || {};
  const shopperMinimumRate = 10000;
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
    defaultSearchDistance,
  } = general;
  const {place2payUrl, paymentContactEmail} = placetopay;
  const {maximumRate, minimumRate, rateStep, minimumMoneyStep = 50} = rate;

  const appConfigs = {
    appVersion,
    availableCountries: ['CO', 'US'],
    dayStartsAt,
    dayEndsAt,
    rateStep,
    minimumRate: minimumRate,
    maximumRate: maximumRate,
    contactWhatsApp,
    whatsappMessage,
    contactEmail,
    supportEmailSubject,
    minimumAnticipation: 60,
    minimumMoneyStep,
    place2payUrl,
    paymentContactEmail,
    termsUrl,
    welcomeVideo: '3O8C2d9e4i0', // Deprecated
    landingUrl: 'https://triko.co',
    trikoFavorIds: trikoFavorIds || [11, 22],
    defaultSearchDistance: defaultSearchDistance || 20,
    shopperMinimumRate,
  };
  return appConfigs;
};

export default useRegionConfig;

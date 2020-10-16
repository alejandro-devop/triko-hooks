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
  const {payments = {}, rate = {}, support = {}} = regionalConfig || {};
  const {placetopay = {}} = payments || {};
  const shopperMinimumRate = 10000;
  const {
    contactEmail,
    supportEmailSubject,
    contactWhatsApp,
    whatsappMessage,
    termsUrl,
  } = support;
  const {place2payUrl, paymentContactEmail} = placetopay;
  const {maximumRate, minimumRate, rateStep} = rate;

  const appConfigs = {
    availableCountries: ['CO', 'US'],
    rateStep,
    minimumRate: minimumRate,
    maximumRate: maximumRate,
    contactWhatsApp,
    whatsappMessage,
    contactEmail,
    supportEmailSubject,
    minimumAnticipation: 60,
    place2payUrl,
    paymentContactEmail,
    termsUrl,
    welcomeVideo: '3O8C2d9e4i0', // Deprecated
    landingUrl: 'https://triko.co',
    trikoFavorIds: [10, 20],
    shopperMinimumRate,
  };
  return appConfigs;
};

export default useRegionConfig;

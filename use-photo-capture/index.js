import useTranslation from 'shared/hooks/use-translate';
import ImagePicker from 'react-native-image-picker';

/**
 * This hook allows to ask the user for capture a photo or select an image from the gallery
 * It returns a function that must be called to open the prompt,
 * capturePhoto({
      onCustom: button => {
        if (button === 'vu') {
          toggleVisible();
        }
      },
      onPhotoSelected: response => {
        const {uri, data} = response;
        if (onTaken) {
          onTaken({
            uri,
            data,
          });
        }
      },
    });
 * @param otherOptions
 * @returns {Function}
 */
const usePhotoCapture = (otherOptions = {}) => {
  const {_t} = useTranslation();
  const options = {
    title: _t('select_an_image_from_gallery'),
    cancelButtonTitle: _t('image_picker_cancel'),
    takePhotoButtonTitle: _t('image_picker_take_photo'),
    chooseFromLibraryButtonTitle: _t('image_picker_from_gallery'),
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.6,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    ...otherOptions,
  };
  return (config = {}) => {
    const {onCustom, onPhotoSelected, onCancel, onError} = config;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel && onCancel) {
        onCancel();
      } else if (response.error && onError) {
        onError(response.error);
      } else if (response.customButton && onCustom) {
        onCustom(response.customButton);
      } else if (!response.didCancel && !response.error && onPhotoSelected) {
        onPhotoSelected(response);
      }
    });
  };
};

export default usePhotoCapture;

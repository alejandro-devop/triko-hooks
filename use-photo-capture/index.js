import useTranslation from 'hooks/useTranslation';
import ImagePicker from 'react-native-image-picker';

/**
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
        onCancel(response.didCancel);
      } else if (response.error && onError) {
        onError(response.error);
      } else if (response.customButton && onCustom) {
        onCustom(response.customButton);
      } else if (onPhotoSelected) {
        onPhotoSelected(response);
      }
    });
  };
};

export default usePhotoCapture;

import RNFetchBlob from 'rn-fetch-blob';
import {Linking, Platform} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

const useFileDownload = () => {
  const getExtension = (filename) => {
    // To get the file extension
    const parts = /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
    return parts[0];
  };

  const openPhotos = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('photos-redirect://');
        break;
      case 'android':
        Linking.openURL('content://media/internal/images/media');
        break;
      default:
        console.log('Could not open gallery app');
    }
  };

  const downloadFile = async (fileUrl) => {
    let ext = getExtension(fileUrl);
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let date = new Date();
    try {
      let options = {
        fileCache: true,
        appendExt: ext,
        indicator: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      const downloader = config(options);
      const {data} = await downloader.fetch('GET', fileUrl);
      await CameraRoll.save(data, {type: 'photo'});
      openPhotos();
    } catch (e) {
      console.log('Error: ', e);
    }
  };
  return {
    downloadFile,
  };
};

export default useFileDownload;

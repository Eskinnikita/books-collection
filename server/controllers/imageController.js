const fetch = require('node-fetch');
const FormData = require('form-data');
const Vibrant = require('node-vibrant');
const tinycolor = require('tinycolor2');

// Authenticate with Yandex OAuth server and obtain an access token
const accessToken = process.env.YA_DISK_KEY;
//
// Endpoint URLs for Yandex.Disk API
const uploadEndpoint = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const publicUrlEndpoint = 'https://cloud-api.yandex.net/v1/disk/resources/publish';
const folderEndpoint = 'https://cloud-api.yandex.net/v1/disk/resources';

// Get primary and accent color of image
const getImageColors = async (imageBuffer) => {
  const vibrant = new Vibrant(imageBuffer);
  const palette = await vibrant.getPalette();
  const vibrantColor = palette.Vibrant.getHex();
  const textColor = tinycolor(vibrantColor).isLight() ? '#000' : '#fff';

  return { bg: vibrantColor, text: textColor };
};

// Handler function for image upload request
const uploadImage = async (req, res) => {
  try {
    const userId = req.params.id;

    // Parse file data from FormData
    const fileName = new Date().valueOf() + req.file.originalname;
    const fileData = req.file.buffer;

    // Get image color
    const colors = await getImageColors(fileData);

    // Check if user has folder, if not - create
    const userFolderData = await fetch(`${folderEndpoint}?path=/collection/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });
    const userFolderInfo = await userFolderData.json();
    // Create user folder and make it public
    if (userFolderInfo.error === 'DiskNotFoundError') {
      await fetch(`${folderEndpoint}?path=/collection/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      });
      await fetch(`${publicUrlEndpoint}?path=/collection/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      });
    }

    const formData = new FormData();
    formData.append('file', fileData, fileName);

    // Get Ya.Disk upload permission linl
    const uploadData = await fetch(`${uploadEndpoint}?path=/collection/${userId}/${fileName}&overwrite=true`, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });

    const uploadLink = await uploadData.json();

    // Save file
    await fetch(uploadLink.href, {
      method: 'PUT',
      headers: {
        Authorization: `OAuth ${accessToken}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    // Set file status to public and fetch meta source
    const publicUrlResponse = await fetch(`${publicUrlEndpoint}?path=/collection/${userId}/${fileName}`, {
      method: 'PUT',
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });
    const publicUrlJson = await publicUrlResponse.json();

    // Get new file meta
    const savedFileMeta = await fetch(`${publicUrlJson.href}&preview_size=XXXL`, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });
    const saveFileMetaJson = await savedFileMeta.json();

    if (!saveFileMetaJson?.preview) {
      return res.status(400).json({ message: 'Ошибка загрузки. Попробуйте еще раз!' });
    }

    res.send({
      result: { imagePreview: saveFileMetaJson.preview, colors },
    });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка загрузки. Попробуйте еще раз!', error: e.message });
  }
};

const clientId = process.env.IMGUR_CLIENT_ID;

const uploadImageImgur = async (req, res) => {
  try {
    const fileName = new Date().valueOf() + req.file.originalname;
    const fileData = req.file.buffer;

    const colors = await getImageColors(fileData);

    const formData = new FormData();
    formData.append('image', fileData, fileName);

    const response = await fetch('https://api.imgur.com/3/upload', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`,
        ...formData.getHeaders(),
      },
      body: formData,
    });

    const responseData = await response.json();
    if (!responseData?.data?.link) {
      return res.status(400).json({ message: 'Ошибка загрузки. Попробуйте еще раз!' });
    }

    res.send({
      result: { imagePreview: responseData.data.link, colors },
    });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка загрузки. Попробуйте еще раз!', error: e.message });
  }
};

module.exports = {
  uploadImage,
  uploadImageImgur,
};

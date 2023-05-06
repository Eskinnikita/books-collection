const fetch = require('node-fetch');
const FormData = require('form-data');

// Authenticate with Yandex OAuth server and obtain an access token
const accessToken = process.env.YA_DISK_KEY;
//
// Endpoint URLs for Yandex.Disk API
const uploadEndpoint = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const publicUrlEndpoint = 'https://cloud-api.yandex.net/v1/disk/resources/publish';
const folderEndpoint = 'https://cloud-api.yandex.net/v1/disk/resources';

// Handler function for image upload request
const uploadImage = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user has folder, if not - create
    const userFolderData = await fetch(`${folderEndpoint}?path=/collection/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${accessToken}`,
      },
    });
    const userFolderInfo = await userFolderData.json();
    if (userFolderInfo.error === 'DiskNotFoundError') {
      await fetch(`${folderEndpoint}?path=/collection/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      });
    }

    // Parse file data from FormData
    const fileName = new Date().valueOf() + req.file.originalname;
    const fileData = req.file.buffer;

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

    res.send({
      result: saveFileMetaJson.preview,
    });
  } catch (e) {
    return res.status(500).json({ message: 'Ошибка сервера', error: e.message });
  }
};

module.exports = {
  uploadImage,
};

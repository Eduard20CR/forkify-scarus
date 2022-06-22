import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (apiUrl, uploadData = undefined) {
  try {
    const fecthPro = uploadData
      ? fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(apiUrl);

    const response = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    // error handeling
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw err;
  }
};

/*
export const getJson = async function (apiUrl) {
  try {
    const response = await Promise.race([fetch(apiUrl), timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    // error handeling
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
export const sendJson = async function (apiUrl, uploadData) {
  try {
    const fecthPro = fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    // error handeling
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};


*/

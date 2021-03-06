// user related API Calls

import {BASE_URL, METHODS} from '../constants/API_constants';
import requestServer from '../workers/requestServer';
import fileUploadServer from '../workers/fileUploadServer';
import {normalizeNotificationAPI, normalizeUserStatsAPI} from '../constructors/user.contrustor';

// API Routes
const req_update_user = '/update-profile.php';
const req_login = '/login.php';
const req_verify = '/verify.php';
const req_getProfile = '/view-profile.php';
const req_addDeposit = '/update-deposit.php';
const req_kyc_pan = '/kyc.php';
const req_bank_verify = '/bank-account.php';
const req_profileUpload = '/profile-upload.php';
const req_user_stats = '/user-stats.php';
const req_notification = '/notifications.php';

export const getUserRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_getProfile,
      payload,
    );
    if (response.status === 200) {
      return response.data;
    } else {
      failedLog('getUserRemote()', response);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const uploadUserProfileImageRemote = async (payload: any) => {
  try {
    const response = await fileUploadServer(
      BASE_URL + req_profileUpload,
      payload,
    );
    if (response) {
      return true;
    }
    throw 'uploadUserProfileImageRemote failed';
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getNotificationRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_notification,
      {player_key: params.queryKey[1]},
    );
    if (response.status === 200) {
      return normalizeNotificationAPI(response.data.data);
    }
    throw 'get notification invalid response';
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateUserRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_update_user,
      payload,
    );
    if (response.status === 200) {
      return response.data;
    } else {
      failedLog('updateUserRemote()', response);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateWalletRemote = async (payload: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_addDeposit,
      payload,
    );
    if (response.status === 200) {
      return response.data;
    } else {
      failedLog('updateWalletRemote()', response);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserStatsRemote = async (params: any) => {
  try {
    const response = await requestServer(
      METHODS.POST,
      BASE_URL + req_user_stats,
      {player_key: params.queryKey[1]},
    );
    if (response.status === 200) {
      return normalizeUserStatsAPI(response.data.data);
    } else {
      failedLog('getUserStatsRemote()', response);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const uploadPanKYCRemote = async (formData: any) => {
  try {
    const response = await fileUploadServer(BASE_URL + req_kyc_pan, formData);
    if (response) {
      return true;
    } else {
      failedLog('uploadPanKYCRemote()', response);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const uploadBankInfoRemote = async (formData: any) => {
  try {
    const response = await fileUploadServer(
      BASE_URL + req_bank_verify,
      formData,
    );
    if (response) {
      return true;
    } else {
      failedLog('uploadBankInfoRemote()', response);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const loginRemote = async (payload: any) => {
  try {
    const response = await requestServer(METHODS.POST, BASE_URL + req_login, {
      mobile: payload.mobile,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      failedLog('loginRemote()', response);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const otpVerifyRemote = async (payload: any) => {
  try {
    const response = await requestServer(METHODS.POST, BASE_URL + req_verify, {
      mobile: payload.mobile,
      otp: payload.otp,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      failedLog('otpVerifyRemote()', response);
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const failedLog = (functionname: string, response: any) => {
  console.log(
    `\x1b[35m  Request ${functionname} : ${JSON.stringify(response)} \x1b[0m`,
  );
  throw response;
};

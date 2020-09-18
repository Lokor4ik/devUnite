﻿import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  MAIN_LOADED,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './types';
import { message } from 'antd';
import setAuthToken from 'utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      localStorage.removeItem('token');

      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: MAIN_LOADED,
    });
  }
}

export const registerUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    localStorage.setItem('token', res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(element => {
        message.error(element.msg);
      });
    }

    localStorage.removeItem('token');

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
}

export const loginUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    localStorage.setItem('token', res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(element => {
        message.error(element.msg);
      });
    }

    localStorage.removeItem('token');

    dispatch({
      type: LOGIN_FAILURE,
    });
  }
}

export const logoutUser = () => async dispatch => {
  localStorage.removeItem('token');

  dispatch({
    type: LOGOUT,
  });
}
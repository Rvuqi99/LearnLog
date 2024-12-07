import {getTToken} from '../../TokenService';
import {API_ORIGIN} from './api';

export const loginApi = async email => {
  try {
    const dataRequests = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    };
    const data = await fetch(`${API_ORIGIN}/login`, dataRequests);
    const result = await data.json();

    return [data, result];
  } catch (error) {
    console.log('Error when fetching API' + error);
  }
};

export const insertNoteApi = async (content, title, subject, topic) => {
  const token = await getTToken();

  try {
    const dataRequests = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        content: content,
        title: title,
        isPublic: false,
        tags: [subject, topic],
      }),
    };
    const data = await fetch(`${API_ORIGIN}/noteinsert`, dataRequests);
    const result = await data.json();

    return [data, result];
  } catch (error) {
    console.log('Error when fetching API' + error);
  }
};

export const generateQuestion = async (questionAmount, noteid,subject, topic) => {
  const token = await getTToken();

  try {
    const dataRequests = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        questionAmount: questionAmount,
        type: 'request',
        noteid: noteid,
        answers: [],
        tags: [subject, topic],
        chatid: '',
      }),
    };
    const data = await fetch(`${API_ORIGIN}/generatequestion`, dataRequests);
    const result = await data.json();

    return [data, result];
  } catch (error) {
    console.log('Error when fetching API' + error);
  }
};

export const submitAnswer = async (
  questionAmount,
  noteid,
  answers,
  subject,
  topic,
  chatid,
) => {
  const token = await getTToken();

  try {
    const dataRequests = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        questionAmount: questionAmount,
        type: 'answer',
        noteid: noteid,
        answers: answers,
        tags: [subject, topic],
        chatid: chatid,
      }),
    };
    const data = await fetch(`${API_ORIGIN}/generatequestion`, dataRequests);
    const result = await data.json();

    return [data, result];
  } catch (error) {
    console.log('Error when fetching API' + error);
  }
};

export const getNotesAPI = async () => {
  const token = await getTToken();

  try {
    const dataRequests = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const data = await fetch(`${API_ORIGIN}/noteList`, dataRequests);
    const result = await data.json();

    return [data, result];
  } catch (error) {
    console.log('Error when fetching API' + error);
  }
};

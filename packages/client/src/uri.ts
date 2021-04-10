let api = 'http://localhost:8888';

if (process.env.NODE_ENV === 'production') {
  api = 'http://13.232.26.195/api';
}

const exportObj = {
  serverBaseURL: api,
};

export default exportObj;

export const UserConfig = {
  baseUrl: NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2',
  headers: {
    authorization: '35b50ab1-abf3-4779-8fb6-3cb0eb33b8d6',
    'Content-Type': 'application/json'
  }
}
import {CHAT_GPT} from '../../env';
export const OpenAPIRequest = (prompt: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${CHAT_GPT}`);

  const raw = JSON.stringify({
    prompt: prompt,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'https://api.openai.com/v1/engines/text-davinci-002/completions',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

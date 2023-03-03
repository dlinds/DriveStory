import {CHAT_GPT} from '../../env';
import {Configuration, OpenAIApi} from 'openai';
import openai from './config';

interface queryOpenAiProps {
  readonly prompt: string;
  readonly max_tokens?: number;
  readonly temperature?: any;
  readonly model?: string;
}

export const models = {
  davinci3: 'text-davinci-003',
};

export const queryOpenAi = async ({
  prompt,
  max_tokens = 500,
  temperature = undefined,
  model = models.davinci3,
}: queryOpenAiProps) => {
  try {
    const resp = await openai.createCompletion({
      model,
      prompt: `Tell me a childrens story that includes the topics: ${prompt}`,
      max_tokens,
      temperature,
    });

    console.log({resp});
    return resp;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const OpenAPIRequest = async (prompt: string): Promise<string> => {
  console.log({promptInOpenAI: prompt});
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${CHAT_GPT}`);

  const raw = JSON.stringify({
    prompt: `Tell me a childrens story that includes the topics: ${prompt}`,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  let resultPrompt = '';

  await fetch(
    'https://api.openai.com/v1/engines/text-davinci-002/completions',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      resultPrompt = JSON.parse(result).choices;
      console.log({resultPrompt});
      return result;
    })
    .catch(error => console.log('error', error));
  console.log({resultPrompt});
  return resultPrompt;
};

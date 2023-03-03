import {CHAT_GPT} from '../../env';
import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({
  organization: 'org-O0mGwTnGnNxztD3qAgXlZ0ts',
  apiKey: CHAT_GPT,
});

export default new OpenAIApi(configuration);

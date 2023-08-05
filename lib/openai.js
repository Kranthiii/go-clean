import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const generatePrompt = ({ description, location, sinceDate }) => {
  return `Generate an email to be sent to a government authority enquiring about when the trash at ${location} will be collected as the trash was last collected on ${sinceDate}. The email should contain '${description}'`;
};

export default openai;

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import openAIClient from '@/utils/openaiClient';
// const openAIClient = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY as string,
// });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt, conversation } = req.body;

    if (!prompt || typeof prompt !== 'string' || !Array.isArray(conversation)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Add the new user message to the conversation history
    const messages = [...conversation, { role: 'user', content: prompt }];

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const chatParams = {
      model: 'gpt-3.5-turbo',
      messages: messages as OpenAI.ChatCompletionMessageParam[], // Type assertion
      stream: true, // Enable streaming
    };

    const chatResponse = await openAIClient.chat.completions.create(chatParams);

    // Stream the response
    for await (const message of chatResponse) {
      res.write(`data: ${JSON.stringify(message)}\n\n`);
    }

    // Close the connection
    res.end();

  } catch (error) {
    console.error('Error fetching chat response:', error);
    res.status(500).json({
      error: 'Failed to fetch response',
      details: {
        message: (error as Error).message,
        stack: (error as Error).stack,
      },
    });
  }
}

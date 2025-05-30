import * as dotenv from 'dotenv';
import { createError } from '../error.js';
// import OpenAIApi from 'openai';

// dotenv.config();

// // const configuration = new Configuration({
// //     apiKey: process.env.OPENAI_API_KEY,
// // });

// const openai = new OpenAIApi({
//     apiKey: process.env.OPENAI_API_KEY
//   });

// export const generateImage = async (req, res, next) => {
//     try {
//         const { prompt } = req.body;
//         console.log(prompt);
        
//         console.log(Object.keys(openai), openai)
//         const response = await openai.images.generate({
//             model: "dall-e-2",
//             prompt,
//             size: "1024x1792",
//             response_format: "b64_json",
//             user: '1',
//             quality: "hd"
//           });
    

//         console.log("OpenAI Response:", JSON.stringify(response.data, null, 2));

//         const generatedImage = response.data.data[0].b64_json;
//        return res.status(200).json({ success: true, photo: generatedImage });
//     } catch (err) {
//         console.error("Error generating image:", err, err.response, Object.keys(err));
//         next(createError(err.status, err?.response?.data?.message || err.message));
//     }
// }
import { GoogleGenAI, Modality } from "@google/genai";

export const generateImage = async (req, res, next) => {

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

  const contents = req.body.prompt;

  // Set responseModalities to include "Image" so the model can generate  an image
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      return res.status(200).json({ success: true, photo: imageData });
      // const buffer = Buffer.from(imageData, "base64");
      // return res.status(200).json({ success: true, photo: buffer.toString('base64') });
      // fs.writeFileSync("gemini-native-image.png", buffer);
      // console.log("Image saved as gemini-native-image.png");
    }
  }
}
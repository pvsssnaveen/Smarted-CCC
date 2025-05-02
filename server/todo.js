const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyAc_9LeBiTDZo77eLmJ33BPAEIXyyD72lw');

async function test() {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent("Say hello in French");
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

test().catch(console.error);

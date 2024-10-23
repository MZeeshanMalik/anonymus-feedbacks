import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string | undefined = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("API key is missing from environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(): Promise<Response> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt: string =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interactions. For example, your output should be structured like this: 'What's a hobby you have recently started?' || 'If you could have dinner with any historical figure, who would it be?' || 'What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await model.generateContent(prompt);

    return new Response(
      JSON.stringify({
        status: "success",
        data: await result.response.text(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to generate content",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

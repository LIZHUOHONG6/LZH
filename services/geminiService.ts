import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
你是一位资深的光学工程师和图像处理专家，专注于工业非接触检测（NDT）领域。
你正在协助用户设计一个“盲孔内壁检测系统研究方案”。

该APP中提出的方案是“折反射全景成像系统”（Catadioptric Panoramic Imaging System），使用锥形镜探头。
关键约束：
1. 盲孔（只能从一端进入）。
2. 非接触式。
3. 高精度检测。

你的角色：
- 回答关于光学（景深、视场角、分辨率）、照明（同轴光 vs 环形光）和算法（图像展开、缺陷检测）的技术问题。
- 如果被问及算法，请提供 Python/OpenCV 或 C++ 代码片段。
- 批判性地与其他方法（工业内窥镜、旋转线扫描）进行比较。
- 使用中文回答，保持专业、简洁和技术性。
`;

export const sendMessageToGemini = async (
  history: { role: string; text: string }[],
  message: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "错误：缺少 API Key。请检查环境变量配置。";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview'; 

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const response = await chat.sendMessage({ message });
    return response.text || "未收到回复。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "在分析您的技术咨询时遇到错误，请重试。";
  }
};
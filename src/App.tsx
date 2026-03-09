import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import ReactMarkdown from 'react-markdown';
import { 
  PawPrint, 
  RotateCcw, 
  Share2, 
  Heart, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Zap,
  Shield,
  Star,
  Compass,
  ChevronDown,
  AlertCircle,
  Lock,
  LogOut,
  CheckCircle2,
  Loader2,
  Venus,
  Mars,
  Camera,
  Upload,
  Image as ImageIcon,
  Infinity as InfinityIcon,
  FileText,
  Edit3
} from 'lucide-react';
import { 
  QUESTIONS, 
  MBTI_TYPES, 
  ZODIAC_DATA, 
  WU_XING_DATA, 
  PAST_LIFE_DATA,
  FORTUNE_DATA,
  BREED_DATA,
  CAT_BREED_DATA,
  GENDER_LABELS,
  getPersonalityTitleAndTemplate
} from './data';
import { GoogleGenAI } from "@google/genai";

type Step = 'home' | 'quiz' | 'result';

const AUTH_KEY = 'petmbti_auth';
const CODE = '1234';

const resizeImage = (dataUrl: string, maxWidth = 1024, maxHeight = 1024): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = dataUrl;
  });
};

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CODE) {
      localStorage.setItem(AUTH_KEY, 'true');
      onAuth();
    } else {
      setError('验证码错误');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white p-8 rounded-[2.5rem] shadow-2xl border-4 border-white text-center"
      >
        <div className="w-16 h-16 bg-[#FFE66D] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Lock size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-black mb-2">请输入邀请码</h2>
        <p className="text-gray-400 mb-6 text-sm font-medium">请输入您收到的访问邀请码</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="请输入邀请码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all text-center text-xl font-black tracking-[0.5em] ${
              error ? 'border-red-400 animate-shake' : 'border-transparent focus:border-[#FFE66D]'
            }`}
          />
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <button
            type="submit"
            className="w-full py-4 bg-[#2D2D2D] text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            进入
          </button>
        </form>
        <p className="mt-6 text-[10px] text-gray-300 font-bold">验证成功后将在当前设备保持访问权限</p>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [step, setStep] = useState<Step>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null));
  const [petName, setPetName] = useState('');
  const [petBirthday, setPetBirthday] = useState('');
  const [petType, setPetType] = useState('dog');
  const [petGender, setPetGender] = useState('male');
  const [selectedBreedId, setSelectedBreedId] = useState('other_dog');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingComic, setIsGeneratingComic] = useState(false);
  const [comicImageUrls, setComicImageUrls] = useState<string[]>([]);
  const [currentComicPage, setCurrentComicPage] = useState(0);
  const [comicGenerationProgress, setComicGenerationProgress] = useState(0);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [isDesigning, setIsDesigning] = useState(false);
  const [designResult, setDesignResult] = useState<string | null>(null);
  const [comicScript, setComicScript] = useState<string | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const showToastWithMsg = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthorized(false);
  };

  const handleStart = () => {
    if (!petName.trim()) {
      showToastWithMsg('请输入你家毛孩子的名字哦！');
      return;
    }
    if (!petBirthday) {
      showToastWithMsg('请输入它的生日，我们需要计算星盘哦！');
      return;
    }
    setStep('quiz');
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (answers[currentQuestionIndex] !== null) return; // Prevent multiple selections

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    setTimeout(() => {
      setCurrentQuestionIndex(prev => {
        if (prev < QUESTIONS.length - 1) {
          return prev + 1;
        } else {
          setStep('result');
          return prev;
        }
      });
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] !== null && currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (answers[currentQuestionIndex] !== null && currentQuestionIndex === QUESTIONS.length - 1) {
      setStep('result');
    }
  };

  const scores = useMemo(() => {
    const s = { EI: 0, SN: 0, TF: 0, JP: 0 };
    answers.forEach((ansIndex, qIndex) => {
      if (ansIndex !== null) {
        const question = QUESTIONS[qIndex];
        if (ansIndex < question.options.length) {
          const opt = question.options[ansIndex];
          s[opt.dimension] += opt.value;
        }
      }
    });

    if (petType === 'dog') {
      const breed = BREED_DATA.find(b => b.id === selectedBreedId);
      if (breed) {
        if (breed.modifiers.EI) s.EI += breed.modifiers.EI;
        if (breed.modifiers.SN) s.SN += breed.modifiers.SN;
        if (breed.modifiers.TF) s.TF += breed.modifiers.TF;
        if (breed.modifiers.JP) s.JP += breed.modifiers.JP;
      }
    } else if (petType === 'cat') {
      const breed = CAT_BREED_DATA.find(b => b.id === selectedBreedId);
      if (breed) {
        if (breed.modifiers.EI) s.EI += breed.modifiers.EI;
        if (breed.modifiers.SN) s.SN += breed.modifiers.SN;
        if (breed.modifiers.TF) s.TF += breed.modifiers.TF;
        if (breed.modifiers.JP) s.JP += breed.modifiers.JP;
      }
    }

    // Gender modifiers (Scheme A: Mild weighting)
    if (petGender === 'male') {
      s.EI += 0.3; // Slightly more energetic
      s.JP += 0.2; // Slightly more territorial/structured
    } else if (petGender === 'female') {
      s.TF -= 0.3; // Slightly more empathetic/sensitive
      s.SN -= 0.2; // Slightly more intuitive
    }

    return s;
  }, [answers, petType, selectedBreedId, petGender]);

  const zodiac = useMemo(() => {
    if (!petBirthday) return ZODIAC_DATA["白羊座"];
    const date = new Date(petBirthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let name = "白羊座";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) name = "白羊座";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) name = "金牛座";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) name = "双子座";
    else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) name = "巨蟹座";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) name = "狮子座";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) name = "处女座";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) name = "天秤座";
    else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) name = "天蝎座";
    else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) name = "射手座";
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) name = "摩羯座";
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) name = "水瓶座";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) name = "双鱼座";
    return ZODIAC_DATA[name];
  }, [petBirthday]);

  const wuXing = useMemo(() => {
    if (!petBirthday) return WU_XING_DATA["木"];
    const month = new Date(petBirthday).getMonth() + 1;
    if ([3, 4, 5].includes(month)) return WU_XING_DATA["木"];
    if ([6, 7, 8].includes(month)) return WU_XING_DATA["火"];
    if ([9, 10, 11].includes(month)) return WU_XING_DATA["金"];
    return WU_XING_DATA["水"];
  }, [petBirthday]);

  const resultType = useMemo(() => {
    const e = scores.EI >= 0 ? 'E' : 'I';
    const s = scores.SN >= 0 ? 'S' : 'N';
    const t = scores.TF >= 0 ? 'T' : 'F';
    const j = scores.JP >= 0 ? 'J' : 'P';
    const code = `${e}${s}${t}${j}`;
    const baseType = MBTI_TYPES[code] || MBTI_TYPES['ENFP'];
    
    // Scheme B: Result modifiers based on gender
    const genderLabel = GENDER_LABELS[petGender]?.[e] || GENDER_LABELS['neutral'][e];
    
    return { ...baseType, genderLabel };
  }, [scores, petGender]);

  const personalityTitle = useMemo(() => {
    if (!resultType.code) return "";
    const { title } = getPersonalityTitleAndTemplate(resultType.code, scores);
    return title;
  }, [resultType.code, scores]);

  const pastLife = useMemo(() => {
    if (!petBirthday || !resultType.code) return PAST_LIFE_DATA[0];
    
    // Combine MBTI code and Zodiac to create a more deterministic but varied seed
    const mbtiSeed = resultType.code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const zodiacSeed = zodiac.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const birthdaySeed = new Date(petBirthday).getTime() % 10000;
    
    const seed = mbtiSeed + zodiacSeed + birthdaySeed + (petName?.length || 0);
    const index = Math.abs(Math.floor(seed)) % PAST_LIFE_DATA.length;
    return PAST_LIFE_DATA[index];
  }, [petName, petBirthday, resultType.code, zodiac]);

  const indices = useMemo(() => {
    const sJP = scores.JP || 0;
    const sEI = scores.EI || 0;
    const sTF = scores.TF || 0;
    const sSN = scores.SN || 0;

    const stability = Math.min(100, Math.max(20, 50 + (sJP * 5) + (['土', '水'].includes(zodiac.element) ? 20 : 0)));
    const clinginess = Math.min(100, Math.max(20, 50 + (sEI * 3) - (sTF * 5)));
    const destructiveness = Math.min(100, Math.max(20, 50 + (sSN * 5) + (['火', '风'].includes(zodiac.element) ? 20 : 0)));
    return { 
      stability: isNaN(stability) ? 50 : stability, 
      clinginess: isNaN(clinginess) ? 50 : clinginess, 
      destructiveness: isNaN(destructiveness) ? 50 : destructiveness 
    };
  }, [scores, zodiac]);

  const fortune = useMemo(() => {
    if (!petBirthday) return "宜加餐，忌运动";
    
    // Daily seed + pet characteristics
    const today = new Date().getDate();
    const mbtiSeed = resultType.code?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    const seed = today + mbtiSeed + (petName?.length || 0);
    
    const item = FORTUNE_DATA[seed % FORTUNE_DATA.length];
    return `宜${item.yi}，忌${item.ji}`;
  }, [petName, petBirthday, resultType.code]);

  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCharacterSheet = async () => {
    if (!referenceImage) return;
    setIsDesigning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Resize image to avoid 500 errors and ensure correct mimeType
      const resizedImage = await resizeImage(referenceImage, 800, 800);
      const mimeType = resizedImage.split(';')[0].split(':')[1] || 'image/jpeg';
      const base64Data = resizedImage.split(',')[1];

      const breedName = petType === 'dog' 
        ? BREED_DATA.find(b => b.id === selectedBreedId)?.name 
        : CAT_BREED_DATA.find(b => b.id === selectedBreedId)?.name;

      const { title } = getPersonalityTitleAndTemplate(resultType.code, scores);

      const prompt = `You are a manga character designer. Based on the provided reference image of a ${breedName} ${petType === 'dog' ? 'dog' : 'cat'} named "${petName}" with a "${title}" (${resultType.code}) personality and ${zodiac.name} zodiac sign, create a character sheet.
Requirements:
- Must maintain consistency with the photo: fur color, facial features, ear shape, body type (especially breed characteristics).
- Style: Japanese kawaii, soft pastel colors, hand-drawn texture, clean lines.
- Output must contain: Front view, Side view, and 3 expressions that reflect the "${title}" persona.
- Background: Solid color or minimal, no scene.
- CRITICAL: ABSOLUTELY NO TEXT, LETTERS, NUMBERS, OR SYMBOLS in the image.
- DO NOT draw speech bubbles, thought bubbles, or any UI elements.
- DO NOT include any captions, labels, or watermarks.
- The image must be 100% PURELY VISUAL. Any text will ruin the design.
- The character sheet should be suitable for a 4-6 panel comic of the "same character".
- Output 1 single image containing all these elements.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            },
            { text: prompt }
          ]
        }
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setDesignResult(imageUrl);
      } else {
        throw new Error('未能生成角色设定图');
      }
    } catch (error) {
      console.error('Character design failed:', error);
      showToastWithMsg('生成角色设定图失败，可能是由于图片过大或网络波动，请重试。');
    } finally {
      setIsDesigning(false);
    }
  };

  const generateComicScript = async () => {
    setIsGeneratingScript(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const { title } = getPersonalityTitleAndTemplate(resultType.code, scores);
      const breedName = petType === 'dog' 
        ? BREED_DATA.find(b => b.id === selectedBreedId)?.name 
        : CAT_BREED_DATA.find(b => b.id === selectedBreedId)?.name;

      const prompt = `根据以下宠物人格信息，生成一个6格宠物漫画脚本（必须有剧情推进与对白/旁白）。

输入信息：
- 宠物名字：${petName}
- 物种：${petType === 'dog' ? '狗' : '猫'}
- 品种：${breedName}
- MBTI：${resultType.code}
- 星座：${zodiac.name}
- 人格称号：${title}

脚本结构（起承转合）：
Panel 1：观察 (宠物注意到主人在忙碌或疲惫) -> 旁白或宠物心声
Panel 2：靠近 (宠物走近主人，寻求关注) -> 宠物心声
Panel 3：行动 (宠物做出一个贴心或搞笑的动作) -> 宠物心声
Panel 4：安慰 (宠物陪伴在主人身边) -> 宠物心声
Panel 5：情绪转折 (主人被宠物治愈或逗笑) -> 主人对宠物说的话
Panel 6：总结 (主人抱住宠物，并展示宠物人格信息卡) -> 旁白或主人感言

对白规则：
- 每格必须有一句对白或旁白。
- 必须是简体中文，不超过12个字。
- 明确区分：前4格通常是宠物的内心戏，后2格通常是主人的反馈。

输出格式严格如下（直接输出文本，不要包含Markdown代码块或任何额外说明）：
Panel 1:
Scene: [场景描述]
Action: [动作描述]
Speaker: [谁在说话：毛孩子/主人/旁白]
Text: [对话或旁白内容]
...
Panel 6:
Scene: [场景描述]
Action: [动作描述]
Speaker: [谁在说话：毛孩子/主人/旁白]
Text: [对话或旁白内容]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      if (response.text) {
        setComicScript(response.text);
        return response.text;
      }
      throw new Error('未能生成剧本');
    } catch (error) {
      console.error('Script generation failed:', error);
      showToastWithMsg('生成剧本失败，请重试');
      return null;
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const reset = () => {
    setStep('home');
    setCurrentQuestionIndex(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setPetName('');
    setPetBirthday('');
    setPetGender('male');
    setSelectedBreedId(petType === 'dog' ? 'other_dog' : 'other_cat');
    setComicImageUrls([]);
    setCurrentComicPage(0);
    setComicGenerationProgress(0);
    setReferenceImage(null);
    setDesignResult(null);
    setComicScript(null);
  };

  const parseComicScript = (script: string | null) => {
    if (!script) return [];
    // Strip markdown code blocks if present
    const cleanScript = script.replace(/```[\s\S]*?```/g, '').trim();
    const panels: { text: string; speaker?: string }[] = [];
    const sections = cleanScript.split(/Panel\s+\d+:/i);
    
    sections.forEach(section => {
      if (!section.trim()) return;
      const textMatch = section.match(/Text:\s*(.*)/i);
      const speakerMatch = section.match(/Speaker:\s*(.*)/i);
      if (textMatch && textMatch[1]) {
        panels.push({ 
          text: textMatch[1].trim(),
          speaker: speakerMatch ? speakerMatch[1].trim() : ''
        });
      }
    });
    return panels;
  };

  const generateComic = async () => {
    setIsGeneratingComic(true);
    setComicGenerationProgress(0);
    setComicImageUrls([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      let script = comicScript;
      if (!script) {
        script = await generateComicScript();
      }
      if (!script) throw new Error('剧本生成失败');

      const panels = parseComicScript(script);
      if (panels.length < 6) throw new Error('剧本解析失败，未找到足够的格数');

      const breedName = petType === 'dog' 
        ? BREED_DATA.find(b => b.id === selectedBreedId)?.name 
        : CAT_BREED_DATA.find(b => b.id === selectedBreedId)?.name;

      const generatedUrls: string[] = [];

      // Generate 6 panels sequentially for better control and progress tracking
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      for (let i = 0; i < 6; i++) {
        setComicGenerationProgress(i + 1);
        
        // Add a small delay between panels to avoid hitting rate limits
        if (i > 0) await sleep(1000);

        const isLastPanel = i === 5;
        const panelScript = panels[i];

        const prompt = `Create a single high-quality comic panel (Panel ${i + 1} of 6) for a pet named "${petName}".
Style: cute pet comic, kawaii style, Japanese slice of life comic, soft pastel colors, hand drawn illustration.
Main character: a fluffy cream ${breedName} ${petType === 'dog' ? 'dog' : 'cat'} with a round face, small ears, and a curly tail.
The character must look identical to the provided reference photo.

Anatomy: The ${petType} MUST have exactly 4 legs. Ensure anatomically correct posture. No extra limbs.

Scene Description: ${panelScript.text}

CRITICAL INSTRUCTIONS:
- ABSOLUTELY NO TEXT, LETTERS, NUMBERS, OR SYMBOLS in the image. 
- DO NOT draw speech bubbles, thought bubbles, or any labels.
- If the scene description mentions names or words, DO NOT draw them.
- ${isLastPanel ? `This is the FINAL panel. It MUST include a "Pet ID Card" or "Personality Card" held by the owner or shown next to the pet. The ID card MUST BE COMPLETELY BLANK (no text, no letters, no numbers). Style: cute pet ID card, rounded corners, pastel colors, small paw decorations.` : 'Focus entirely on visual storytelling through actions and expressions.'}

The output must be a single, full-page illustration for this specific panel.`;

        const contents: any = {
          parts: [{ text: prompt }]
        };

        if (referenceImage) {
          const resizedImage = await resizeImage(referenceImage, 800, 800);
          const mimeType = resizedImage.split(';')[0].split(':')[1] || 'image/jpeg';
          const base64Data = resizedImage.split(',')[1];
          contents.parts.unshift({
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          });
        }

        let response = null;
        let retries = 3;
        let baseDelay = 3000;

        for (let attempt = 0; attempt < retries; attempt++) {
          try {
            response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents
            });
            break; // Success
          } catch (error: any) {
            const isRateLimit = error?.status === 'RESOURCE_EXHAUSTED' || 
                               error?.message?.includes('429') || 
                               JSON.stringify(error).includes('429');
            
            if (isRateLimit && attempt < retries - 1) {
              const waitTime = baseDelay * Math.pow(2, attempt);
              console.warn(`Panel ${i + 1} rate limit hit (attempt ${attempt + 1}), retrying in ${waitTime}ms...`);
              await sleep(waitTime);
              continue;
            }
            throw error;
          }
        }

        let imageUrl = null;
        for (const part of response?.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }

        if (imageUrl) {
          generatedUrls.push(imageUrl);
          setComicImageUrls([...generatedUrls]); // Update UI progressively
        } else {
          throw new Error(`第 ${i + 1} 格生成失败`);
        }
      }
    } catch (error: any) {
      console.error('Comic generation failed:', error);
      const isRateLimit = error?.status === 'RESOURCE_EXHAUSTED' || 
                         error?.message?.includes('429') || 
                         JSON.stringify(error).includes('429');
      
      if (isRateLimit) {
        showToastWithMsg('生成速度过快，请稍等片刻再试哦');
      } else {
        showToastWithMsg('生成漫画失败，请重试');
      }
    } finally {
      setIsGeneratingComic(false);
      setComicGenerationProgress(0);
    }
  };

  const exportToImage = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPDF(true);
    
    try {
      // Use toPng for better compatibility in iframe
      const dataUrl = await htmlToImage.toPng(reportRef.current, {
        pixelRatio: 2,
        backgroundColor: '#FDFCF8',
        filter: (node) => {
          if (node instanceof HTMLElement && node.hasAttribute('data-html2canvas-ignore')) {
            return false;
          }
          return true;
        }
      });
      
      if (!dataUrl) throw new Error('截图生成失败');

      const fileName = `PetMBTI_${petName}_${new Date().toISOString().split('T')[0]}.png`;

      // Simplified download logic for better iframe compatibility
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToastWithMsg('报告图片已保存');
    } catch (error) {
      console.error('Image generation failed:', error);
      showToastWithMsg('生成报告图片失败，请重试');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!isAuthorized) {
    return <AuthGate onAuth={() => setIsAuthorized(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2D2D] font-sans selection:bg-[#FFE66D]">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#2D2D2D] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 className="text-emerald-400" /> {toastMessage || '已保存到下载文件夹'}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto px-6 py-12 flex flex-col items-center text-center"
          >
            <div className="mb-8 relative">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-32 h-32 bg-gradient-to-br from-[#FFE66D] to-[#FFD93D] rounded-full flex items-center justify-center shadow-2xl relative"
              >
                <PawPrint size={64} className="text-white drop-shadow-md" />
              </motion.div>
              <div className="absolute -top-2 -right-4 bg-[#FF6B6B] text-white px-3 py-1 rounded-full shadow-lg text-xs font-black tracking-tighter">
                PRO 增强版
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-tight">
              宠物灵性 <br/> <span className="text-[#FF6B6B]">漫画工坊</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-md font-medium">
              探索毛孩子的灵魂色彩，并将它们的性格转化为专属漫画。
            </p>

            <div className="w-full max-w-sm space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FFE66D] transition-colors">
                    <PawPrint size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="毛孩子的名字"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-[2rem] focus:border-[#FFE66D] outline-none transition-all text-xl font-bold placeholder:text-gray-200 shadow-sm"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FFE66D] transition-colors">
                    <Calendar size={20} />
                  </div>
                  <input
                    type="date"
                    value={petBirthday}
                    onChange={(e) => setPetBirthday(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-[2rem] focus:border-[#FFE66D] outline-none transition-all text-xl font-bold placeholder:text-gray-200 shadow-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                {[
                  { id: 'dog', label: '汪星人' },
                  { id: 'cat', label: '喵星人' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setPetType(type.id);
                      setSelectedBreedId(type.id === 'dog' ? 'other_dog' : 'other_cat');
                    }}
                    className={`flex-1 py-3 rounded-2xl border-2 transition-all font-black text-sm ${
                      petType === type.id 
                      ? 'border-[#FFE66D] bg-[#FFE66D] text-white shadow-md' 
                      : 'border-gray-100 text-gray-300 hover:border-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                {[
                  { id: 'male', label: '公', icon: <Mars size={16} /> },
                  { id: 'female', label: '母', icon: <Venus size={16} /> }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setPetGender(g.id)}
                    className={`flex-1 py-3 rounded-2xl border-2 transition-all font-black text-sm flex items-center justify-center gap-2 ${
                      petGender === g.id 
                      ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white shadow-md' 
                      : 'border-gray-100 text-gray-300 hover:border-gray-200'
                    }`}
                  >
                    {g.icon} {g.label}
                  </button>
                ))}
              </div>

              {(petType === 'dog' || petType === 'cat') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 text-left"
                >
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                    选择{petType === 'dog' ? '狗狗' : '猫猫'}品种
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBreedId}
                      onChange={(e) => setSelectedBreedId(e.target.value)}
                      className="w-full pl-6 pr-12 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#FFE66D] outline-none appearance-none font-bold text-gray-700 shadow-sm cursor-pointer"
                    >
                      {(petType === 'dog' ? BREED_DATA : CAT_BREED_DATA).map(breed => (
                        <option key={breed.id} value={breed.id}>
                          {breed.icon} {breed.name} ({breed.enName})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={20} />
                  </div>
                </motion.div>
              )}

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  上传照片 (可选，用于生成漫画)
                </label>
                <div className="p-4 bg-white border-2 border-dashed border-gray-100 rounded-2xl relative group hover:border-[#FFE66D] transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  {referenceImage ? (
                    <div className="flex items-center gap-4">
                      <img src={referenceImage} alt="Reference" className="w-16 h-16 object-cover rounded-xl shadow-md" />
                      <div className="flex-1">
                        <p className="text-sm font-black text-gray-700">照片已就绪</p>
                        <p className="text-[10px] text-gray-400">点击可更换照片</p>
                      </div>
                      <Upload size={20} className="text-[#FFE66D]" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 py-2">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:text-[#FFE66D] transition-colors">
                        <Camera size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-400">点击上传毛孩子照片</p>
                        <p className="text-[10px] text-gray-300">我们将根据照片生成专属漫画形象</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-6 bg-[#2D2D2D] text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                开启灵性之旅 <ArrowRight size={28} />
              </button>

              <div className="flex items-center gap-2 justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <AlertCircle size={14} className="text-gray-400" />
                <p className="text-[10px] text-gray-400 font-medium">
                  免责声明：品种倾向仅供参考，每个生命都是独特的个体。
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto px-6 py-12"
          >
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-xs font-black text-[#FF6B6B] uppercase tracking-[0.3em]">Deep Analysis</span>
                  <h2 className="text-3xl font-black">
                    {currentQuestionIndex + 1} <span className="text-gray-200">/ {QUESTIONS.length}</span>
                  </h2>
                </div>
                <p className="text-sm font-black text-[#FFE66D]">{Math.round(progress)}%</p>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#FFE66D] to-[#FFD93D] rounded-full shadow-sm"
                />
              </div>
            </div>

            <motion.h3 
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-black mb-12 leading-tight min-h-[4rem]"
            >
              {QUESTIONS[currentQuestionIndex]?.text}
            </motion.h3>

            <div className="grid grid-cols-1 gap-4">
              {QUESTIONS[currentQuestionIndex] && [...QUESTIONS[currentQuestionIndex].options, { text: "不清楚 / 没遇到过 / 不适用", dimension: 'EI', value: 0 }].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-6 bg-white border-2 rounded-3xl text-left transition-all group active:scale-[0.98] ${
                    answers[currentQuestionIndex] === idx 
                    ? 'border-[#FFE66D] bg-[#FFE66D]/5 shadow-lg' 
                    : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all shadow-sm ${
                      answers[currentQuestionIndex] === idx 
                      ? 'bg-[#FFE66D] text-white' 
                      : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`text-lg font-bold transition-colors ${
                      answers[currentQuestionIndex] === idx ? 'text-[#2D2D2D]' : 'text-gray-600'
                    }`}>
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-sm transition-all ${
                  currentQuestionIndex === 0 
                  ? 'text-gray-200 cursor-not-allowed' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-[#2D2D2D]'
                }`}
              >
                <ArrowLeft size={20} /> 上一题
              </button>

              <button
                onClick={handleNext}
                disabled={answers[currentQuestionIndex] === null}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm transition-all ${
                  answers[currentQuestionIndex] === null
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-[#2D2D2D] text-white hover:scale-105 shadow-lg'
                }`}
              >
                {currentQuestionIndex === QUESTIONS.length - 1 ? '查看结果' : '下一题'} <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto px-6 py-12"
          >
            <div ref={reportRef} className="rounded-[3rem] overflow-hidden border-8 relative" style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              <div 
                className="p-10 relative overflow-hidden"
                style={{ backgroundColor: resultType.color, color: '#ffffff' }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                      SPIRITUAL REPORT
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      {zodiac.name}
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      {petGender === 'male' ? '公' : petGender === 'female' ? '母' : '不确定'}
                    </span>
                  </div>
                  <h1 className="text-6xl font-black mb-4 tracking-tighter" style={{ color: '#ffffff' }}>{petName}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-3xl font-black px-4 py-1 rounded-xl" style={{ backgroundColor: '#ffffff', color: '#000000', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                      {zodiac.modifier}{resultType.elementModifier}{petType === 'dog' ? '犬' : petType === 'cat' ? '猫' : '灵'}
                    </span>
                    <span className="text-xl font-black px-4 py-1 rounded-xl" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: '#ffffff' }}>
                      {resultType.genderLabel}
                    </span>
                    <span className="text-2xl font-mono font-bold opacity-80" style={{ color: '#ffffff' }}>{resultType.code}</span>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-10">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-[2rem] text-center border" style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#d1d5db' }}>五行属性</div>
                    <div className="text-xl font-black" style={{ color: '#2D2D2D' }}>{wuXing.name}</div>
                  </div>
                  <div className="p-4 rounded-[2rem] text-center border" style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#d1d5db' }}>幸运色</div>
                    <div className="text-xl font-black" style={{ color: '#2D2D2D' }}>{zodiac.luckyColor}</div>
                  </div>
                  <div className="p-4 rounded-[2rem] text-center border" style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#d1d5db' }}>守护元素</div>
                    <div className="text-xl font-black" style={{ color: '#2D2D2D' }}>{zodiac.element}</div>
                  </div>
                </div>

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#FFE66D', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                      <Sparkles size={20} style={{ color: '#ffffff' }} />
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: '#2D2D2D' }}>人格深度解析</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xl font-bold leading-snug italic border-l-4 pl-6" style={{ color: '#374151', borderLeftColor: '#FFE66D' }}>
                      "{resultType.summary}"
                    </p>
                    <p className="leading-relaxed font-medium" style={{ color: '#6b7280' }}>
                      {resultType.description} {zodiac.trait}。
                    </p>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#dbeafe' }}>
                      <Zap size={20} style={{ color: '#3b82f6' }} />
                    </div>
                    <h2 className="text-2xl font-black" style={{ color: '#2D2D2D' }}>灵魂指数</h2>
                  </div>
                  <div className="space-y-5">
                    {[
                      { label: "情绪稳定指数", value: indices.stability, color: "#34d399" },
                      { label: "粘人撒娇指数", value: indices.clinginess, color: "#fb7185" },
                      { label: "拆家破坏指数", value: indices.destructiveness, color: "#fb923c" }
                    ].map((idx, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                          <span style={{ color: '#9ca3af' }}>{idx.label}</span>
                          <span style={{ color: '#374151' }}>{idx.value}%</span>
                        </div>
                        <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${idx.value}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                            className="h-full"
                            style={{ backgroundColor: idx.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-[2.5rem] border" style={{ backgroundColor: '#faf5ff', borderColor: '#f3e8ff' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#d8b4fe' }}>前世身份</div>
                    <div className="text-xl font-black" style={{ color: '#7e22ce' }}>{pastLife}</div>
                  </div>
                  <div className="p-6 rounded-[2.5rem] border" style={{ backgroundColor: '#fffbeb', borderColor: '#fef3c7' }}>
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#fcd34d' }}>今日运势</div>
                    <div className="text-xl font-black" style={{ color: '#b45309' }}>{fortune}</div>
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] border text-center" style={{ backgroundColor: '#f9fafb', borderColor: '#f3f4f6' }}>
                  <div className="flex justify-center gap-2 mb-4">
                    <Shield size={16} style={{ color: '#d1d5db' }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#d1d5db' }}>Algorithm Verification</span>
                  </div>
                  <p className="text-xs leading-relaxed font-medium" style={{ color: '#9ca3af' }}>
                    本报告基于行为心理学（MBTI模型）、习惯稳定性理论与星象倾向模型交叉校验生成。
                  </p>
                </div>

                <div className="pt-6 flex flex-col items-center gap-6">
                  <div className="flex flex-col gap-6 w-full">
                    {/* AI Manga Workshop Section */}
                    <section className="p-8 rounded-[2.5rem] border-4 space-y-6" style={{ backgroundColor: '#ffffff', borderColor: '#FFE66D', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#fffbeb' }}>
                          <Sparkles size={20} style={{ color: '#f59e0b' }} />
                        </div>
                        <h2 className="text-2xl font-black" style={{ color: '#2D2D2D' }}>AI 漫画工坊</h2>
                      </div>

                      <p className="text-sm text-[#6b7280] font-medium" style={{ color: '#6b7280' }}>
                        {referenceImage 
                          ? "已检测到照片！我们可以根据照片为毛孩子定制漫画形象和专属故事。" 
                          : "想要为毛孩子创作漫画？建议返回首页上传一张照片，效果会更棒哦！"}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-html2canvas-ignore>
                        {referenceImage && (
                          <button 
                            onClick={generateCharacterSheet}
                            disabled={isDesigning || isGeneratingComic || isGeneratingScript}
                            className="w-full py-5 bg-[#ffffff] border-4 border-[#60a5fa] text-[#2563eb] rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            style={{ backgroundColor: '#ffffff', borderColor: '#60a5fa', color: '#2563eb' }}
                          >
                            {isDesigning ? (
                              <>
                                <Loader2 size={24} className="animate-spin" /> 正在设计角色...
                              </>
                            ) : (
                              <>
                                <Camera size={24} /> {designResult ? '重新设计角色' : '生成漫画设定图'}
                              </>
                            )}
                          </button>
                        )}

                        <button 
                          onClick={generateComicScript}
                          disabled={isGeneratingScript || isGeneratingComic || isDesigning}
                          className="w-full py-5 bg-[#ffffff] border-4 border-[#FFE66D] text-[#2D2D2D] rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                          style={{ backgroundColor: '#ffffff', borderColor: '#FFE66D', color: '#2D2D2D' }}
                        >
                          {isGeneratingScript ? (
                            <>
                              <Loader2 size={24} className="animate-spin" /> 正在构思剧本...
                            </>
                          ) : (
                            <>
                              <FileText size={24} /> {comicScript ? '重新生成剧本' : '生成漫画剧本'}
                            </>
                          )}
                        </button>

                        <button 
                          onClick={generateComic}
                          disabled={isGeneratingComic || isGeneratingScript || isDesigning}
                          className="w-full py-5 bg-gradient-to-r from-[#FFE66D] to-[#FFD93D] text-[#2D2D2D] rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 md:col-span-2"
                          style={{ color: '#2D2D2D' }}
                        >
                          {isGeneratingComic ? (
                            <>
                              <Loader2 size={24} className="animate-spin" /> 正在创作漫画 ({comicGenerationProgress}/6)...
                            </>
                          ) : (
                            <>
                              <Sparkles size={24} /> {comicImageUrls.length > 0 ? '重新生成漫画' : '生成性格漫画'}
                            </>
                          )}
                        </button>
                      </div>

                      {/* Results of AI Generation */}
                      <div className="space-y-6">
                        {designResult && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-[#eff6ff] rounded-[2.5rem] border-2 border-[#dbeafe]"
                            style={{ backgroundColor: '#eff6ff', borderColor: '#dbeafe' }}
                          >
                            <div className="mb-4 flex justify-between items-center px-2">
                              <h3 className="font-black text-[#1d4ed8] flex items-center gap-2" style={{ color: '#1d4ed8' }}>
                                <Star className="text-[#60a5fa]" size={20} style={{ color: '#60a5fa' }} /> 漫画角色设定图
                              </h3>
                              <button 
                                onClick={() => {
                                  const a = document.createElement('a');
                                  a.href = designResult;
                                  a.download = `CharacterSheet_${petName}.png`;
                                  a.click();
                                }}
                                className="text-xs font-black text-[#60a5fa] hover:text-[#2563eb] flex items-center gap-1"
                                style={{ color: '#60a5fa' }}
                                data-html2canvas-ignore
                              >
                                <Share2 size={14} /> 保存
                              </button>
                            </div>
                            <img 
                              src={designResult} 
                              alt="Character Sheet" 
                              className="w-full rounded-2xl shadow-inner"
                              referrerPolicy="no-referrer"
                            />
                          </motion.div>
                        )}

                        {comicScript && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-8 bg-[#fffbeb] rounded-[2.5rem] border-2 border-[#fef3c7] shadow-inner"
                            style={{ backgroundColor: '#fffbeb', borderColor: '#fef3c7' }}
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <Edit3 size={18} className="text-[#f59e0b]" style={{ color: '#f59e0b' }} />
                              <h3 className="font-black text-[#b45309]" style={{ color: '#b45309' }}>漫画剧本预览</h3>
                            </div>
                            <div className="prose prose-sm max-w-none text-[#78350f]/80 font-medium leading-relaxed" style={{ color: 'rgba(120, 53, 15, 0.8)' }}>
                              <ReactMarkdown>{comicScript}</ReactMarkdown>
                            </div>
                          </motion.div>
                        )}

                        {comicImageUrls.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-[#ffffff] rounded-[2.5rem] border-4 border-[#FFE66D] shadow-xl overflow-hidden"
                            style={{ backgroundColor: '#ffffff', borderColor: '#FFE66D' }}
                          >
                            <div className="mb-4 flex justify-between items-center px-2">
                              <h3 className="font-black text-lg flex items-center gap-2" style={{ color: '#2D2D2D' }}>
                                <Star className="text-[#FFE66D]" size={20} style={{ color: '#FFE66D' }} /> 专属性格漫画
                              </h3>
                              <button 
                                onClick={async () => {
                                  const comicElement = document.getElementById('pet-comic-container');
                                  if (comicElement) {
                                    try {
                                      const dataUrl = await htmlToImage.toPng(comicElement, {
                                        backgroundColor: '#ffffff',
                                        pixelRatio: 2,
                                        filter: (node) => {
                                          if (node instanceof HTMLElement && node.hasAttribute('data-html2canvas-ignore')) {
                                            return false;
                                          }
                                          return true;
                                        }
                                      });
                                      const link = document.createElement('a');
                                      link.download = `PetComic_${petName}_Page${currentComicPage + 1}.png`;
                                      link.href = dataUrl;
                                      link.click();
                                      showToastWithMsg('当前页面已保存');
                                    } catch (err) {
                                      console.error('Save comic error:', err);
                                      showToastWithMsg('保存失败，请重试');
                                    }
                                  }
                                }}
                                className="text-xs font-black text-[#9ca3af] hover:text-[#2D2D2D] flex items-center gap-1"
                                style={{ color: '#9ca3af' }}
                                data-html2canvas-ignore
                              >
                                <Share2 size={14} /> 保存当前页
                              </button>
                            </div>
                            
                            {/* Comic Image with Text Overlays - Paginated View */}
                            <div className="relative">
                              <div id="pet-comic-container" className="relative w-full aspect-square rounded-2xl overflow-hidden border-4" style={{ backgroundColor: '#ffffff', borderColor: '#ffffff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                                <motion.div 
                                  key={currentComicPage}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="w-full h-full relative"
                                >
                                  {/* Each page is now a full image, no more cropping distortion */}
                                  <div className="absolute inset-0 overflow-hidden">
                                    {comicImageUrls[currentComicPage] ? (
                                      <img 
                                        src={comicImageUrls[currentComicPage]} 
                                        alt={`Panel ${currentComicPage + 1}`} 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
                                        <Loader2 className="animate-spin" size={48} style={{ color: '#d1d5db' }} />
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Text Overlay for current panel */}
                                  <div className="absolute top-4 left-4 right-4 pointer-events-none">
                                    <div className="px-4 py-2 rounded-2xl border shadow-lg inline-block max-w-[90%]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#f3f4f6' }}>
                                      <p className="text-sm md:text-base leading-tight font-black break-words" style={{ color: '#1f2937' }}>
                                        {parseComicScript(comicScript)[currentComicPage]?.speaker && (
                                          <span className="text-[10px] mr-1 opacity-70" style={{ color: '#f59e0b' }}>
                                            [{parseComicScript(comicScript)[currentComicPage]?.speaker}]
                                          </span>
                                        )}
                                        {parseComicScript(comicScript)[currentComicPage]?.text}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Page Indicator */}
                                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#ffffff' }}>
                                    {currentComicPage + 1} / 6
                                  </div>

                                  {/* Pet Card Overlay for the final panel */}
                                  {currentComicPage === 5 && (
                                    <div className="absolute bottom-12 left-4 pointer-events-none">
                                      <motion.div 
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#FFE66D] shadow-xl w-48 space-y-2"
                                      >
                                        <div className="flex items-center gap-2 mb-1">
                                          <div className="w-2 h-2 rounded-full bg-[#fb7185]" />
                                          <span className="text-[10px] font-black tracking-widest text-[#9ca3af] uppercase">Pet ID Card</span>
                                        </div>
                                        <div className="space-y-1">
                                          <div className="flex justify-between items-center">
                                            <span className="text-[8px] font-bold text-[#9ca3af]">NAME</span>
                                            <span className="text-xs font-black text-[#2D2D2D]">{petName}</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-[8px] font-bold text-[#9ca3af]">MBTI</span>
                                            <span className="text-xs font-black text-[#2D2D2D]">{resultType.code}</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-[8px] font-bold text-[#9ca3af]">ZODIAC</span>
                                            <span className="text-xs font-black text-[#2D2D2D]">{zodiac.name}</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-[8px] font-bold text-[#9ca3af]">TITLE</span>
                                            <span className="text-xs font-black text-[#2D2D2D]">{personalityTitle}</span>
                                          </div>
                                          <div className="pt-1 border-t border-dashed border-[#f3f4f6]">
                                            <div className="flex justify-between items-center">
                                              <span className="text-[8px] font-bold text-[#9ca3af]">CLINGINESS</span>
                                              <span className="text-xs font-black text-[#fb7185]">{indices.clinginess}%</span>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    </div>
                                  )}
                                </motion.div>
                              </div>

                              {/* Navigation Buttons */}
                              <div className="flex justify-between items-center mt-6 px-2" data-html2canvas-ignore>
                                <button
                                  onClick={() => setCurrentComicPage(prev => Math.max(0, prev - 1))}
                                  disabled={currentComicPage === 0}
                                  className={`p-4 rounded-2xl border-2 transition-all ${
                                    currentComicPage === 0 
                                    ? 'border-gray-50 text-gray-200 cursor-not-allowed' 
                                    : 'border-gray-100 text-gray-400 hover:border-[#FFE66D] hover:text-[#2D2D2D] active:scale-95'
                                  }`}
                                >
                                  <ArrowLeft size={24} />
                                </button>

                                <div className="flex gap-2">
                                  {[0, 1, 2, 3, 4, 5].map(i => (
                                    <button
                                      key={i}
                                      onClick={() => {
                                        if (comicImageUrls[i]) setCurrentComicPage(i);
                                      }}
                                      disabled={!comicImageUrls[i]}
                                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                                        currentComicPage === i ? 'bg-[#FFE66D] w-6' : 'bg-gray-200'
                                      } ${!comicImageUrls[i] ? 'opacity-30' : ''}`}
                                    />
                                  ))}
                                </div>

                                <button
                                  onClick={() => setCurrentComicPage(prev => Math.min(5, prev + 1))}
                                  disabled={currentComicPage === 5 || !comicImageUrls[currentComicPage + 1]}
                                  className={`p-4 rounded-2xl border-2 transition-all ${
                                    currentComicPage === 5 || !comicImageUrls[currentComicPage + 1]
                                    ? 'border-gray-50 text-gray-200 cursor-not-allowed' 
                                    : 'border-gray-100 text-gray-400 hover:border-[#FFE66D] hover:text-[#2D2D2D] active:scale-95'
                                  }`}
                                >
                                  <ArrowRight size={24} />
                                </button>
                              </div>
                            </div>

                            {/* Panel Text Guide (Optional helper) */}
                            <div className="mt-8 space-y-4" data-html2canvas-ignore>
                              <div className="flex items-center gap-2 px-2">
                                <FileText size={16} className="text-gray-400" />
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">剧本详情</h4>
                              </div>
                              <div className="grid grid-cols-1 gap-3">
                                {parseComicScript(comicScript).map((panel, idx) => (
                                  <button 
                                    key={idx}
                                    onClick={() => {
                                      setCurrentComicPage(idx);
                                      showToastWithMsg(`已跳转至第 ${idx + 1} 页`);
                                    }}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                                      currentComicPage === idx 
                                      ? 'border-[#FFE66D] bg-[#FFE66D]/5 shadow-sm' 
                                      : 'border-gray-50 bg-gray-50/50 hover:border-gray-100'
                                    }`}
                                  >
                                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                                      currentComicPage === idx ? 'bg-[#FFE66D] text-white' : 'bg-gray-100 text-gray-300'
                                    }`}>
                                      {idx + 1}
                                    </span>
                                    <p className={`text-sm font-bold leading-snug ${
                                      currentComicPage === idx ? 'text-gray-800' : 'text-gray-500'
                                    }`}>
                                      {panel.text}
                                    </p>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </section>

                    <div className="flex gap-4 w-full">
                      <button 
                        onClick={exportToImage}
                        disabled={isGeneratingPDF}
                        className="flex-1 py-5 bg-[#2D2D2D] text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGeneratingPDF ? (
                          <>
                            <Loader2 size={24} className="animate-spin" /> 生成中...
                          </>
                        ) : (
                          <>
                            <Share2 size={24} /> 保存报告图片
                          </>
                        )}
                      </button>
                      <button 
                        onClick={reset}
                        className="px-8 py-5 bg-gray-100 text-gray-500 rounded-[2rem] font-black text-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                      >
                        <RotateCcw size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="max-w-2xl mx-auto px-6 py-12 text-center">
        <button 
          onClick={handleLogout}
          className="text-gray-300 hover:text-gray-500 transition-colors flex items-center gap-2 mx-auto text-xs font-black uppercase tracking-widest"
        >
          <LogOut size={14} /> 退出验证系统
        </button>
      </footer>

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FFE66D] rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#FF6B6B] rounded-full blur-[150px]" 
        />
      </div>
    </div>
  );
}

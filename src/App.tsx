import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
  Infinity as InfinityIcon
} from 'lucide-react';
import { 
  QUESTIONS, 
  MBTI_TYPES, 
  ZODIAC_DATA, 
  WU_XING_DATA, 
  PAST_LIFE_DATA,
  BREED_DATA,
  CAT_BREED_DATA,
  GENDER_LABELS
} from './data';

type Step = 'home' | 'quiz' | 'result';

const AUTH_KEY = 'petmbti_auth';
const CODE = '1234';

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
  const [showToast, setShowToast] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

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
      alert('请输入你家毛孩子的名字哦！');
      return;
    }
    if (!petBirthday) {
      alert('请输入它的生日，我们需要计算星盘哦！');
      return;
    }
    setStep('quiz');
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStep('result');
      }
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

  const pastLife = useMemo(() => {
    const seed = (petName?.length || 0) + (petBirthday ? new Date(petBirthday).getTime() : 0);
    const index = isNaN(seed) ? 0 : Math.abs(Math.floor(seed)) % PAST_LIFE_DATA.length;
    return PAST_LIFE_DATA[index] || PAST_LIFE_DATA[0];
  }, [petName, petBirthday]);

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
    const fortunes = ["宜拆家，忌洗澡", "宜贴贴，忌出门", "宜加餐，忌运动", "宜睡觉，忌思考", "宜社交，忌独处"];
    const seed = new Date().getDate() + petName.length;
    return fortunes[seed % fortunes.length];
  }, [petName]);

  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const reset = () => {
    setStep('home');
    setCurrentQuestionIndex(0);
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setPetName('');
    setPetBirthday('');
    setPetGender('male');
    setSelectedBreedId(petType === 'dog' ? 'other_dog' : 'other_cat');
  };

  const exportToImage = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPDF(true);
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FDFCF8',
        logging: false
      });
      
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png', 1.0)
      );
      if (!blob) throw new Error('截图生成失败');

      const fileName = `PetMBTI_${petName}_${new Date().toISOString().split('T')[0]}.png`;

      // 手机端优先：系统分享
      const canShare =
        navigator.canShare &&
        navigator.canShare({
          files: [new File([blob], fileName, { type: 'image/png' })],
        });

      if (navigator.share && canShare) {
        const file = new File([blob], fileName, { type: 'image/png' });
        await navigator.share({
          title: "宠物人格报告",
          text: `这是我家 ${petName} 的灵性人格报告，快来看看吧！`,
          files: [file],
        });
      } else {
        // 桌面/不支持分享：直接下载
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('生成报告图片失败，请重试');
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
            <CheckCircle2 className="text-emerald-400" /> 已保存到下载文件夹
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
              宠物灵性人格 <br/> <span className="text-[#FF6B6B]">全书测试</span>
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-md font-medium">
              融合行为心理学与星象玄学，揭秘毛孩子的星座、五行与灵魂指数。
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
                  <p className="text-[10px] text-gray-400 italic ml-4">品种与性别将轻微影响性格分析结果</p>
                </motion.div>
              )}

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
              {QUESTIONS[currentQuestionIndex].text}
            </motion.h3>

            <div className="grid grid-cols-1 gap-4">
              {[...QUESTIONS[currentQuestionIndex].options, { text: "不清楚 / 没遇到过 / 不适用", dimension: 'EI', value: 0 }].map((option, idx) => (
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
            <div ref={reportRef} className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white relative">
              <div 
                className="p-10 text-white relative overflow-hidden"
                style={{ backgroundColor: resultType.color }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-black tracking-[0.3em] uppercase border border-white/30">
                      SPIRITUAL REPORT
                    </span>
                    <span className="px-4 py-1.5 bg-black/10 backdrop-blur-xl rounded-full text-[10px] font-black tracking-[0.3em] uppercase border border-white/10">
                      {zodiac.name}
                    </span>
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black tracking-[0.3em] uppercase border border-white/10">
                      {petGender === 'male' ? '公' : petGender === 'female' ? '母' : '不确定'}
                    </span>
                  </div>
                  <h1 className="text-6xl font-black mb-4 tracking-tighter">{petName}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-3xl font-black bg-white text-black px-4 py-1 rounded-xl shadow-lg">
                      {zodiac.modifier}{resultType.elementModifier}{petType === 'dog' ? '犬' : petType === 'cat' ? '猫' : '灵'}
                    </span>
                    <span className="text-xl font-black bg-black/20 px-4 py-1 rounded-xl">
                      {resultType.genderLabel}
                    </span>
                    <span className="text-2xl font-mono font-bold opacity-80">{resultType.code}</span>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-10">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-[2rem] text-center border border-gray-100">
                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">五行属性</div>
                    <div className="text-xl font-black text-[#2D2D2D]">{wuXing.name}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-[2rem] text-center border border-gray-100">
                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">幸运色</div>
                    <div className="text-xl font-black text-[#2D2D2D]">{zodiac.luckyColor}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-[2rem] text-center border border-gray-100">
                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">守护元素</div>
                    <div className="text-xl font-black text-[#2D2D2D]">{zodiac.element}</div>
                  </div>
                </div>

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFE66D] flex items-center justify-center shadow-lg">
                      <Sparkles size={20} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black">人格深度解析</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xl font-bold text-gray-700 leading-snug italic border-l-4 border-[#FFE66D] pl-6">
                      "{resultType.summary}"
                    </p>
                    <p className="text-gray-500 leading-relaxed font-medium">
                      {resultType.description} {zodiac.trait}。
                    </p>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <Zap size={20} className="text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-black">灵魂指数</h2>
                  </div>
                  <div className="space-y-5">
                    {[
                      { label: "情绪稳定指数", value: indices.stability, color: "bg-emerald-400" },
                      { label: "粘人撒娇指数", value: indices.clinginess, color: "bg-rose-400" },
                      { label: "拆家破坏指数", value: indices.destructiveness, color: "bg-orange-400" }
                    ].map((idx, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm font-black uppercase tracking-widest">
                          <span className="text-gray-400">{idx.label}</span>
                          <span className="text-gray-700">{idx.value}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${idx.value}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                            className={`h-full ${idx.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-purple-50 rounded-[2.5rem] border border-purple-100">
                    <div className="text-[10px] font-black text-purple-300 uppercase tracking-widest mb-2">前世身份</div>
                    <div className="text-xl font-black text-purple-700">{pastLife}</div>
                  </div>
                  <div className="p-6 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                    <div className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">今日运势</div>
                    <div className="text-xl font-black text-amber-700">{fortune}</div>
                  </div>
                </div>

                <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 text-center">
                  <div className="flex justify-center gap-2 mb-4">
                    <Shield size={16} className="text-gray-300" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Algorithm Verification</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    本报告基于行为心理学（MBTI模型）、习惯稳定性理论与星象倾向模型交叉校验生成。
                  </p>
                </div>

                <div className="pt-6 flex flex-col items-center gap-6">
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


import React, { useState, useEffect, useMemo } from 'react';
import { Module, PerspectiveType, ScripturePoint } from '../types';
import { getWisdomAssistantResponse } from '../services/geminiService';
import AudioNarration from './AudioNarration';
import SpeechInputButton from './SpeechInputButton';
import ClassInsight from './ClassInsight';

interface ModulePlayerProps {
  module: Module;
  onComplete: () => void;
}

type Step = 'LIFE_QUESTION' | 'PERSPECTIVES' | 'TENSION' | 'DISCUSSION' | 'SUMMARY';

const ModulePlayer: React.FC<ModulePlayerProps> = ({ module, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<Step>('LIFE_QUESTION');
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [showClassInsight, setShowClassInsight] = useState(false);

  const peerData = useMemo(() => {
    return {
      responses: [
        "與家人共進晚餐並分享當天趣事", "練習鋼琴演奏與古典音樂欣賞", "在社區公園慢跑與體能鍛鍊",
        "閱讀歷史書籍深入了解古代文明", "陪伴年邁父母散步並傾聽往事", "參加志工服務回饋社會需求",
        "鑽研烹飪技巧為愛人製作美食", "學習外語提升國際視野與溝通", "在陽台種植花卉觀察生命成長",
        "冥想與自我對話尋求內心平靜", "與好友深入談論人生理想與規劃", "觀看紀錄片反思環境與運續議題"
      ],
      stats: {
        '是': 12,
        '不是': 4,
        '不知道': 7
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleInputChange = (key: string, value: string) => {
    setUserInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSpeechTranscript = (key: string, transcript: string) => {
    const currentVal = userInputs[key] || '';
    const newVal = currentVal ? `${currentVal} ${transcript}` : transcript;
    handleInputChange(key, newVal);
  };

  const submitQuestion = async () => {
    const responses = module.lifeQuestions.map((q, idx) => {
      const val = userInputs[`life_question_input_${idx}`];
      return val ? `問題：${q}\n回答：${val}` : null;
    }).filter(Boolean).join('\n\n');

    if (!userInputs['life_question_input_0']) return;

    setIsLoadingFeedback(true);
    
    // 如果是第 1 課，我們不調用 AI 獲取回饋，直接跳轉到數據展示
    if (module.id === 1) {
      // 稍微模擬一下加載感，讓體驗更平滑
      await new Promise(resolve => setTimeout(resolve, 800));
      setAiFeedback("SKIPPED_FOR_MODULE_1");
    } else {
      const feedback = await getWisdomAssistantResponse(module, "生活回饋與反思", responses);
      setAiFeedback(feedback);
    }
    
    setIsLoadingFeedback(false);
    setShowClassInsight(true);
  };

  // Helper to render structured text beautifully
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={i} className="h-4" />;
      
      // Horizontal Rule
      if (trimmedLine.startsWith('⸻')) {
        return <hr key={i} className="my-6 border-slate-200" />;
      }

      // Bold headers or specific patterns
      const isHeader = trimmedLine.startsWith('【') || (trimmedLine.includes('：') && trimmedLine.length < 35);
      const isPoint = trimmedLine.startsWith('●') || trimmedLine.startsWith('•') || /^\d+\./.test(trimmedLine);
      const isQuote = trimmedLine.startsWith('「') && trimmedLine.endsWith('」');

      return (
        <div 
          key={i} 
          className={`leading-relaxed mb-2 ${
            isHeader ? 'text-slate-900 font-bold text-lg mt-6 mb-3' : 
            isPoint ? 'text-slate-800 font-semibold mt-4 text-base' : 
            isQuote ? 'text-amber-800 italic font-medium py-1 bg-amber-50/50 px-2 rounded border-l-2 border-amber-200' :
            'text-slate-700'
          }`}
        >
          {trimmedLine}
        </div>
      );
    });
  };

  const narrationText = useMemo(() => {
    switch (currentStep) {
      case 'LIFE_QUESTION':
        const feedbackPart = (module.id !== 1 && aiFeedback && aiFeedback !== "SKIPPED_FOR_MODULE_1") 
          ? `。導師的回饋是：${aiFeedback}` 
          : '';
        return `生活提問：${module.lifeQuestions.join('。位')}。${feedbackPart}`;
      case 'PERSPECTIVES':
        return (Object.values(module.perspectives) as ScripturePoint[])
          .map(p => `${p.book}的觀點：${p.theme}。${p.description}`)
          .join('。');
      case 'TENSION':
        return `價值張力引導：${module.tensionGuide}`;
      case 'DISCUSSION':
        return `互動討論提問：${module.discussionPrompts.join('。')}`;
      case 'SUMMARY':
        return `今天的安靜整合：${module.summary}`;
      default:
        return "";
    }
  }, [currentStep, module, aiFeedback]);

  const renderStep = () => {
    switch (currentStep) {
      case 'LIFE_QUESTION':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-amber-900">第一階段：生活提問 (8分鐘)</h3>
                <AudioNarration text={narrationText} />
              </div>
              <p className="text-slate-700 leading-relaxed mb-6 italic">「智慧的起點在於誠實地面對生活中的選擇。」</p>
              <div className="space-y-8">
                {module.lifeQuestions.map((q, idx) => {
                  const isRadioQuestion = module.id === 1 && idx === 1;
                  return (
                    <div key={idx} className="bg-white/50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-3">
                        <p className="font-medium text-slate-800 text-lg flex-grow pr-4">{q}</p>
                        {!isRadioQuestion && (
                          <SpeechInputButton 
                            onTranscript={(t) => handleSpeechTranscript(`life_question_input_${idx}`, t)} 
                          />
                        )}
                      </div>
                      <div className="relative">
                        {isRadioQuestion ? (
                          <div className="flex flex-wrap gap-4 mt-2">
                            {['是', '不是', '不知道'].map(option => (
                              <label 
                                key={option} 
                                className={`flex items-center space-x-3 cursor-pointer px-6 py-3 rounded-full border-2 transition-all ${
                                  userInputs[`life_question_input_${idx}`] === option 
                                    ? 'bg-amber-100 border-amber-500 shadow-sm' 
                                    : 'bg-white border-slate-200 hover:border-amber-200 hover:bg-amber-50/30'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`life_question_input_${idx}`}
                                  value={option}
                                  checked={userInputs[`life_question_input_${idx}`] === option}
                                  onChange={(e) => handleInputChange(`life_question_input_${idx}`, e.target.value)}
                                  className="w-5 h-5 text-amber-600 border-slate-300 focus:ring-amber-500"
                                />
                                <span className={`text-lg font-medium ${
                                  userInputs[`life_question_input_${idx}`] === option ? 'text-amber-900' : 'text-slate-600'
                                }`}>
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <textarea
                            className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-white/80"
                            placeholder="在此寫下您的想法 or 點擊上方麥克風..."
                            value={userInputs[`life_question_input_${idx}`] || ''}
                            onChange={(e) => handleInputChange(`life_question_input_${idx}`, e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {!aiFeedback && !isLoadingFeedback && (
                <button 
                  onClick={submitQuestion}
                  disabled={!userInputs['life_question_input_0']}
                  className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 disabled:opacity-50 transition-all font-medium shadow-md w-full sm:w-auto"
                >
                  尋求啟發並觀看同學回應
                </button>
              )}

              {isLoadingFeedback && (
                <div className="mt-8 flex items-center space-x-3 text-slate-500 italic">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                  <span>正在彙整課堂數據...</span>
                </div>
              )}

              {aiFeedback && (
                <div className="mt-8 animate-slideUp">
                  {/* 第 1 課不顯示 AI 導師回饋 */}
                  {module.id !== 1 && aiFeedback !== "SKIPPED_FOR_MODULE_1" && (
                    <div className="bg-white p-6 rounded-xl border border-amber-200 shadow-inner mb-8">
                      <h4 className="text-amber-600 font-bold mb-3 flex items-center">
                        <span className="mr-2 text-xl">💡</span> 智慧導師的回饋：
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-lg">{aiFeedback}</p>
                    </div>
                  )}

                  {showClassInsight && (
                    <ClassInsight 
                      moduleId={module.id} 
                      userResponses={userInputs} 
                      peerData={peerData}
                    />
                  )}

                  <button 
                    onClick={() => setCurrentStep('PERSPECTIVES')}
                    className="mt-10 w-full bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition-all font-bold shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>下一步：進入三方經文對照</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'PERSPECTIVES':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-800">第二階段：三卷書對照 (20分鐘)</h3>
              <AudioNarration text={narrationText} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.entries(module.perspectives) as [PerspectiveType, ScripturePoint][]).map(([type, point]) => (
                <div key={type} className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  type === PerspectiveType.ORDER ? 'bg-blue-50 border-blue-100' :
                  type === PerspectiveType.VANITY ? 'bg-slate-50 border-slate-200' :
                  'bg-red-50 border-red-100'
                }`}>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block ${
                      type === PerspectiveType.ORDER ? 'bg-blue-200 text-blue-800' :
                      type === PerspectiveType.VANITY ? 'bg-slate-200 text-slate-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {point.book}
                    </span>
                    <h4 className="text-xl font-bold mb-4 text-slate-900">{point.theme}</h4>
                    <div className="text-slate-700 text-sm lg:text-base mb-6 font-sans">
                      {renderFormattedText(point.description)}
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-200/50">
                    <AudioNarration text={`${point.book}的觀點：${point.theme}。${point.description}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-12">
              <button onClick={() => setCurrentStep('LIFE_QUESTION')} className="text-slate-500 hover:text-slate-800 font-medium flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
                返回
              </button>
              <button onClick={() => setCurrentStep('TENSION')} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 font-bold shadow-md">進入張力引導</button>
            </div>
          </div>
        );

      case 'TENSION':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-800">第三階段：價值張力引導 (15分鐘)</h3>
              <AudioNarration text={narrationText} />
            </div>
            <div className="bg-white border-2 border-amber-200 p-6 md:p-10 rounded-3xl shadow-sm">
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-slate-900 flex items-center mb-1">
                  <svg className="w-6 h-6 mr-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {module.id === 1 ? '什麼是智慧？' : '如何處理這些矛盾？'}
                </h4>
                {module.id === 1 && (
                  <p className="text-amber-700 font-bold ml-9">聖經中「智慧」</p>
                )}
              </div>
              <div className="text-lg text-slate-700 leading-relaxed mb-8 serif">
                {renderFormattedText(module.tensionGuide)}
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep('PERSPECTIVES')} className="text-slate-500 hover:text-slate-800 font-medium">返回</button>
              <button onClick={() => setCurrentStep('DISCUSSION')} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 font-bold shadow-md">小組互動討論</button>
            </div>
          </div>
        );

      case 'DISCUSSION':
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-800">第四階段：互動討論 (12分鐘)</h3>
              <AudioNarration text={narrationText} />
            </div>
            <div className="space-y-6">
              {module.discussionPrompts.map((prompt, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-lg font-bold text-slate-800 flex-grow pr-4">{prompt}</p>
                    <SpeechInputButton 
                      onTranscript={(t) => handleSpeechTranscript(`discussion_${idx}`, t)} 
                    />
                  </div>
                  <textarea
                    className="w-full h-32 p-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none shadow-inner"
                    placeholder="在此輸入討論記錄或點擊麥克風..."
                    value={userInputs[`discussion_${idx}`] || ''}
                    onChange={(e) => handleInputChange(`discussion_${idx}`, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setCurrentStep('TENSION')} className="text-slate-500 hover:text-slate-800 font-medium">返回</button>
              <button onClick={() => setCurrentStep('SUMMARY')} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 font-bold shadow-md">最後沈思</button>
            </div>
          </div>
        );

      case 'SUMMARY':
        return (
          <div className="space-y-12 animate-fadeIn text-center py-8">
            <div className="max-w-xl mx-auto space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-2xl font-bold text-slate-800">第五階段：安靜整合 (5分鐘)</h3>
                <AudioNarration text={narrationText} />
              </div>
              <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl">
                <p className="text-2xl font-bold mb-6 serif leading-relaxed">
                  「{module.summary}」
                </p>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-center space-x-3">
                  <p className="text-slate-600 font-medium">寫下一句話給今天的自己：</p>
                  <SpeechInputButton 
                    onTranscript={(t) => handleSpeechTranscript('summary_input', t)} 
                  />
                </div>
                <input 
                  type="text" 
                  className="w-full border-b-2 border-slate-300 focus:border-amber-500 py-3 px-2 outline-none text-xl text-center text-slate-800 bg-transparent"
                  placeholder="在此輸入或點擊語音按鈕..."
                  value={userInputs['summary_input'] || ''}
                  onChange={(e) => handleInputChange('summary_input', e.target.value)}
                />
              </div>
              <button 
                onClick={onComplete}
                className="mt-8 bg-amber-600 text-white px-12 py-4 rounded-full hover:bg-amber-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                完成本堂課
              </button>
            </div>
          </div>
        );
    }
  };

  const steps: { key: Step; label: string }[] = [
    { key: 'LIFE_QUESTION', label: '生活提問' },
    { key: 'PERSPECTIVES', label: '經文對照' },
    { key: 'TENSION', label: '張力引導' },
    { key: 'DISCUSSION', label: '互動討論' },
    { key: 'SUMMARY', label: '安靜整合' }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 serif">
          {module.title}
        </h2>
        <p className="text-slate-500 tracking-wide uppercase text-sm font-medium">{module.subtitle}</p>
      </div>

      <div className="mb-12 flex justify-between items-center relative px-2">
        <div className="absolute left-0 right-0 h-0.5 bg-slate-200 top-1/2 -translate-y-1/2 z-0"></div>
        {steps.map((s, idx) => {
          const isActive = s.key === currentStep;
          const isCompleted = steps.findIndex(step => step.key === currentStep) > idx;
          
          return (
            <div key={s.key} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                  isActive ? 'bg-amber-500 border-amber-500 text-white scale-110 shadow-amber-200' : 
                  isCompleted ? 'bg-slate-900 border-slate-900 text-white' : 
                  'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (idx + 1)}
              </div>
              <span className={`text-[10px] md:text-xs mt-2 font-bold whitespace-nowrap ${
                isActive ? 'text-amber-600' : 'text-slate-400'
              }`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="min-h-[500px] bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        {renderStep()}
      </div>
    </div>
  );
};

export default ModulePlayer;

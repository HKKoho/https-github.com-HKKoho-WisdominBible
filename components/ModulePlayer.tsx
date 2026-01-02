
import React, { useState, useEffect, useMemo } from 'react';
import { Module, PerspectiveType, ScripturePoint } from '../types';
import { getWisdomAssistantResponse } from '../services/geminiService';
import AudioNarration from './AudioNarration';
import SpeechInputButton from './SpeechInputButton';

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

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
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
    const input = userInputs['life_question_input'];
    if (!input) return;

    setIsLoadingFeedback(true);
    const feedback = await getWisdomAssistantResponse(module, module.lifeQuestions[0], input);
    setAiFeedback(feedback);
    setIsLoadingFeedback(false);
  };

  // Prepare text for narration based on current step
  const narrationText = useMemo(() => {
    switch (currentStep) {
      case 'LIFE_QUESTION':
        return `生活提問：${module.lifeQuestions.join('。')}${aiFeedback ? `。導師的回饋是：${aiFeedback}` : ''}`;
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
              <div className="space-y-6">
                {module.lifeQuestions.map((q, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-medium text-slate-800 text-lg">{q}</p>
                      {idx === 0 && (
                        <SpeechInputButton 
                          onTranscript={(t) => handleSpeechTranscript('life_question_input', t)} 
                        />
                      )}
                    </div>
                    {idx === 0 && (
                      <div className="relative">
                        <textarea
                          className="w-full h-40 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all pr-12"
                          placeholder="在此寫下您的想法 or 使用右上方語音輸入..."
                          value={userInputs['life_question_input'] || ''}
                          onChange={(e) => handleInputChange('life_question_input', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {!aiFeedback && !isLoadingFeedback && (
                <button 
                  onClick={submitQuestion}
                  disabled={!userInputs['life_question_input']}
                  className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 disabled:opacity-50 transition-all font-medium"
                >
                  尋求啟發
                </button>
              )}

              {isLoadingFeedback && (
                <div className="mt-6 flex items-center space-x-3 text-slate-500 italic">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                  <span>導師正在研讀您的回應...</span>
                </div>
              )}

              {aiFeedback && (
                <div className="mt-8 bg-white p-6 rounded-xl border border-amber-200 shadow-inner animate-slideUp">
                  <h4 className="text-amber-600 font-bold mb-3 flex items-center">
                    <span className="mr-2">💡</span> 智慧導師的回饋：
                  </h4>
                  <p className="text-slate-700 leading-relaxed leading-extra">{aiFeedback}</p>
                  <button 
                    onClick={() => setCurrentStep('PERSPECTIVES')}
                    className="mt-6 w-full md:w-auto bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-all font-bold"
                  >
                    進入三方經文對照
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
                  type === PerspectiveType.ORDER ? 'bg-blue-50 border-blue-100 hover:shadow-lg' :
                  type === PerspectiveType.VANITY ? 'bg-slate-50 border-slate-200 hover:shadow-lg' :
                  'bg-red-50 border-red-100 hover:shadow-lg'
                }`}>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-4 inline-block ${
                      type === PerspectiveType.ORDER ? 'bg-blue-200 text-blue-800' :
                      type === PerspectiveType.VANITY ? 'bg-slate-200 text-slate-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {point.book}
                    </span>
                    <h4 className="text-xl font-bold mb-3 text-slate-900">{point.theme}</h4>
                    <p className="text-slate-700 leading-relaxed text-sm lg:text-base mb-6">{point.description}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-200/50">
                    <AudioNarration text={`${point.book}的觀點：${point.theme}。${point.description}`} />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-100 p-6 rounded-xl text-center">
              <p className="text-slate-600 italic">「智慧不是選邊站，而是學會在三種視角中活得成熟。」</p>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setCurrentStep('LIFE_QUESTION')} className="text-slate-500 hover:text-slate-800">返回</button>
              <button onClick={() => setCurrentStep('TENSION')} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 font-bold">進入張力引導</button>
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
            <div className="bg-white border-2 border-amber-200 p-8 rounded-3xl shadow-sm">
              <h4 className="text-xl font-bold text-amber-700 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                如何處理這些矛盾？
              </h4>
              <p className="text-lg text-slate-700 leading-relaxed mb-8 serif">
                {module.tensionGuide}
              </p>
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 italic text-amber-900">
                箴言給我們地圖（秩序），傳道書告訴我們天氣會變（無常），約伯記提醒我們地圖有時會被撕碎（反常）。
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep('PERSPECTIVES')} className="text-slate-500 hover:text-slate-800">返回</button>
              <button onClick={() => setCurrentStep('DISCUSSION')} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 font-bold">小組互動討論</button>
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
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-lg font-bold text-slate-800 flex-grow pr-4">{prompt}</p>
                    <SpeechInputButton 
                      onTranscript={(t) => handleSpeechTranscript(`discussion_${idx}`, t)} 
                    />
                  </div>
                  <textarea
                    className="w-full h-32 p-4 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
                    placeholder="在小組討論後，記下您的體悟或使用語音輸入..."
                    value={userInputs[`discussion_${idx}`] || ''}
                    onChange={(e) => handleInputChange(`discussion_${idx}`, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setCurrentStep('TENSION')} className="text-slate-500 hover:text-slate-800">返回</button>
              <button onClick={() => setCurrentStep('SUMMARY')} className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 font-bold">最後沈思</button>
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
              <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl transform rotate-1">
                <p className="text-2xl font-bold mb-6 serif leading-relaxed">
                  「{module.summary}」
                </p>
                <p className="text-slate-400 text-sm">—— 今天的核心智慧</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-slate-600">寫下一句話給今天的自己：</p>
                  <SpeechInputButton 
                    onTranscript={(t) => handleSpeechTranscript('summary_input', t)} 
                  />
                </div>
                <input 
                  type="text" 
                  className="w-full border-b-2 border-slate-300 focus:border-amber-500 py-3 px-2 outline-none text-xl text-center text-slate-800"
                  placeholder="在此輸入或用語音描述..."
                  value={userInputs['summary_input'] || ''}
                  onChange={(e) => handleInputChange('summary_input', e.target.value)}
                />
              </div>
              <button 
                onClick={onComplete}
                className="mt-8 bg-amber-600 text-white px-12 py-4 rounded-full hover:bg-amber-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl"
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
    <div className="max-w-4xl mx-auto">
      {/* Module Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2 serif">
          {module.title}
          {module.id !== 1 && (
            <span className="text-lg font-normal text-slate-400 ml-3">(正在構建中)</span>
          )}
        </h2>
        <p className="text-slate-500 tracking-wide uppercase text-sm font-medium">{module.subtitle}</p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-12 flex justify-between items-center relative px-2">
        <div className="absolute left-0 right-0 h-0.5 bg-slate-200 top-1/2 -translate-y-1/2 z-0"></div>
        {steps.map((s, idx) => {
          const isActive = s.key === currentStep;
          const isCompleted = steps.findIndex(step => step.key === currentStep) > idx;
          
          return (
            <div key={s.key} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isActive ? 'bg-amber-500 border-amber-500 text-white scale-110' : 
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

      {/* Main Content Area */}
      <div className="min-h-[500px]">
        {renderStep()}
      </div>
    </div>
  );
};

export default ModulePlayer;

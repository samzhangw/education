import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2, X, MessageSquare, Sparkles } from 'lucide-react';
import { ChatMessage, StudentCategory } from './types';
import { ADMISSION_PATHS, IMPORTANT_DATES, CATEGORIES } from './constants';

interface ChatProps {
  currentCategory: StudentCategory;
}

export default function Chat({ currentCategory }: ChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '哈囉！我是你的升學小幫手。對於 115 學年度的升學管道、準備方向或重要日期有任何問題嗎？歡迎隨時問我！',
      timestamp: Date.now(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const categoryName = CATEGORIES.find(c => c.id === currentCategory)?.label;
      const categoryPaths = ADMISSION_PATHS[currentCategory];
      
      const systemPrompt = `
        你是一個專業的台灣升學輔導顧問 AI。
        目前使用者正在瀏覽「${categoryName}」的資訊。
        
        請根據以下資料回答使用者的問題：
        
        【升學管道】:
        ${JSON.stringify(categoryPaths)}

        【重要日期】:
        ${JSON.stringify(IMPORTANT_DATES.filter(d => d.category.includes(currentCategory)))}

        回答原則：
        1. 語氣親切、鼓勵學生。
        2. 針對「${categoryName}」的學生背景回答。
        3. 如果問題超出範圍，請委婉告知並提供相關建議。
        4. 回答盡量條理分明，使用點列式說明。
        5. 不要捏造日期，如果資料中沒有，請說明以簡章為主。
        6. 強調這是 115 學年度的最新資訊。
      `;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';

      const response = await ai.models.generateContent({
        model: model,
        contents: userMessage.text,
        config: {
            temperature: 0.7,
            systemInstruction: systemPrompt,
        }
      });

      const text = response.text || "抱歉，我現在無法回答，請稍後再試。";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: text,
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: '抱歉，連線發生錯誤，請檢查網路或稍後再試。',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full shadow-lg shadow-indigo-500/40 hover:scale-105 transition-all z-50 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-6 h-6" />
        <span className="font-medium hidden md:inline">升學問答</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] h-[85vh] md:h-[650px] bg-white md:rounded-3xl shadow-2xl z-50 flex flex-col border border-slate-100 animate-in slide-in-from-bottom-5 duration-300 overflow-hidden font-sans">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-slate-100 absolute top-0 w-full z-10">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-xl">
                 <Bot className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">AI 升學顧問</h3>
                <p className="text-[10px] font-medium text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full w-fit">Gemini 技術支援</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 pt-20 pb-4 space-y-6 bg-slate-50 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-white text-indigo-600 border border-slate-100'
                  }`}
                >
                  {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                </div>
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-slate-800 text-slate-50 rounded-tr-sm'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-white border border-slate-100 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Sparkles size={14} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  <span className="text-xs text-slate-400 font-medium">AI 正在思考中...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative"
            >
              <input
                aria-label="輸入問題"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="輸入問題 (例如: 統測分發的日期?)"
                className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all placeholder:text-slate-400 font-medium text-slate-700"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({
        name: name.trim(),
        loginTime: new Date()
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-12 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center text-amber-600 text-3xl font-bold mx-auto mb-4">
            智
          </div>
          <h2 className="text-3xl font-bold text-slate-800 serif">加入智慧課堂</h2>
          <p className="text-slate-500 mt-2">請輸入您的名字以開始今天的旅程</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">您的名字 / 稱呼</label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-4 rounded-xl border-2 border-slate-100 focus:border-amber-500 focus:ring-0 outline-none transition-all text-lg text-center"
              placeholder="例如：提摩太"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            進入課程
          </button>
        </form>
        
        <p className="mt-8 text-center text-slate-400 text-xs leading-relaxed">
          「智慧的價值勝過珍珠；你一切所喜愛的，都不足與比較。」<br/>—— 箴言 3:15
        </p>
      </div>
    </div>
  );
};

export default Login;

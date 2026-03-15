import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. Zod sxemasini yaratamiz (Validatsiya qoidalari)
const schema = z.object({
  email: z.string().email("Noto'g'ri email kiritildi").min(1, "Email shart"),
  password: z.string().min(10, "Parol kamida 10 ta belgi bo'lishi kerak"),
  confirmPassword: z.string().min(1, "Parolni tasdiqlash shart"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Parollar mos kelmadi",
  path: ["confirmPassword"], 
});

const HookForm = () => {
  const [isDone, setIsDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Muvaffaqiyatli yuborildi:", data);
    setIsDone(true);
    reset(); 
        setTimeout(() => setIsDone(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Ro'yxatdan o'tish
        </h2>

        {isDone && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center text-sm">
            Muvaffaqiyatli ro'yxatdan o'tdingiz! ✅
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-md outline-none transition-all duration-200 
                ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`}
              {...register("email")}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Parol maydoni */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Parol</label>
            <input
              type="password"
              placeholder="••••••••••"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-md outline-none transition-all duration-200 
                ${errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`}
              {...register("password")}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Tasdiqlash</label>
            <input
              type="password"
              placeholder="••••••••••"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border rounded-md outline-none transition-all duration-200 
                ${errors.confirmPassword ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'}`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-300 shadow-md active:scale-[0.98] 
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Yuborilmoqda...' : "Ro'yxatdan o'tish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HookForm;
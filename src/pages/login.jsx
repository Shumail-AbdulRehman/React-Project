import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH } from '../API';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const { setToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [fields, setFields] = useState([
    {
      type: 'email',
      placeholder: 'Enter your email address',
      name: 'email',
      value: '',
      isRequired: true,
    },
    {
      type: 'password',
      placeholder: 'Enter your password',
      name: 'password',
      value: '',
      isRequired: true,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});

    axios
      .post(`${AUTH}/user/consumer/login`, data)
      .then((res) => {
        toast.success(res.data.message);
        setFields(
          fields.map((field) => ({ ...field, value: '' }))
        );
        localStorage.setItem('ticKitToken', res.data.token);
        setToken(res.data.token);
        const redirectPath = location.state?.from || '/';
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Something went wrong');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-500 flex justify-center items-center relative">
      {/* Decorative Circles */}
      <div className="absolute w-96 h-96 bg-pink-300 blur-3xl rounded-full opacity-50 top-10 left-10"></div>
      <div className="absolute w-80 h-80 bg-purple-400 blur-2xl rounded-full opacity-40 bottom-10 right-10"></div>

      <div className="w-full max-w-3xl bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-800 p-12 rounded-3xl shadow-2xl backdrop-blur-xl border border-pink-400">
        <h1 className="text-6xl font-extrabold text-center text-white mb-6 tracking-widest animate-pulse">
          LOGIN TO TIKTAK
        </h1>
        <p className="text-fuchsia-300 text-center mb-8 text-xl italic">
          Your exclusive gateway to unforgettable experiences!
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          {fields.map((field, index) => (
            <div key={index} className="relative">
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={(e) =>
                  setFields((prevFields) =>
                    prevFields.map((f, i) =>
                      i === index ? { ...f, value: e.target.value } : f
                    )
                  )
                }
                placeholder={field.placeholder}
                required={field.isRequired}
                className="w-full bg-gray-900 text-white placeholder-pink-300 rounded-full px-6 py-4 focus:outline-none focus:ring-4 focus:ring-pink-400 shadow-lg text-lg"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-fuchsia-500 text-white font-bold py-4 rounded-full hover:shadow-pink-500/50 hover:scale-105 transform transition-all text-lg"
          >
            Login
          </button>
        </form>
        <p className="text-fuchsia-300 text-center mt-8 text-lg">
          Don't have an account?{' '}
          <span
            className="text-yellow-300 cursor-pointer hover:underline hover:text-yellow-400 transition"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

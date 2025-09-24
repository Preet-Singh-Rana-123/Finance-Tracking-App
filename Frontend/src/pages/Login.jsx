import { useState } from 'react';
import { loginApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // You can now send formData to your backend API
    try {
      await loginApi(formData);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center m-8 mb-4">
        <h1 className="text-5xl text-white bg-blue-500 border-4 border-blue-600 w-fit rounded-full py-2.5 px-5">
          &#8377;
        </h1>
        <h2 className="text-4xl font-bold mt-2">Welcome back</h2>
        <p className="mt-1">Sign in to your account to continue</p>
      </div>

      <form
        className="flex flex-col items-center space-y-6 mt-[2rem]"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="flex flex-col w-[400px]">
          <label htmlFor="email" className="text-base mb-1 font-semibold">
            Email address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@gmail.com"
            className="border-2 border-slate-200 p-2 rounded-lg"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-[400px]">
          <label htmlFor="password" className="text-base mb-1 font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="border-2 border-slate-200 p-2 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-[400px] cursor-pointer duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md mt-4 mb-[4px]"
        >
          Login
        </button>
        <p>
          If don't have account,{' '}
          <a className="text-blue-600" href="/register">
            Sign in
          </a>
        </p>
      </form>
    </>
  );
};

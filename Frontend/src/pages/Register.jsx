import { useState } from "react";
import { registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [formData, setFormData] = useState({
        profilePic: null,
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    // Preview URL for image display
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, profilePic: file }));
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setFormData((prev) => ({ ...prev, profilePic: null }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await registerApi(formData);
            console.log("Form Data:", formData);
            // console.log(userData)
            navigate("/login");
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
                <h2 className="text-4xl font-bold mt-2">Create account</h2>
                <p className="mt-1">Join us and start managing your finances better</p>
            </div>

            <form
                className="flex flex-col items-center space-y-6"
                onSubmit={handleSubmit}
            >
                {/* Profile Picture */}
                <div className="flex flex-col w-[400px] items-center">
                    <label
                        htmlFor="profile_pic_url"
                        className="text-base mb-2 font-semibold text-gray-700"
                    >
                        Profile Picture:
                    </label>

                    <div className="relative">
                        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-blue-500 shadow-md flex items-center justify-center bg-gray-100">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No Image</span>
                            )}
                        </div>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            id="profile_pic_url"
                            name="profilePic"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Upload / Remove Button */}
                        <div className="absolute bottom-0 right-0 flex space-x-1">
                            {preview ? (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md"
                                >
                                    ❌
                                </button>
                            ) : (
                                <label
                                    htmlFor="profile_pic_url"
                                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md cursor-pointer"
                                >
                                    Upload
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                {/* Name */}
                <div className="flex flex-col w-[400px]">
                    <label htmlFor="name" className="text-base mb-1 font-semibold">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="border-2 border-slate-200 p-2 rounded-lg"
                        required
                    />
                </div>

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
                        placeholder="Create a strong password"
                        className="border-2 border-slate-200 p-2 rounded-lg"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 w-[400px] cursor-pointer duration-300 text-white font-bold py-2 px-6 rounded-lg shadow-md mt-4 mb-[4px]"
                >
                    Create Account
                </button>
                <p>
                    If already have account then,{" "}
                    <a className="text-blue-600" href="/login">
                        Sign in
                    </a>
                </p>
            </form>
        </>
    );
};

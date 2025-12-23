import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state)?.from || "/";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const primaryColor = "#d1af5d";

    const onSubmit = async (data: LoginForm) => {
        await new Promise((r) => setTimeout(r, 800));

        login({
            email: data.email,
            collections: ["rasa-luxe", "vrindas", "ladli"],
        });

        navigate(from, { replace: true });
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Broker Login
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Sign in to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">
                                Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#d1af5d]">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#d1af5d]/20 focus:border-[#d1af5d] outline-none"
                                    placeholder="Email Address"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#d1af5d]">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    className="block w-full pl-11 pr-12 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#d1af5d]/20 focus:border-[#d1af5d] outline-none"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Login Button */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#d1af5d] text-white hover:bg-[#c9a94f] h-12 font-bold text-lg"
                        >
                            {isSubmitting ? "Verifying..." : "Login & Continue"}
                        </Button>

                        {/* Back Button (below login) */}
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 transition-all w-full mt-2"
                        >
                            <ArrowLeft size={16} style={{ color: primaryColor }} />
                            <span className="text-sm font-medium">Back to Home</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

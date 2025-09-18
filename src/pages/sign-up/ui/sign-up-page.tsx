import { useForm } from "react-hook-form";
import { AuthLayout, Button } from "../../../shared/ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import defaultAvatar from "../../../assets/auth/default_avatar.png";
import { paths } from "../../../shared/constants";
import { Link } from "react-router";
import { useAuth } from "../../../shared/hooks/use-auth";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    avatar: z.file("Please upload a file").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export const SignUpPage = () => {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });
  const [avatarPreview, setAvatarPreview] = useState<File | null>(null);
  const onSubmit = async (data: SignUpForm) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
        avatar: avatarPreview ?? undefined,
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <label htmlFor="profile-pic" className="text-sm font-medium flex items-center gap-4">
            <img
              className="w-[80px] h-[80px] rounded-full"
              src={avatarPreview ? URL.createObjectURL(avatarPreview) : defaultAvatar}
              alt="avatar"
            />
            <input
              id="profile-pic"
              type="file"
              className="mb-4 bg-black hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  setAvatarPreview(file);
                }
              }}
            />
            <span className="inline-block"> Upload new</span>
          </label>
          <button type="button" onClick={() => setAvatarPreview(null)}>
            Remove
          </button>
        </div>
        <label htmlFor="username">
          <input
            type="text"
            className="w-[554px] h-[42px] rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
            placeholder="username"
            {...register("username")}
          />
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          <input
            type="email"
            className="w-[554px] h-[42px] rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
            placeholder="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors?.email?.message}</p>
          )}
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          <input
            type="password"
            className="w-[554px] h-[42px] rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors?.password?.message}</p>
          )}
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          <input
            type="password"
            className="w-[554px] h-[42px] rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
            placeholder="confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors?.confirmPassword?.message}</p>
          )}
        </label>
        <Button type="submit" size="large" className="mb-12 w-full">
          Sign Up
        </Button>
        <div className="w-full text-center text-sm">
          <span className="text-[#10151F]">Already member? </span>
          <Link to={paths.signIn} className="text-[#FF4000]">Login</Link>
        </div>
      </form>
    </AuthLayout >
  );
};

import { useForm } from "react-hook-form";
import { AuthLayout, Button, Input } from "../../../shared/ui";
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
    setError,
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
      setError("root", { message: "Something went wrong" });
    }
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <label
            htmlFor="profile-pic"
            className="text-sm font-medium flex items-center gap-4"
          >
            <img
              className="w-[80px] h-[80px] rounded-full"
              src={
                avatarPreview
                  ? URL.createObjectURL(avatarPreview)
                  : defaultAvatar
              }
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
            {errors.avatar?.message && (
              <p className="text-red-600">{errors.avatar.message}</p>
            )}
          </label>
          <button type="button" onClick={() => setAvatarPreview(null)}>
            Remove
          </button>
        </div>
        <Input
          label="username"
          type="text"
          className="w-[554px] h-[42px]"
          placeholder="username"
          {...register("username")}
          error={errors.username?.message}
        />
        <Input
          label="email"
          type="email"
          className="w-[554px] h-[42px] "
          placeholder="email"
          {...register("email")}
        />

        <Input
          label="password"
          type="password"
          className="w-[554px] h-[42px]"
          placeholder="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          label="confirm password"
          type="password"
          className="w-[554px] h-[42px]"
          placeholder="confirm password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" size="large" className="mb-12 w-full">
          Sign Up
        </Button>
        {errors.root?.message && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        <div className="w-full text-center text-sm">
          <span className="text-[#10151F]">Already member? </span>
          <Link to={paths.signIn} className="text-[#FF4000]">
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

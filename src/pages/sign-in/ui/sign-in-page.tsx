import { useForm } from "react-hook-form";
import { AuthLayout, Button, Input } from "../../../shared/ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { paths } from "../../../shared/constants";
import { useAuth } from "../../../shared/hooks/use-auth";

const signInSchema = z.object({
  identifier: z
    .union([z.string().email("Invalid email"), z.string().min(3, "Too short")])
    .refine((val) => !!val, { message: "Required" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export const SignInPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      await login(data.identifier, data.password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mr-[45px]">
        <Input
          label="identifier"
          type="text"
          className="w-[554px] h-[42px]"
          placeholder="Email or username"
          {...register("identifier")}
          error={errors.identifier?.message}
        />

        <Input
          label="password"
          type="password"
          className="w-[554px] h-[42px]"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          size="large"
          className="mb-4 w-full"
          disabled={isSubmitting}
        >
          Log In
        </Button>
        <div className="w-full text-center text-sm">
          <span className="text-[#10151F]">Not a member? </span>
          <Link to={paths.signUp} className="text-[#FF4000]">
            Register
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

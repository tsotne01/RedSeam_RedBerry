import { useForm } from "react-hook-form";
import { AuthLayout, Button } from "../../../shared/ui";
import { client } from "../../../shared/api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { paths } from "../../../shared/constants";

const signInSchema = z.object({
  identifier: z
    .union([z.string().email("Invalid email"), z.string().min(3, "Too short")])
    .refine((val) => !!val, { message: "Required" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInForm = z.infer<typeof signInSchema>;

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      const res = await client.post("/login", {
        email: data.identifier,
        password: data.password,
      });
      console.log(res);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          <input
            type="text"
            className="w-[554px] h-[42px] rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
            placeholder="Email or username"
            {...register("identifier")}
          />
          {errors.identifier && (
            <p className="text-red-500">{errors.identifier.message}</p>
          )}
        </label>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          <input
            type="password"
            className="w-[554px] h-[42px] rounded-[8px] border border-[#E1DFE1] px-3 bg-white"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>
        <Button type="submit" size="large" className="mb-4 w-full" disabled={isSubmitting}>
          Log In
        </Button>
        <div className="w-full text-center text-sm">
          <span className="text-[#10151F]">Not a member? </span>
          <Link to={paths.signUp} className="text-[#FF4000]">Register</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

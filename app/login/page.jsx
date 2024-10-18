import { LoginForm } from "./_components/login-form";
import SocialLogin from "./_components/social-login";

const LoginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <LoginForm />
        <SocialLogin />
      </div>
    </div>
  );
};
export default LoginPage;

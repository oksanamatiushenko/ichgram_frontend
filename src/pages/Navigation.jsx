import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import SignupPage from "./SignupPage/SignupPage";
import EditProfilePage from "./EditProfilePage/EditProfilePage";
import ForgotPasswordPage from "./ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage";
import ExplorePage from "./ExplorePage/ExplorePage";
import LearnMorePage from "./TermsPrivacyCookies/LearnMorePage/LearnMorePage";
import CookiesPolicyPage from "./TermsPrivacyCookies/CookiesPolicyPage/CookiesPolicyPage";
import PrivacyPolicyPage from "./TermsPrivacyCookies/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsPage from "./TermsPrivacyCookies/TermsPage/TermsPage";
import MessagesPage from "./MessagesPage/MessagesPage";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />

      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/messages" element={<MessagesPage />} />

      <Route path="/learn-more" element={<LearnMorePage />} />
      <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      <Route path="/*" element={<NotFoundPage />} />
      
    </Routes>
  );
};

export default Navigation;

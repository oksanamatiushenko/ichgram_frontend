import { Routes, Route, useLocation } from "react-router-dom";

import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";

import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";
import HomePage from "./HomePage/HomePage";
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

import CreatePostModal from "../shared/components/CreatePostModal/CreatePostModal";
import SinglePost from "../shared/components/SinglePost/SInglePost";


const Navigation = () => {
  
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* ОСНОВНЫЕ СТРАНИЦЫ */}
      <Routes location={background || location}>
        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>

        {/* PRIVATE */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:username" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/messages" element={<MessagesPage />} />

          {/* fallback — если перейти напрямую */}
          <Route path="/create-new-post" element={<CreatePostModal />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* МОДАЛКИ ПОВЕРХ СТРАНИЦ */}
      {background && (
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/posts/:id" element={<SinglePost />} />
            <Route path="/create-new-post" element={<CreatePostModal />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default Navigation;

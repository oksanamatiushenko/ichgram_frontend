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

const Navigation = () => {
  const location = useLocation();
  const state = location.state && location.state.background;

  return (
    <>
      <Routes location={state || location}>
        {/* PUBLIC ROUTES */}
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

        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/messages" element={<MessagesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;

// import { Routes, Route } from "react-router-dom";

// import RegisterPage from "./RegisterPage/RegisterPage";
// import LoginPage from "./LoginPage/LoginPage";
// import HomePage from "./HomePage/HomePage";
// import NotFoundPage from "./NotFoundPage/NotFoundPage";
// import ProfilePage from "./ProfilePage/ProfilePage";
// import SignupPage from "./SignupPage/SignupPage";
// import EditProfilePage from "./EditProfilePage/EditProfilePage";
// import ForgotPasswordPage from "./ForgotPasswordPage/ForgotPasswordPage";
// import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage";
// import ExplorePage from "./ExplorePage/ExplorePage";
// import LearnMorePage from "./TermsPrivacyCookies/LearnMorePage/LearnMorePage";
// import CookiesPolicyPage from "./TermsPrivacyCookies/CookiesPolicyPage/CookiesPolicyPage";
// import PrivacyPolicyPage from "./TermsPrivacyCookies/PrivacyPolicyPage/PrivacyPolicyPage";
// import TermsPage from "./TermsPrivacyCookies/TermsPage/TermsPage";
// import MessagesPage from "./MessagesPage/MessagesPage";

// const Navigation = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/signup" element={<SignupPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/profile" element={<ProfilePage />} />
//       <Route path="/edit-profile" element={<EditProfilePage />} />

//       <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//       <Route path="/reset-password" element={<ResetPasswordPage />} />

//       <Route path="/explore" element={<ExplorePage />} />
//       <Route path="/messages" element={<MessagesPage />} />

//       <Route path="/learn-more" element={<LearnMorePage />} />
//       <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
//       <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
//       <Route path="/terms" element={<TermsPage />} />

//       <Route path="/*" element={<NotFoundPage />} />

//     </Routes>
//   );
// };

// export default Navigation;

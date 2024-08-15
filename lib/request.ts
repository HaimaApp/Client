const request = {
  auth: {
    register: "/auth/register/",
    login: "/auth/login/",
    verifyemailotp: "/auth/email-otp-verify/",
    resendemailotp: "/auth/email-resend-otp-verify/",
    create_user_profile: "/auth/create-userprofile/",
    token: "/api/token/refresh/",
    logout: "/auth/logout/",
    forgetpassword: "/auth/reset-password-request/",
    resetotp: "/auth/reset-verify-otp/",
    resetpassword: "/auth/reset-set-new-password/",
  },
};

export default request;

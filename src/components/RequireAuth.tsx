/* 로그인 보호 라우트 */

import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore((state) => state.user);
    return user ? <>{children}</> : <Navigate to="/auth?mode=login" />;
};

export default RequireAuth;

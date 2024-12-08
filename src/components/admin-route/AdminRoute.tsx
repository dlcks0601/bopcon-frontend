import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode }from 'jwt-decode';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; // 프로젝트의 Redux store 경로에 맞게 수정

interface DecodedToken {
    roles: string[];
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
        return <Navigate to="/login" replace />;
    }

    try {
        // JWT에서 roles 정보 추출
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.roles.includes('ROLE_ADMIN')) {
            return <>{children}</>;
        } else {
            // 관리자가 아닌 경우 접근 차단
            alert('접근 권한이 없습니다.');
            return <Navigate to="/" replace />;
        }
    } catch (error) {
        console.error('JWT 디코딩 오류:', error);
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoute;
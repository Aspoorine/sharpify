// Types pour l'authentification

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface User {
    id: number;
    email: string;
    role: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
}

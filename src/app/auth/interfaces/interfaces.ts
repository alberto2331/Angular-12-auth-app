export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    msg?: string;
    token?: string;
    email?: string;
}

export interface Usuario {
    uid: string,
    name: string,
    email: string,
}
import api from '../lib/axios';

export async function getUserName(): Promise<string> {
    const response = await api.get('/members/me');
    return response.data.data.nickname;
}

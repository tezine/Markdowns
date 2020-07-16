import axios, {AxiosResponse} from 'axios';
import {EUser} from "@/entities/EUser";
import {Defines} from "@/codes/defines";

export class UsersService{

    public static async getUsers():Promise<AxiosResponse<EUser[]>>{
        return axios.get<EUser[]>(Defines.mockAPIBaseUrl+'/user');
    }

    public static addUser(eUser:EUser) {
        return axios.post(`${Defines.mockAPIBaseUrl}/user/`,  eUser );
    }

    public static updateUser(eUser:EUser) {
        return axios.put(`${Defines.mockAPIBaseUrl}/user/${eUser.id}`,  eUser );
    }

    public static deleteUser(eUser:EUser) {
        return axios.delete(`${Defines.mockAPIBaseUrl}/user/${eUser.id}`);
    }
}



import HttpClient from '../Http';

export const videoGroup = async (id: number = 57106): Promise<any> => {
    return await HttpClient.init(`/video/group?id=${id}`, {method: "post"})
            .then((res) => Promise.resolve(res.datas))
            .catch((err: Error) => Promise.reject(err));
    
}
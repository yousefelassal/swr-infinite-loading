import axios from 'axios';

const baseURL = '/api/mongo';

type Order = {
    _id: string;
    name: string;
    value: number;
    createdAt: Date;
}

export const get = async ():Promise<Order[]> => {
    const { data } = await axios.get(`${baseURL}/orders`);
    return data;
}

export const post = async (order:any) => {
    const { data } = await axios.post(`${baseURL}/orders`, order);
    return data;
}

export const put = async (order:any) => {
    const { data } = await axios.put(`${baseURL}/orders/${order._id}`, order);
    return data;
}

export const del = async (order:any) => {
    await axios.delete(`${baseURL}/orders/${order._id}`);
}
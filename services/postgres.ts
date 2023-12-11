import axios from 'axios';

const baseURL = '/api/postgres';

export const updateSaved = (order:any) => {
    return axios.patch(`${baseURL}/${order.id}`, order);
}

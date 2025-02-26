import { apiBase } from "../config";
import { ICard } from "../interfaces/CardInterfaces";
import { getToken } from "./UserService";

// ---------------------------------------------------------------------------------------------------------

export const doGetAllCards = async (): Promise<{error:string|null,result:ICard[]|undefined}> => {
  try {
    const response = await fetch(`${apiBase}/cards`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = (await response.json()).data;
    if (!response.ok) return { error:data, result:undefined }
    return { error:null, result:data }
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
}

// ---------------------------------------------------------------------------------------------------------

export const doGetMyCards = async (): Promise<{error:string|undefined,result:ICard[]|undefined}> => {
  try {
    const token = await getToken()
    if (!token) return { error:'No token found', result:undefined }
    const response = await fetch(`${apiBase}/cards/my-cards`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    const data = (await response.json()).data;
    if (!response.ok) return { error:data, result:undefined }
    return { error:undefined, result:data }
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
}

// ---------------------------------------------------------------------------------------------------------
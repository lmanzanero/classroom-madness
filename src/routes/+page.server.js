// @ts-ignore
import { nanoid } from "nanoid/async";
export const load = async () => { 
  const uniqueId = await nanoid(10);
  return { 
    uniqueId
  }; 
};
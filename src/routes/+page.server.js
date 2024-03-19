// @ts-ignore
import { nanoid } from "nanoid/async";
export const load = async () => {
  const uniqueId = await nanoid(6);
  return {
    uniqueId,
  };
};

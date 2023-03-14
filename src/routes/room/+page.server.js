// @ts-ignore
export const load = async ({ url }) => {  
  const roomId = url.searchParams.get('roomId');
    return { 
      roomId
    }; 
};
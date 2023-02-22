// @ts-ignore
export const load = async ({ url, params }) => {  
  return { 
    pageId: params.id,
    pagePath: url.pathname
  }; 
};
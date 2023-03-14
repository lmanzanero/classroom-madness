
export const load = async ({ url, params }) => {  
  return { 
    pageId: params.id,
    pagePath: url.pathname,
    username: url.searchParams.get('username')
  }; 
};
// @ts-ignore
export const load = async () => { 
    const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await todos.json();
    return {
      title: 'Hello from the client',
      content: 'This is content from the client',
      todos: data,
    }; 
};
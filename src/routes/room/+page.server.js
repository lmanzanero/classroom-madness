// @ts-ignore
export const load = async () => { 
    const todos = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await todos.json(); 
    return { 
      todos: data,
    }; 
};
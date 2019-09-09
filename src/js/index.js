import '../scss/index.scss';
console.log('Hello World');
import App from './App.svelte';

const arrayOfItems = [
  {
    done: false,
    string: 'Something to do',
  },
];
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    arr: JSON.parse(localStorage.getItem('arr')) || [],
  },
});

export default app;

import App from './App.svelte';

const arrayOfItems = [];
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    arr: arrayOfItems,
  },
});

export default app;

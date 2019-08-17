import App from './App.svelte';

// const arrayOfItems = [
//   {
//     done: false,
//     string: 'Something to do',
//   },
// ];
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    // arr: arrayOfItems,
  },
});

export default app;

import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world',
    json: fetch('https://api.reddit.com/r/popular').then(res => res.json()),
  },
});

export default app;

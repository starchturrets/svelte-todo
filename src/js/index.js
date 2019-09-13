import '../scss/index.scss';
import App from '../components/App.svelte';

console.log('Hello World');

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
    arr: JSON.parse(localStorage.getItem('arr')) || [],
  },
});

export default app;

// Check that service workers are supported

if ('serviceWorker' in navigator) {
  console.log('Registering service worker...');
  // Use the window load event to keep the page load performant
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(() => console.log('Service Worker Registered!'))
    .catch(e => console.log(e));
} else {
  console.log('Sorry, no offline fun for you yet');
}

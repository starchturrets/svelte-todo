<script>
  import Post from './components/post.svelte';

  export let name;
  export let json;
  json.then(console.log);
</script>

<style>
  div.feed {
    max-width: 50rem;
    margin: auto;
  }
</style>
<!-- <post></post>> -->
<h1>Hello world!</h1>
<h2>Test</h2>
<div class="feed">
  {#await json then mahData } {#each mahData.data.children as jsonData}
  <Post {jsonData}></Post>
  {/each} {/await}
</div>

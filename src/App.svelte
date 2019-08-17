<script>
  import Post from './components/post.svelte';

  export let name;
  export let json;
</script>

<style>
  h1 {
    color: purple;
  }
</style>
<!-- <post></post>> -->
<h1>Hello world!</h1>
<h2>Test </h2>
<div>
  {#await json then vl }
  <Post data="{vl}"/>
  <p>The JSON data is:</p>
  {/await}
</div>

<script>
  export let jsonData;
  jsonData = jsonData.data;
</script>

<style>
  div {
    font: inherit;
  }

  div.post {
    border: solid 1px black;
  }
</style>

<div class="post">
  <a href="https://reddit.com{jsonData.permalink}">{jsonData.title}</a>
  <span>/r/{jsonData.subreddit}</span>
</div>

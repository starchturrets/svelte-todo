<script>
  export let index;
  export let item;
  export let toggle;
  export let removeItem;
</script>

<style>
  label {
    font-weight: 400;
    color: #444;
  }

  button.remove--item {
    cursor: pointer;
    font-size: 0.95rem;
    justify-self: flex-end !important;
    margin-left: auto;
    margin-right: 0;
    text-decoration: none;
  }

  ol,
  label {
    width: inherit;
    font-size: 0.9rem;
  }

  ol label {
    flex-direction: row;
    display: flex;
    padding: 0;
    margin: 0.4rem 0;

    /* max-width: 1em !important; */
    word-break: break-all;
  }

  div.item {
    overflow-wrap: break-word;
    align-self: center;
  }

  .done {
    text-decoration: line-through;
  }

  input[type='checkbox'] {
    margin-right: 0.5rem;
  }
</style>

<ol>
  <label for="item-{index}" class="{item.done === true ? 'done' : ''} item">
    <div class="item">
      <input
        data-index={index}
        type="checkbox"
        id="item-{index}"
        on:change={toggle}
        checked={item.done} />
    </div>
    {item.string}
    <button class="remove--item" data-index={index} on:click={removeItem}>
      X
    </button>
  </label>
</ol>

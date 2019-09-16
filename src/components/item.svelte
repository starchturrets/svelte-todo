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
    word-break: break-all;
  }

  div.item {
    overflow-wrap: break-word;
    align-self: center;
    position: relative;
  }

  .done {
    text-decoration: line-through;
  }

  input[type='checkbox'] {
    opacity: 0;
    margin-right: 0.5rem;
  }

  div.item__input__box {
    filter: opacity(0.5);
    background: #fff;
    background-image: url('/assets/checkbox.png');
    background-size: 0.75rem;
    height: 0.75rem;
    width: 0.75rem;
    position: absolute;
    top: 0.15rem;
    left: 0.25rem;
  }

  input[type='checkbox']:checked + div.item__input__box {
    background-image: url('/assets/checked.png');
    background-size: 0.75rem;
  }
</style>

<ol>
  <label for="item-{index}" class="{item.done === true ? 'done' : ''} item">
    <div class="item">
      <input
        data-index={index}
        type="checkbox"
        class="item__input"
        id="item-{index}"
        on:change={toggle}
        checked={item.done} />
      <div class="item__input__box" />

    </div>
    {item.string}
    <button class="remove--item" data-index={index} on:click={removeItem}>
      X
    </button>
  </label>
</ol>

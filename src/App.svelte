<script lang="ts">
  // import Post from './components/post.svelte';
  // localStorage.clear();
  export let name;
  export let arr;
  let msg = '';
  if (!localStorage.arr) {
    localStorage.setItem('arr', JSON.stringify(arr));
  } else {
    arr = JSON.parse(localStorage.getItem('arr'));
  }
  const updateStore = () => {
    localStorage.arr = JSON.stringify(arr);
  };
  const test = ev => {
    if (ev.key === 'Enter' && ev.target.value.trim()) {
      const item = {
        done: false,
        string: ev.target.value,
      };

      arr = [...arr, item];
      msg = '';
    }
    updateStore();
  };
  const removeItem = ev => {
    const { index } = ev.target.dataset;
    arr.splice(index, 1);
    arr = arr;
    updateStore();
  };
  const toggle = ev => {
    const {
      target: {
        dataset: { index },
      },
    } = ev;
    const item = arr[index];

    item.done = !item.done;
    arr = arr;
    updateStore();
  };
</script>

<style>
  div.list {
    border: solid 1px black;
    height: 30rem;
    margin: auto;
    width: 30rem;
  }
  .done {
    text-decoration: line-through;
  }
  button {
    text-decoration: inherit;
  }
</style>

<div class="list">
  <input type="text" name="" id="" on:keydown="{test}" bind:value="{msg}" placeholder="Type Something" />
  <div class="list--items">
    <ul>
      {#each arr as item, index}
      <ol class="item">
        <div class="{item.done === true ? 'done' : ''}">
          <input data-index="{index}" type="checkbox" on:change="{toggle}" checked="{item.done}" /> {item.string}
          <button data-index="{index}" on:click="{removeItem}">X</button>
        </div>
      </ol>
      {/each}
    </ul>
  </div>
  <button class="clear--list" on:click="{()=>{arr = [];updateStore()}}">
    Clear
  </button>
</div>

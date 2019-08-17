<script lang="ts">
  // import Post from './components/post.svelte';
  // localStorage.clear();
  export let name;
  export let arr = [
    {
      done: false,
      string: 'Test',
    },
  ];

  let msg = '';
  if (!localStorage.getItem(arr)) {
    localStorage.setItem('arr', JSON.stringify(arr));
  } else if (localStorage.getItem(arr).length > 0) {
    arr = JSON.parse(localStorage.getItem('arr'));
  }
  const updateStore = () => {
    localStorage.arr = JSON.stringify(arr);
  };
  const test = ev => {
    if (ev.key === 'Enter' && ev.target.value.trim().length > 0 && ev.target.value.length < 49) {
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
    background: #fff;
    box-shadow: 1px 1px 1px #000;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    height: 30rem;
    margin: 2rem auto;
    padding: 2.8rem 3.5rem;
    width: 25rem;
  }
  div.list--items {
    flex-grow: 1;
    padding: 0.7rem;
    width: 100%;
  }

  div.list--items ul,
  div.list--items ol {
    width: inherit;
  }
  div.list--items ol {
    flex-direction: row;
    display: flex;
    padding: 0;
  }
  div.item {
    align-self: center;
  }
  ol button.remove--item {
    cursor: pointer;
    font-size: 0.95rem;
    justify-self: flex-end !important;
    margin-left: auto;
    margin-right: 0;
    text-decoration: none;
  }
  /* button {
    justify-items: flex-end;
  } */
  .done {
    text-decoration: line-through;
  }
  button.clear--list {
    margin-bottom: -1.5rem;
    align-self: center;
    /* justify-self: center; */
  }
  h1 {
    margin: 0.5rem;
  }
  input[type='text'] {
    border-radius: 1px;
    box-shadow: inset 0px -2px 1px #999;
    margin: 0.5rem;
    padding: 0.5rem;
  }
</style>
<div class="list">
  <h1>To Do List</h1>
  <input type="text" name="" id="" on:keydown="{test}" bind:value="{msg}" placeholder="Type Something" />
  <div class="list--items">
    <ul>
      {#each arr as item, index}
      <ol>
        <div class="{item.done === true ? 'done' : ''} item">
          <input data-index="{index}" type="checkbox" on:change="{toggle}" checked="{item.done}" />
          {item.string}
        </div>
        <button class="remove--item" data-index="{index}" on:click="{removeItem}">X</button>
      </ol>
      {/each}
    </ul>
  </div>
  <button class="clear--list" on:click="{()=>{arr = [];updateStore()}}">
    Clear
  </button>
</div>

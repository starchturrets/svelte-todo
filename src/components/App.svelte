<script>
  import Component from './item.svelte';
  // import '../scss/reset.scss';

  export let name;
  export let arr;
  let msg = '';
  // const test = 'boo';
  const updateStore = () => {
    localStorage.arr = JSON.stringify(arr);
  };
  const addItem = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
    }
    if (ev.key === 'Enter') {
      ev.preventDefault();
      const item = {
        done: false,
        string: ev.target.value,
      };

      // arr.push(item);
      // arr = arr;
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
  /* @import ('../scss/reset.scss'); */

  div.list {
    align-items: center;
    background: #fff;
    border-radius: 2px;
    border-top: solid 5px #ff3e00;
    box-shadow: 0 5px 4px 0 #c5c2c2;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    height: 38rem;
    margin: 2rem auto;
    padding: 2.8rem 3.5rem;
    width: 28rem;
  }

  h1 {
    align-self: flex-start;
    font-weight: 500;
    margin: 0.5rem;
  }

  form {
    width: 100%;
  }

  div.list__container {
    flex-grow: 1;
    overflow-x: scroll;
    padding: 0.7rem;
    width: 100%;
  }

  .list__clear {
    align-self: center;
    justify-self: flex-end;
    position: relative;
    top: 1.69rem;
  }

  input[type='text'] {
    border-radius: 2px;
    box-shadow: inset 0 0 1px #999;
    font-size: 0.9em;
    margin: auto;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }

  input[type='text']::placeholder {
    font-weight: 400;
  }

  input[type='text']:focus {
    box-shadow: 0 0 0 2px #444;
    outline: none;
  }

  ul {
    max-width: 100%;
  }
</style>

<div class="list">
  <!-- <Component jsonData="boom" /> -->
  <h1>To Do List</h1>
  <form action="">
    <input
      type="text"
      name=""
      id=""
      on:keydown={addItem}
      bind:value={msg}
      placeholder="Type Something" />
  </form>

  <div class="list__container">
    <ul>
      {#each arr as item, index}
        <Component {index} {item} {toggle} {removeItem} />
      {/each}
    </ul>
  </div>
  {#if arr.length > 0}
    <button
      class="list__clear"
      on:click={() => {
        arr = [];
        updateStore();
      }}>
      Clear
    </button>
  {/if}
</div>

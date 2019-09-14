<script>
  import Component from './item.svelte';

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
    if (
      ev.key === 'Enter' &&
      ev.target.value.trim().length > 0 &&
      ev.target.value.length < 49
    ) {
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
  div.list {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 10px 10px rgb(59, 58, 58), 0 1px 20px rgb(59, 58, 58);
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    height: 32rem;
    margin: 2rem auto;
    padding: 2.8rem 3.5rem;
    width: 25rem;
  }

  div.list__container {
    flex-grow: 1;
    overflow-x: scroll;
    padding: 0.7rem;
    width: 100%;
  }

  .list__clear {
    margin-top: 1rem;
    margin-bottom: 0;
    align-self: center;
    justify-self: flex-end;

    /* justify-self: center; */
  }

  h1 {
    margin: 0.5rem;
  }

  input[type='text'] {
    border-radius: 1px;

    /* box-shadow: inset 0 -2px 1px #999; */
    font-size: 0.91em;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.75rem 1rem;
    max-width: 18rem;
  }

  input[type='text']:focus {
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgb(5, 130, 155);

    /* outline: solid 2px rgb(5, 130, 155); */
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

  <button
    class="list__clear"
    on:click={() => {
      arr = [];
      updateStore();
    }}>
    Clear
  </button>
</div>

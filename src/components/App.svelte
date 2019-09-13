<script>
  export let name;
  export let arr;
  let msg = '';

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
    overflow-x: scroll;
    /* max-height: 15rem; */
    padding: 0.7rem;
    width: 100%;
  }
  div.list--items ul,
  div.list--items ol,
  label {
    width: inherit;
  }
  div.list--items ol label {
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
    /* overflow: auto; */
  }
  ol label button.remove--item {
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
    margin-top: 1rem;
    margin-bottom: 0rem;
    align-self: center;
    justify-self: flex-end;
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
    max-width: 18rem;
  }
</style>
<div class="list">
  <h1>To Do List</h1>
  <form action="">
    <input
      type="text"
      name=""
      id=""
      on:keydown="{addItem}"
      bind:value="{msg}"
      placeholder="Type Something"
    />
  </form>

  <div class="list--items">
    <ul>
      {#each arr as item, index}
      <ol>
        <label for="item-{index}">
          <div class="{item.done === true ? 'done' : ''} item">
            <input
              data-index="{index}"
              type="checkbox"
              id="item-{index}"
              on:change="{toggle}"
              checked="{item.done}"
            />
          </div>
          {item.string}
          <button
            class="remove--item"
            data-index="{index}"
            on:click="{removeItem}"
          >
            X
          </button>
        </label>
      </ol>
      {/each}
    </ul>
  </div>

  <button class="clear--list" on:click="{()=>{arr = [];updateStore()}}">
    Clear
  </button>
</div>

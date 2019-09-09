<script lang="ts">
  // import Post from './components/post.svelte';
  // localStorage.clear();
  export let name;
  export let arr;
  let msg = '';
  if (!localStorage.getItem(arr)) {
    console.log('no');
    localStorage.setItem('arr', JSON.stringify(arr));
  } else {
    console.log('yes');
    arr = JSON.parse(localStorage.getItem('arr'));
  }
  const updateStore = () => {
    localStorage.arr = JSON.stringify(arr);
  };
  const test = ev => {
    if (
      ev.key === 'Enter' &&
      ev.target.value.trim().length > 0 &&
      ev.target.value.length < 49
    ) {
      const item = {
        done: false,
        string: ev.target.value,
      };
      arr.push(item);
      arr = arr;
      // arr = [...arr, item];
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

<style></style>
<div class="list">
  <h1>To Do List</h1>
  <input
    type="text"
    name=""
    id=""
    on:keydown="{test}"
    bind:value="{msg}"
    placeholder="Type Something"
  />
  <div class="list--items">
    <ul>
      {#each arr as item, index}
      <ol>
        <div class="{item.done === true ? 'done' : ''} item">
          <input
            data-index="{index}"
            type="checkbox"
            on:change="{toggle}"
            checked="{item.done}"
          />
          {item.string}
        </div>
        <button
          class="remove--item"
          data-index="{index}"
          on:click="{removeItem}"
        >
          X
        </button>
      </ol>
      {/each}
    </ul>
  </div>
  <button class="clear--list" on:click="{()=>{arr = [];updateStore()}}">
    Clear
  </button>
</div>

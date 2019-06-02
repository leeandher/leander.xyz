<template>
  <button @click="func">{{text}}</button>
</template>


<script>
export default {
  name: "FunctionButton",
  props: {
    text: String,
    func: Function
  }
};
</script>

<style scoped>
button {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border: 0;
  background: var(--dark);
  height: 35px;
  color: var(--green);
  font-weight: bold;
  font-size: 2rem;
  font-style: italic;
}
button:hover {
  background: var(--green);
  color: var(--dark);
  cursor: pointer;
}
</style>


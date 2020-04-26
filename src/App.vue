<template>
  <router-view />
</template>

<style lang="scss">
$family-primary: "Lora", serif;
@import "../node_modules/bulma/bulma.sass";
@import "../node_modules/bulma-slider/dist/css/bulma-slider.sass";
@import "../node_modules/bulma-checkradio/dist/css/bulma-checkradio.sass";

@import url("https://fonts.googleapis.com/css2?family=Lora:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap");

html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
}

footer {
  flex-shrink: 0;
  margin-top: auto;
}

.align-middle {
  align-items: center;
}
.capitalize {
  text-transform: capitalize;
}
</style>

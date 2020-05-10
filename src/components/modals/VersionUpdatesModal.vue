<template>
  <div>
    <article class="message">
      <div class="message-header">
        <p>Version Updates</p>
      </div>
      <div class="message-body content">
        <p class="has-text-centered">
          Thanks for using
          <strong>Bread Maths!</strong>
        </p>
        <hr />
        <div v-for="(messages, date) in versionLog" :key="date">
          <p>
            <strong>{{date}}</strong>
          </p>
          <ul>
            <li v-for="(message, $i) in messages" :key="$i">{{message}}</li>
          </ul>
          <hr />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  computed: {
    versionLog() {
      return {
        '10-05-2020': [
          'Changed "Water" ingredient to "Liquid" to include Milk, Juice and Alcohol',
          'Factored in more liquid ingredients for Hydration Calculation',
          'Added Responsiveness for Version Updates Modal to support Mobile',
        ],
        '03-05-2020': [
          'Fixed Bug with Hydration Percentage',
          'Hide Dropdown selection for ingredient types with only one ingredient',
          'Added Version Updates Modal',
        ],
      };
    },
  },
};
</script>

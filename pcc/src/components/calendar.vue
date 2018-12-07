<template>
    <div>

    </div>
</template>

<script>
export default {
  name: 'calendar',
  data: function () {
    return {

    }
  },
  mounted: function() {

  },
  methods: {
    calculateDate: function () {

    },
    howMuchDays: function (year, month) {
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }
      return daysInMonth[month];
    },
    howMuchInWeek: function (year, month, day) {
      return new Date(year, month, day).getDay();
    }
  }
}
</script>

<style scoped>

</style>

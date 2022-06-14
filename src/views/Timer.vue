<template>
<div style="position: relative; width: 110px; height: 110px">
  <div style="position: absolute; transform: translate(0%, 0%);">
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            :stroke-dasharray="circleDasharraySubmit"
            class="base-timer__path-remaining"
            :class="remainingPathColorSubmit"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span class="base-timer__label" v-if="!timerVisible">{{ formattedTimeLeftThink }}초</span>
      <span class="base-timer__label" v-if="timerVisible">{{ formattedTimeLeftSubmit }}초</span>
    </div>
  </div>
  <div style="position: absolute; transform: translate(21.5%, 21.5%);">
    <div class="base-timer2">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            :stroke-dasharray="circleDasharrayThink"
            class="base-timer__path-remaining"
            :class="remainingPathColorThink"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
    </div>
  </div>
</div>
</template>

<script>

const FULL_DASH_ARRAY_SUBMIT = 283;
const WARNING_THRESHOLD_SUBMIT = 10;
const ALERT_THRESHOLD_SUBMIT = 5;

const FULL_DASH_ARRAY_THINK = 283;
const WARNING_THRESHOLD_THINK = 10;
const ALERT_THRESHOLD_THINK = 5;

const COLOR_CODES_SUBMIT = {
  info: {
    color: "green"
  },
  warning: {
    color: "green",
    threshold: WARNING_THRESHOLD_SUBMIT
  },
  alert: {
    color: "green",
    threshold: ALERT_THRESHOLD_SUBMIT
  }
};
const COLOR_CODES_THINK = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD_THINK
  },
  alert: {
    color: "orange",
    threshold: ALERT_THRESHOLD_THINK
  }
};
const TIME_LIMIT_SUBMIT = 20;
const TIME_LIMIT_THINK = 5;

export default {
  components: {
    // SubbmitTimer,
  },
  data() {
    return {
      timePassedSubmit: 0,
      timerIntervalSubmit: null,
      timePassedThink: 0,
      timerIntervalThink: null,

      timerVisible: false,
    };
  },

  computed: {
    circleDasharraySubmit() {
      return `${(this.timeFractionSubmit * FULL_DASH_ARRAY_SUBMIT).toFixed(0)} 283`;
    },

    circleDasharrayThink() {
      return `${(this.timeFractionThink * FULL_DASH_ARRAY_THINK).toFixed(0)} 283`;
    },

    formattedTimeLeftSubmit() {
      const timeLeftSubmit = this.timeLeftSubmit;
      return timeLeftSubmit;
    },
    formattedTimeLeftThink() {
      const timeLeftThink = this.timeLeftThink;
      return timeLeftThink;
    },

    timeLeftSubmit() {
      return TIME_LIMIT_SUBMIT - this.timePassedSubmit;
    },
    timeLeftThink() {
      return TIME_LIMIT_THINK - this.timePassedThink;
    },

    timeFractionSubmit() {
      const rawTimeFractionSubmit = this.timeLeftSubmit / TIME_LIMIT_SUBMIT;
      return rawTimeFractionSubmit - (1 / TIME_LIMIT_SUBMIT) * (1 - rawTimeFractionSubmit);
    },
    timeFractionThink() {
      const rawTimeFractionThink = this.timeLeftThink / TIME_LIMIT_THINK;
      return rawTimeFractionThink - (1 / TIME_LIMIT_THINK) * (1 - rawTimeFractionThink);
    },

    remainingPathColorSubmit() {
      const { alert, warning, info } = COLOR_CODES_SUBMIT;

      if (this.timeLeftSubmit <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeftSubmit <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    },
    remainingPathColorThink() {
      const { alert, warning, info } = COLOR_CODES_THINK;

      if (this.timeLeftThink <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeftThink <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    }
  },

  watch: {
    timeLeftSubmit(newValue) {
      if (newValue === 0) {
        this.onTimesUpSubmit();
      }
    },
    timeLeftThink(newValue) {
      if (newValue === 0) {
        this.onTimesUpThink();
      }
    }
  },

  mounted() {
    this.startTimerThink();
  },

  methods: {
    onTimesUpSubmit() {
      clearInterval(this.timerIntervalSubmit);
    },
    startTimerSubmit() {
      this.timerIntervalSubmit = setInterval(() => (this.timePassedSubmit += 1), 1000);
    },

    onTimesUpThink() {
      clearInterval(this.timerIntervalThink);
      this.startTimerSubmit();
      this.timerVisible = true;
    },

    startTimerThink() {
      this.timerIntervalThink = setInterval(() => (this.timePassedThink += 1), 1000);
    }
  }
};
</script>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 100px;
  height: 100px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 10px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 10px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }

    &.red {
      color: red;
    }
  }

  &__label {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
}
.base-timer2 {
  position: relative;
  width: 70px;
  height: 70px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 10px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 10px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }

    &.red {
      color: red;
    }
  }
}
</style>

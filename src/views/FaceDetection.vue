<template>
  <div>
    <v-row class="pt-10 mb-16">
      <v-col cols="12">
        <v-card class="text-center mx-auto" color="rgba(0,0,0,.0)" width="1100px" rounded="lg" elevation="0">
          <p style="font-size: 20px; font-weight: 500; color: rgba(120,120,120)"><span style="font-size: 33px">Q</span>. 본인의 축구스타일의 장점과 단점을 설명해주세요.</p>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters style="width: 1100px" class="mx-auto">
      <v-col cols="6" class="d-flex flex-column justify-center align-end">
        <v-card outlined rounded="0">
          <v-card elevation="0" rounded="0">
            <video
              width="400"
              id="player"
              autoplay
              ref="player"
              style="position: relative;"
            ></video>
            <v-icon v-if="timerVisible" style="position: absolute; top:3%; right:2.5%; font-size: 20px" :color="recColor">mdi-radiobox-marked</v-icon>
            <div
              ref="container"
              style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); display: none;"
            ></div>
            <div v-if="!timerVisible" style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); width: 240px">
              <v-img
              src="../assets/faceGuide.png">
              </v-img>
            </div>
          </v-card>
          <!-- <v-card width="400" height="40" color="black" class="d-flex justify-center align-center" rounded="0" elevation="0">
            <v-icon dark color="grey">mdi-microphone</v-icon>
            <av-media class="ml-2" :media="media" :canv-height="84" :canv-width="340" line-color="white"/>
          </v-card> -->
        </v-card>
      </v-col>
      <v-col cols="6" class="d-flex flex-column justify-center align-center">
        <div style="position: relative; width: 205px; height: 205px; border-radius: 50%">
          <div style="position: absolute; transform: translate(1.2%, 1.2%);">
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
              <span class="base-timer__label text-center" v-if="!timerVisible">생각시간<br>{{ formattedTimeLeftThink }}초</span>
              <span class="base-timer__label text-center" v-if="timerVisible">남은시간<br>{{ formattedTimeLeftSubmit }}초</span>
            </div>
          </div>
          <div style="position: absolute; transform: translate(18.3%, 18.3%);">
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
        <v-spacer></v-spacer>
        <v-btn outlined elevation="2" color="rgba(200,200,200)" width="160" class="btnText" v-if="thinkButton" @click="endThink()"><p style="color: black">생각시간 종료</p></v-btn>
        <div v-if="!thinkButton" class="d-flex flex-column">
          <v-btn outlined elevation="2" color="rgba(200,200,200)" width="160" class="btnText" :disabled="!retryButton" @click="retryInterview()"><p style="color: black">다시하기</p></v-btn>
          <v-btn outlined elevation="2" color="rgba(200,200,200)" width="160" class="btnText mt-5" @click="stopFaceDetection()"><p style="color: black">제출하기</p></v-btn>
        </div>
      </v-col>
    </v-row>

    <v-dialog
      v-model="tipDialog"
      max-width="1000"
      persistent
    >
      <v-card height="370" color="rgba(255,255,255)">
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center align-center" style="background-color: rgb(98, 182, 171); color: white;">
              <p class="py-2 mainTextM">하이플 AI 성향분석 가이드</p>
            </div>
          </v-col>
        </v-row>
        <v-row class="px-8">
          <v-col cols="12">
            <p class="mainTextM mb-4">응시 방법 및 주의사항</p>
            <div class="d-flex align-start mb-4">
              <v-icon>mdi-circle-small</v-icon>
              <p>본 검사는 일반 성향과 선수 성향을 알아보는 검사입니다.</p>
            </div>
            <div class="d-flex align-start mb-4">
              <v-icon>mdi-circle-small</v-icon>
              <p>질문은 일반 성향 50 문항, 선수 성향 50 문항으로 진행됩니다.</p>
            </div>
            <div class="d-flex align-start mb-4">
              <v-icon>mdi-circle-small</v-icon>
              <p>시간 제한은 없으나 어느 한 문항을 너무 오래 생각하지 마세요.</p>
            </div>
            <div class="d-flex align-start">
              <v-icon>mdi-circle-small</v-icon>
              <p>의식적으로 일관성 있게 응답하려고 하지 않아도 됩니다.</p>
            </div>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              @click="tipPopup()"
              outlined
              elevation="2"
              width="50"
              min-width="90"
              color="rgba(200,200,200)" 
            >
              <p style="color: black">확인</p>
            </v-btn>
          </v-col>
        </v-row>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// 타이머 관련
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
    color: "orange"
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
const TIME_LIMIT_SUBMIT = 90;
const TIME_LIMIT_THINK = 30;

import * as faceapi from "face-api.js";
// import InterviewTimer from './InterviewTimer.vue'

export default {
  components: {
    // InterviewTimer,
  },
  data() {
    return {
      recColor: 'rgba(255,0,0,1)',
      media: null,
      setFaceDetection: null,
      // TTS
      voices: [],
      text: [
        "본인의 축구 스타일의 장점과 단점을 설명해주세요.",
      ],
      change: "",
      utterThis: {},
      // 인터뷰 데이터
      faceAge: [],
      voiceTexts: [],
      // 타이머
      timePassedSubmit: 0,
      timerIntervalSubmit: null,
      timePassedThink: 0,
      timerIntervalThink: null,
      timerVisible: false,
      // 버튼
      retryButton: true,
      thinkButton: true,
      // 음성인식
      final_transcript: "",
      recognition: {},
      interim_transcript: "",
      langs: [
        ["Afrikaans", ["af-ZA"]],
        ["Bahasa Indonesia", ["id-ID"]],
        ["Bahasa Melayu", ["ms-MY"]],
        ["Català", ["ca-ES"]],
        ["Čeština", ["cs-CZ"]],
        ["Deutsch", ["de-DE"]],
        [
          "English",
          ["en-AU", "Australia"],
          ["en-CA", "Canada"],
          ["en-IN", "India"],
          ["en-NZ", "New Zealand"],
          ["en-ZA", "South Africa"],
          ["en-GB", "United Kingdom"],
          ["en-US", "United States"],
        ],
        [
          "Español",
          ["es-AR", "Argentina"],
          ["es-BO", "Bolivia"],
          ["es-CL", "Chile"],
          ["es-CO", "Colombia"],
          ["es-CR", "Costa Rica"],
          ["es-EC", "Ecuador"],
          ["es-SV", "El Salvador"],
          ["es-ES", "España"],
          ["es-US", "Estados Unidos"],
          ["es-GT", "Guatemala"],
          ["es-HN", "Honduras"],
          ["es-MX", "México"],
          ["es-NI", "Nicaragua"],
          ["es-PA", "Panamá"],
          ["es-PY", "Paraguay"],
          ["es-PE", "Perú"],
          ["es-PR", "Puerto Rico"],
          ["es-DO", "República Dominicana"],
          ["es-UY", "Uruguay"],
          ["es-VE", "Venezuela"],
        ],
        ["Euskara", ["eu-ES"]],
        ["Français", ["fr-FR"]],
        ["Galego", ["gl-ES"]],
        ["Hrvatski", ["hr_HR"]],
        ["IsiZulu", ["zu-ZA"]],
        ["Íslenska", ["is-IS"]],
        ["Italiano", ["it-IT", "Italia"], ["it-CH", "Svizzera"]],
        ["Magyar", ["hu-HU"]],
        ["Nederlands", ["nl-NL"]],
        ["Norsk bokmål", ["nb-NO"]],
        ["Polski", ["pl-PL"]],
        ["Português", ["pt-BR", "Brasil"], ["pt-PT", "Portugal"]],
        ["Română", ["ro-RO"]],
        ["Slovenčina", ["sk-SK"]],
        ["Suomi", ["fi-FI"]],
        ["Svenska", ["sv-SE"]],
        ["Türkçe", ["tr-TR"]],
        ["български", ["bg-BG"]],
        ["Pусский", ["ru-RU"]],
        ["Српски", ["sr-RS"]],
        ["한국어", ["ko-KR"]],
        [
          "中文",
          ["cmn-Hans-CN", "普通话 (中国大陆)"],
          ["cmn-Hans-HK", "普通话 (香港)"],
          ["cmn-Hant-TW", "中文 (台灣)"],
          ["yue-Hant-HK", "粵語 (香港)"],
        ],
        ["日本語", ["ja-JP"]],
        ["Lingua latīna", ["la"]],
      ],
      // 모달
      tipDialog: false,
      // 얼굴인식
      angry_Count: 0,
      disgusted_Count: 0,
      fearful_Count: 0,
      happy_Count: 0,
      neutral_Count: 0,
      sad_Count: 0,
      surprised_Count: 0,
      male_Count: 0,
      female_Count: 0,
    };
  },

  methods: {
    tipPopup() {
      this.tipDialog = false;
      this.$store.commit('popUp');
    },
    // Voice 관련
    soundNotAllowed(error){
        console.log(error);
    },
    soundAllowed(stream) {
        window.persistAudioStream = stream;
        var audioContent = new AudioContext();
        var audioStream = audioContent.createMediaStreamSource( stream );
        var analyser = audioContent.createAnalyser();
        audioStream.connect(analyser);
    },
    voiceRecognition() {
      navigator.getUserMedia({audio:true}, this.soundAllowed, this.soundNotAllowed);
      const constraints = { audio: true, video: false };
      navigator.mediaDevices.getUserMedia(constraints).then((media) => {
        this.media = media;
      });
      this.recognition.start();
    },
    stop() {
      this.recognition.stop();
    },
    setVoiceList() {
      this.voices = window.speechSynthesis.getVoices();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = this.setVoiceList;
      }

      if (this.voices) {
        this.speech(this.text);
      }
    },
    speech(text) {
      if (
        typeof SpeechSynthesisUtterance === "undefined" ||
        typeof window.speechSynthesis === "undefined"
      ) {
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
        return;
      }

      var lang = "ko-KR";

      this.utterThis = new SpeechSynthesisUtterance(text);

      this.utterThis.onstart = () => {

      };

      this.utterThis.onend = () => {
        this.startTimerThink();
        window.speechSynthesis.cancel();
      };

      this.utterThis.lang = lang;
      this.utterThis.pitch = 0.01;
      this.utterThis.rate = 0.01;
      window.speechSynthesis.speak(this.utterThis);
    },
    // Face Detection 관련
    start() {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.$refs.player.srcObject = stream;
        this.$refs.player.style.display = "block";
        this.$refs.player.setAttribute("autoplay", "");
        this.$refs.player.setAttribute("muted", "");
        this.$refs.player.setAttribute("playsinline", "");
      })
      .catch((error) => {
        console.log(error);
      });
    },
    initializeMedia() {
      if (!("mediaDevices" in navigator)) {
        navigator.mediaDevices = {};
      }

      if (!("getUserMedia" in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
          const getUserMedia =
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented!")
            );
          }

          return new Promise((resolve, reject) =>
            getUserMedia.call(navigator, constraints, resolve, reject)
          );
        };
      }

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/src/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/src/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/src/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/src/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/src/models"),
      ]).then(this.start());
    },
    click() {
      const isScreenSmall = window.matchMedia("(max-width: 700px)");
      let predictedAges = [];

      const screenResize = (isScreenSmall) => {
        if (isScreenSmall.matches) {
          // If media query matches
          this.$refs.player.style.width = "400px";
        } else {
          this.$refs.player.style.width = "400px";
        }
      };

      screenResize(isScreenSmall); // Call listener function at run time
      isScreenSmall.addListener(screenResize);

      const interpolateAgePredictions = (age) => {
        predictedAges = [age].concat(predictedAges).slice(0, 30);
        const avgPredictedAge =
          predictedAges.reduce((total, a) => total + a) / predictedAges.length;
        return avgPredictedAge;
      };

      const canvasForFaceDetection = faceapi.createCanvasFromMedia(
        this.$refs.player
      );

      let containerForFaceDetection = this.$refs.container;

      containerForFaceDetection.append(canvasForFaceDetection);

      console.log(containerForFaceDetection);

      const displaySize = { width: 400, height: 300 };
      faceapi.matchDimensions(canvasForFaceDetection, displaySize);

      this.setFaceDetection = setInterval(async () => {
        const detections = await faceapi
          .detectSingleFace(
            this.$refs.player,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender();

        if (detections) {
          // console.log(detections);

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvasForFaceDetection.getContext("2d").clearRect(0, 0, 500, 500);

          faceapi.draw.drawDetections(
            canvasForFaceDetection,
            resizedDetections
          );
          faceapi.draw.drawFaceLandmarks(
            canvasForFaceDetection,
            resizedDetections
          );
          if (resizedDetections && Object.keys(resizedDetections).length > 0) {
            const age = resizedDetections.age;
            const interpolatedAge = interpolateAgePredictions(age);
            const gender = resizedDetections.gender;
            const expressions = resizedDetections.expressions;
            const maxValue = Math.max(...Object.values(expressions));
            const emotion = Object.keys(expressions).filter(
              (item) => expressions[item] === maxValue
            );
            switch(emotion[0]) {
              case 'angry' : { this.angry_Count++; break;}
              case 'disgusted' : {this.disgusted_Count++; break;}
              case 'fearful' : {this.fearful_Count++; break;}
              case 'happy' : {this.happy_Count++; break;}
              case 'neutral' : {this.neutral_Count++; break;}
              case 'sad' : {this.sad_Count++; break;}
              case 'surprised' : {this.surprised_Count++; break;}
            }
            switch(gender) {
              case 'male' : { this.male_Count++; break;}
              case 'female' : {this.female_Count++; break;}
            }
            this.faceAge.push(parseFloat(interpolatedAge).toFixed(2));
          }
        }
      }, 100);
    },
    stopFaceDetection() {
      clearInterval(this.timerIntervalSubmit);
      clearInterval(this.timerIntervalThink);
      this.stop();
      
      this.tipDialog = true;
      this.voiceTexts = this.final_transcript.split(" ");
      console.log(this.voiceTexts);

      clearInterval(this.setFaceDetection);

      console.log('stoped faceDetection');

      this.$store.commit('save_FaceData', {
        angry_Count : this.angry_Count,
        disgusted_Count : this.disgusted_Count,
        fearful_Count : this.fearful_Count,
        happy_Count : this.happy_Count,
        neutral_Count : this.neutral_Count,
        sad_Count : this.sad_Count,
        surprised_Count : this.surprised_Count,
        male_Count : this.male_Count,
        female_Count : this.female_Count,
        voiceTexts : this.voiceTexts
      });
      this.$store.commit('increment');
    },
    // 타이머 관련
    onTimesUpSubmit() {
      clearInterval(this.timerIntervalSubmit);
      this.voiceTexts = this.final_transcript;
      this.stopFaceDetection();
      this.tipDialog = true;
      console.log(this.faceEmotion);
      console.log(this.angry_Count);
      console.log(this.disgusted_Count);
      console.log(this.fearful_Count);
      console.log(this.happy_Count);
      console.log(this.neutral_Count);
      console.log(this.sad_Count);
      console.log(this.surprised_Count);
      console.log(this.male_Count);
      console.log(this.female_Count);
    },
    startTimerSubmit() {
      this.timerIntervalSubmit = setInterval(() => (this.timePassedSubmit += 1, this.recColor === 'rgba(255,0,0,1)' ? this.recColor = 'rgba(255,0,0,.2)' : this.recColor = 'rgba(255,0,0,1)'), 1000);
    },
    onTimesUpThink() {
      clearInterval(this.timerIntervalThink);
      this.thinkButton = false;
      this.startTimerSubmit();
      this.voiceRecognition();
      this.click();
      this.timerVisible = true;
    },
    startTimerThink() {
      this.timerIntervalThink = setInterval(() => (this.timePassedThink += 1), 1000);
    },
    endThink() {
      this.timePassedThink = 30;
      clearInterval(this.timerIntervalThink);
      this.thinkButton = false;
    },
    retryInterview() {
      this.retryButton = false;
      this.timePassedSubmit = 0;
      this.final_transcript = "";
      this.faceEmotion = [];
      this.faceGender = [];
      this.faceAge = [];
    },
  },

  mounted() {
    // Face Detection 관련
    this.initializeMedia();
    // Voice 관련
    if ("webkitSpeechRecognition" in window) {
      this.display = "inline-block";
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "ko-KR";

      this.recognition.onstart = () => {
        console.log(this.recognition);
      };

      this.recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.final_transcript += event.results[i][0].transcript;
          } else {
            this.interim_transcript += event.results[i][0].transcript;
          }
        }
        // console.log("this is result");
        // console.log(this.final_transcript);
      };

      this.recognition.onend = () => {
        // this.final_transcript = "";
        // console.log("this is end");
      };
    }
    setTimeout(() => this.setVoiceList(), 500);
  },
  computed: {
    // 타이머
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
    // 타이머
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
};
</script>

<style>
p {
  margin-bottom: 0 !important;
}
</style>

<style scoped>

#age {
  background: #1e94be;
}
#emotion {
  background: #8a1025;
}
#gender {
  background: #62d8a5;
}

</style>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 200px;
  height: 200px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 8px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 8px;
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
    width: 200px;
    height: 200px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
  }
}
.base-timer2 {
  position: relative;
  width: 150px;
  height: 150px;

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
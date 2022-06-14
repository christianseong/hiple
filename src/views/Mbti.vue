<template>
  <div class="d-flex justify-center align-center">
    <!-- 일반 성향 -->
    <v-card width="1000" style="" rounded="0" elevation="0" outlined v-if="tendency_Page === 0">
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center align-center" style="background-color: rgb(98, 182, 171); color: white;">
            <p class="py-2 mainTextM">일반 성향 검사 - 50 문항</p>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-1">
        <v-col cols="8">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS">질문</p>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS mr-6">매우아니다</p>
            <p class="py-2 articleTextS mr-6">아니다</p>
            <p class="py-2 articleTextS mr-6">보통</p>
            <p class="py-2 articleTextS mr-6">그렇다</p>
            <p class="py-2 articleTextS">매우그렇다</p>
          </div>
        </v-col>
        <!-- <v-col cols="1">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS">아니다</p>
          </div>
        </v-col>
        <v-col cols="1">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS">보통</p>
          </div>
        </v-col>
        <v-col cols="1">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS">그렇다</p>
          </div>
        </v-col>
        <v-col cols="1">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS">매우그렇다</p>
          </div>
        </v-col> -->
      </v-row>

      <v-row no-gutters v-for="(i, idx) in questions.slice(this.getQuestionP1_default, this.getQuestionP2_default)" :key="idx" style="border-bottom: 1px solid rgba(0,0,0,.15" class="py-1">
        <v-col cols="1">
          <div class="d-flex justify-center align-center" style="">
            <p class="py-2 articleTextS" v-if="page_default === 0">{{idx + 1}}</p>
            <p class="py-2 articleTextS" v-if="page_default === 1">{{idx + 11}}</p>
            <p class="py-2 articleTextS" v-if="page_default === 2">{{idx + 21}}</p>
            <p class="py-2 articleTextS" v-if="page_default === 3">{{idx + 31}}</p>
            <p class="py-2 articleTextS" v-if="page_default === 4">{{idx + 41}}</p>
          </div>
        </v-col>
        <v-col cols="7">
          <div class="d-flex align-center" style="">
            <p class="py-2 articleTextS">{{i.questions}}</p>
          </div>
        </v-col>
        <v-col cols="4" v-if="i.type === 'E' || i.type === 'S' || i.type === 'T' || i.type === 'J'" class="d-flex justify-center align-center">
          <v-radio-group v-model="i.point" row hide-details="" class="ma-0 pa-0 mr-2" style="width: 100%">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="1.7"
            ></v-radio>
            <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="27.6"
            ></v-radio>
            <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="50"
            ></v-radio>
            <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="72.4"
            ></v-radio>
            <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="98.3"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="4" v-if="i.type === 'I' || i.type === 'N' || i.type === 'F' || i.type === 'P'" class="d-flex justify-center align-center">
          <v-radio-group v-model="i.point" row hide-details="" class="ma-0 pa-0 mr-2" style="width: 100%">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="98.3"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="72.4"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="50"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="27.6"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              color="#62B6AB"
              :value="1.7"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="my-3">
          <div class="d-flex justify-center">
            <v-btn class="mr-2" tile elevation="0" color="rgba(0,0,0,.6)" dark @click="prevPage_default" v-if="page_default !== 0"><p>이전</p></v-btn>
            <v-btn class="mr-2" tile elevation="0" color="rgba(0,0,0,.6)" disabled v-if="page_default === 0"><p>이전</p></v-btn>
            <v-btn tile elevation="0" color="rgba(0,0,0,.6)" dark @click="nextPage_default" v-if="page_default !== 4"><p>다음</p></v-btn>
            <v-btn tile elevation="0" color="rgba(0,0,0,.6)" dark v-if="page_default === 4" @click="mbti_Result(0)"><p>다음</p></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- 선수 성향 -->
    <v-card width="1000" style="" rounded="0" elevation="0" outlined v-if="tendency_Page === 1">
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center align-center" style="background-color: rgb(98, 182, 171); color: white;">
            <p class="py-2 mainTextM">선수 성향 검사 - 50 문항</p>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="mb-1">
        <v-col cols="8">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS">질문</p>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="d-flex justify-center align-center" style="background-color: rgba(98, 182, 171,.4);">
            <p class="py-2 articleTextS mr-6">매우아니다</p>
            <p class="py-2 articleTextS mr-6">아니다</p>
            <p class="py-2 articleTextS mr-6">보통</p>
            <p class="py-2 articleTextS mr-6">그렇다</p>
            <p class="py-2 articleTextS">매우그렇다</p>
          </div>
        </v-col>
      </v-row>

      <v-row no-gutters v-for="(i, idx) in questions_player.slice(this.getQuestionP1_player, this.getQuestionP2_player)" :key="idx" style="border-bottom: 1px solid rgba(0,0,0,.15" class="py-1">
        <v-col cols="1">
          <div class="d-flex justify-center align-center" style="">
            <p class="py-2 articleTextS" v-if="page_player === 0">{{idx + 1}}</p>
            <p class="py-2 articleTextS" v-if="page_player === 1">{{idx + 11}}</p>
            <p class="py-2 articleTextS" v-if="page_player === 2">{{idx + 21}}</p>
            <p class="py-2 articleTextS" v-if="page_player === 3">{{idx + 31}}</p>
            <p class="py-2 articleTextS" v-if="page_player === 4">{{idx + 41}}</p>
          </div>
        </v-col>
        <v-col cols="7">
          <div class="d-flex align-center" style="">
            <p class="py-2 articleTextS">{{i.questions}}</p>
          </div>
        </v-col>
        <v-col cols="4" v-if="i.type === 'E' || i.type === 'S' || i.type === 'T' || i.type === 'J'" class="d-flex justify-center align-center">
            <v-radio-group v-model="i.point" row hide-details="" class="ma-0 pa-0 mr-2" style="width: 100%">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-radio
                :value="1.7"
              ></v-radio>
              <v-spacer></v-spacer>
              <v-radio
                :value="27.6"
              ></v-radio>
              <v-spacer></v-spacer>
              <v-radio
                :value="50"
              ></v-radio>
              <v-spacer></v-spacer>
              <v-radio
                :value="72.4"
              ></v-radio>
              <v-spacer></v-spacer>
              <v-radio
                :value="98.3"
              ></v-radio>
            </v-radio-group>
        </v-col>
        <v-col cols="4" v-if="i.type === 'I' || i.type === 'N' || i.type === 'F' || i.type === 'P'" class="d-flex justify-center align-center">
          <v-radio-group v-model="i.point" row hide-details="" class="ma-0 pa-0 mr-2" style="width: 100%">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            <v-radio
              :value="98.3"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              :value="72.4"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              :value="50"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              :value="27.6"
            ></v-radio>
              <v-spacer></v-spacer>
            <v-radio
              :value="1.7"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="my-3">
          <div class="d-flex justify-center">
            <v-btn class="mr-2" tile elevation="0" color="rgba(0,0,0,.6)" dark @click="prevPage_player" v-if="page_player !== 0"><p>이전</p></v-btn>
            <v-btn class="mr-2" tile elevation="0" color="rgba(0,0,0,.6)" disabled v-if="page_player === 0"><p>이전</p></v-btn>
            <v-btn tile elevation="0" color="rgba(0,0,0,.6)" dark @click="nextPage_player" v-if="page_player !== 4"><p>다음</p></v-btn>
            <v-btn tile elevation="0" color="rgba(0,0,0,.6)" dark v-if="page_player === 4" @click="mbti_Result(1)"><p>다음</p></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- 포지션 추천 -->
    <v-card width="1000" style="" rounded="0" elevation="0" outlined v-if="tendency_Page === 2">
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center align-center" style="background-color: rgb(98, 182, 171); color: white;">
            <p class="py-2 mainTextM">본인 스타일에 알맞은 단어를 선택해주세요.</p>
          </div>
        </v-col>     
      </v-row>
      <v-row>
        <v-col cols="12" class="px-10">
          <v-chip :color="i.color" :ripple="false" @click="position_Recomend(i)" v-for="i in word" :key="i.index" class="mx-3 my-2">
            <p class="px-2" v-if="i.color === '#62B6AB'" style="color: white;">{{i.type}}</p>
            <p class="px-2" v-if="i.color !== '#62B6AB'" style="color: black">{{i.type}}</p>
          </v-chip>
        </v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            @click="recomend_Result()"
            outlined
            elevation="2"
            width="50"
            min-width="90"
            color="rgb(200,200,200)"
          >
            <p style="color: black">확인</p>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog
      v-model="tipDialog2"
      max-width="1000"
      persistent
    >
      <v-card height="325" color="rgba(255,255,255)">
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
              <p>본 검사는 포지션 적합도를 찾아주는 검사입니다.</p>
            </div>
            <div class="d-flex align-start mb-4">
              <v-icon>mdi-circle-small</v-icon>
              <p>본인과 가장 알맞다고 생각되는 단어를 선택해주세요.</p>
            </div>
            <div class="d-flex align-start">
              <v-icon>mdi-circle-small</v-icon>
              <p>시간 제한은 없으며, 갯수 제한도 없습니다.</p>
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
    
    <v-dialog
      v-model="tipDialog"
      persistent
      max-width="1000"
    >
      <v-card color="rgba(255,255,255)">
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-center align-center" style="background-color: rgb(98, 182, 171); color: white;">
              <p class="py-2 mainTextM">하이플 AI 성향검사 결과지</p>
            </div>
          </v-col>
        </v-row>
        <v-row class="px-6">
          <v-col cols="4">
            <v-card height="200">
              <div style="height: 30px; background-color: rgb(240,240,240);" class="d-flex align-center">
                <p class="ml-3">정보</p>
              </div>
              <div class="d-flex align-center px-2">
                <v-card width="155" height="155" elevation="0" outlined class="pa-1" color="grey">
                </v-card>
                <div class="pa-3">
                  <p>이름</p>
                  <p>이창익</p>
                  <p>생년월일</p>
                  <p>1997.08.05</p>
                  <p>국적</p>
                  <p>대한민국</p>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card height="200" rounded="0">
              <div style="height: 30px; background-color: rgb(240,240,240);" class="d-flex align-center">
                <p class="ml-3">포지션 적합도</p>
              </div>
              <div v-if="tipDialog" class="pa-3">
                <div class="mb-2">
                  <p>1. {{result_Position[0][0]}}</p>
                  <v-progress-linear
                    :value="93"
                    color="#62B6AB"
                    height="17"
                  >
                    <p style="color: white;">{{ Math.ceil(93) }}%</p>
                  </v-progress-linear>
                </div>
                <div class="mb-2">
                  <p>2. {{result_Position[1][0]}}</p>
                  <v-progress-linear
                    :value="67"
                    color="amber"
                    height="17"
                  >
                    <p style="color: white;">{{ Math.ceil(67) }}%</p>
                  </v-progress-linear>
                </div>
                <div class="mb-2">
                  <p>3. {{result_Position[2][0]}}</p>
                  <v-progress-linear
                    :value="48"
                    color="red"
                    height="17"
                  >
                    <p style="color: white;">{{ Math.ceil(48) }}%</p>
                  </v-progress-linear>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <div style="height: 30px; background-color: rgb(240,240,240);" class="d-flex align-center">
                <p class="ml-3">답변 키워드 - Q. 본인의 축구스타일의 장점과 단점을 설명해주세요.</p>
              </div>
                <vue-word-cloud
                  v-if="tipDialog"
                  :words="voice_Words"
                  :spacing="1"
                  :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 7 ? 'RoyalBlue' : weight > 5 ? 'green' : 'Indigo'"
                  :rotation="0"
                  style="height: 180px"
                  class="my-3"
                  rotation-unit="deg"
                  :animation-duration="5000"
                  :font-size-ratio="5"
                  font-family="Roboto"
                />
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card height="100%">
              <div style="height: 30px; background-color: rgb(240,240,240);" class="d-flex align-center">
                <p class="ml-3">일반 성향</p>
              </div>
              <div class="pa-3">
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>외향</p>
                        <v-spacer></v-spacer>
                        <p>{{(E_Point * 0.1 - 10).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(E_Point * 0.1 - 10).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(I_Point * 0.1 - 10).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>내향</p>
                      </div>
                      <v-progress-linear
                        :value="(I_Point * 0.1 - 10).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>감각</p>
                        <v-spacer></v-spacer>
                        <p>{{(S_Point * 0.1 - 10).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(S_Point * 0.1 - 10).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(N_Point * 0.1 - 10).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>직관</p>
                      </div>
                      <v-progress-linear
                        :value="(N_Point * 0.1 - 10).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>사고</p>
                        <v-spacer></v-spacer>
                        <p>{{(T_Point * 0.1 - 10).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(T_Point * 0.1 - 10).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(F_Point * 0.1 - 10).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>감정</p>
                      </div>
                      <v-progress-linear
                        :value="(F_Point * 0.1 - 10).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>판단</p>
                        <v-spacer></v-spacer>
                        <p>{{(J_Point * 0.1 - 20).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(J_Point * 0.1 - 20).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(P_Point * 0.1 - 20).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>인식</p>
                      </div>                  
                      <v-progress-linear
                        :value="(P_Point * 0.1 - 20).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card height="100%">
              <div style="height: 30px; background-color: rgb(240,240,240);" class="d-flex align-center">
                <p class="ml-3">선수 성향</p>
              </div>
              <div class="pa-3">
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>외향</p>
                        <v-spacer></v-spacer>
                        <p>{{(E_Point_Player * 0.1 - 10).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(E_Point_Player * 0.1 - 10).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(I_Point_Player * 0.1 - 10).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>내향</p>
                      </div>
                      <v-progress-linear
                        :value="(I_Point_Player * 0.1 - 10).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>감각</p>
                        <v-spacer></v-spacer>
                        <p>{{(S_Point_Player * 0.1 - 10).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(S_Point_Player * 0.1 - 10).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(N_Point_Player * 0.1 - 10).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>직관</p>
                      </div>
                      <v-progress-linear
                        :value="(N_Point_Player * 0.1 - 10).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>사고</p>
                        <v-spacer></v-spacer>
                        <p>{{(T_Point_Player * 0.1 - 10).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(T_Point_Player * 0.1 - 10).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(F_Point_Player * 0.1 - 10).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>감정</p>
                      </div>
                      <v-progress-linear
                        :value="(F_Point_Player * 0.1 - 10).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
                <div class="mb-3 text-center">
                  <div class="d-flex text-center">
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>판단</p>
                        <v-spacer></v-spacer>
                        <p>{{(J_Point_Player * 0.1 - 20).toFixed(2)}}%</p>
                      </div>
                      <v-progress-linear
                        reverse
                        :value="(J_Point_Player * 0.1 - 20).toFixed(2)"
                        color="#62B6AB"
                        height="15"
                      ></v-progress-linear>
                    </div>
                    <div style="width: 50%">
                      <div class="d-flex px-2">
                        <p>{{(P_Point_Player * 0.1 - 20).toFixed(2)}}%</p>
                        <v-spacer></v-spacer>
                        <p>인식</p>
                      </div>                  
                      <v-progress-linear
                        :value="(P_Point_Player * 0.1 - 20).toFixed(2)"
                        color="red"
                        height="15"
                      ></v-progress-linear>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="px-6">
        </v-row>
        <v-row class="px-8 py-3" no-gutters>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              @click="tipDialog = false"
              outlined
              elevation="0"
              width="50"
              min-width="90"
            >
              <p>확인</p>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Questions from './Questions.js'
import Questions_Player from './Questions_Player.js'
import Word from './Word.js'
import VueWordCloud from 'vuewordcloud';

export default {
  components: {
    [VueWordCloud.name]: VueWordCloud,
  },

  data () {
    return {
      angry_Count: 0,
      disgusted_Count: 0,
      fearful_Count: 0,
      happy_Count: 0,
      neutral_Count: 0,
      sad_Count: 0,
      surprised_Count: 0,
      male_Count: 0,
      female_Count: 0,
      voiceTexts: this.$store.state.voiceTexts,
      // voiceTexts: [["저의",2], ["장점은",3], ["빠른",8], ["스피드와",9], ["민첩성",12], ["시야라고",11], ["생각합니다.",4], ["또한",3], ["필드",4], ["안에서",4], ["감독의",5], ["지시를",6], ["확실히",8], ["이해하고",11], ["실행할",9], ["수",2], ["있는",2],
      // ["이해력을",12], ["가지고",7], ["있습니다.",3], ["반면",2], ["저는",3], ["왜소한",10], ["체격을",8], ["가지고",5], ["있기",3], ["때문에",3], ["몸싸움",12], ["등",3], ["피지컬",10], ["부분에서",4], ["약하다는",12], ["단점이",3], ["있습니다.",4]],
      voice_Words: [],
      count_data: [],

      E_Point: 0,
      I_Point: 0,
      S_Point: 0,
      N_Point: 0,
      T_Point: 0,
      F_Point: 0,
      J_Point: 0,
      P_Point: 0,
      E_Point_Player: 0,
      I_Point_Player: 0,
      S_Point_Player: 0,
      N_Point_Player: 0,
      T_Point_Player: 0,
      F_Point_Player: 0,
      J_Point_Player: 0,
      P_Point_Player: 0,
      toggle_exclusive: [],
      selected: [],
      radioGroup: [],
      page_default: 0,
      page_player: 0,
      tendency_Page: 0,
      questions: Questions,
      questions_player: Questions_Player,
      word: Word,
      tipDialog: false,
      tipDialog2: false,

      selection: 0,
      result_CF: 0,
      result_SS: 0,
      result_RWF: 0,
      result_LWF: 0,
      result_CM: 0,
      result_CDM: 0,
      result_CAM: 0,
      result_LM: 0,
      result_RM: 0,
      result_CB: 0,
      result_SW: 0,
      result_LB: 0,
      result_RB: 0,
      result_LWB: 0,
      result_RWB: 0,
      result_GK: 0,

      result_Position: '',
    }
  },
  methods: {
    nextPage_default() {
      if (this.page_default === 4) {
        this.page_default = 4;  
      }else{
        this.page_default = this.page_default + 1;
      }
    },
    prevPage_default() {
      if (this.page_default === 0) {
        this.page_default = 0;  
      }else{
        this.page_default = this.page_default - 1;
      }
    },
    nextPage_player() {
      if (this.page_player === 4) {
        this.page_player = 4;  
      }else{
        this.page_player = this.page_player + 1;
      }
    },
    prevPage_player() {
      if (this.page_player === 0) {
        this.page_player = 0;  
      }else{
        this.page_player = this.page_player - 1;
      }
    },
    position_Recomend(word) {
      if(word.selection === 0) {
        this.result_CF = this.result_CF + word.CF;
        this.result_SS = this.result_SS + word.SS;
        this.result_RWF = this.result_RWF + word.RWF;
        this.result_LWF = this.result_LWF + word.LWF;
        this.result_CM = this.result_CM + word.CM;
        this.result_CDM = this.result_CDM + word.CDM;
        this.result_CAM = this.result_CAM + word.CAM;
        this.result_LM = this.result_LM + word.LM;
        this.result_RM = this.result_RM + word.RM;
        this.result_CB = this.result_CB + word.CB;
        this.result_SW = this.result_SW + word.SW;
        this.result_LB = this.result_LB + word.LB;
        this.result_RB = this.result_RB + word.RB;
        this.result_LWB = this.result_LWB + word.LWB;
        this.result_RWB = this.result_RWB + word.RWB;
        this.result_GK = this.result_GK + word.GK;
        word.selection ++;
        word.color = '#62B6AB';
      } else {
        this.result_CF = this.result_CF - word.CF;
        this.result_SS = this.result_SS - word.SS;
        this.result_RWF = this.result_RWF - word.RWF;
        this.result_LWF = this.result_LWF - word.LWF;
        this.result_CM = this.result_CM - word.CM;
        this.result_CDM = this.result_CDM - word.CDM;
        this.result_CAM = this.result_CAM - word.CAM;
        this.result_LM = this.result_LM - word.LM;
        this.result_RM = this.result_RM - word.RM;
        this.result_CB = this.result_CB - word.CB;
        this.result_SW = this.result_SW - word.SW;
        this.result_LB = this.result_LB - word.LB;
        this.result_RB = this.result_RB - word.RB;
        this.result_LWB = this.result_LWB - word.LWB;
        this.result_RWB = this.result_RWB - word.RWB;
        this.result_GK = this.result_GK - word.GK;
        word.selection --;
        word.color = '';
      }
    },
    recomend_Result() {
      var position =  {CF : this.result_CF, SS : this.result_SS, RWF : this.result_RWF, LWF : this.result_LWF, CM : this.result_CM,
                      CDM : this.result_CDM, CAM : this.result_CAM, LM : this.result_LM, RM : this.result_RM, CB : this.result_CB,
                      SW : this.result_SW, LB : this.result_LB, RB : this.result_RB, LWB : this.result_LWB, RWB : this.result_RWB, GK : this.result_GK}
      var sortable_position = [];
      for (var i in position) {
        sortable_position.push([i, position[i]]);
      }

      this.result_Position = sortable_position.sort(function (a, b) {
        return b[1] - a[1] ;
      });
      this.get_FaceData();
      this.tipDialog = true;
    },
    mbti_Result(num) {
      var i;
      switch(num) {
        case 0: {
          for (i in this.questions) {
            switch(this.questions[i].type) {
              case 'E' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.E_Point = this.E_Point + this.questions[i].point;
                    this.I_Point = this.I_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.E_Point = this.E_Point + this.questions[i].point;
                    this.I_Point = this.I_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.E_Point = this.E_Point + this.questions[i].point;
                    this.I_Point = this.I_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.E_Point = this.E_Point + this.questions[i].point;
                    this.I_Point = this.I_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.E_Point = this.E_Point + this.questions[i].point;
                    this.I_Point = this.I_Point + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'I' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.I_Point = this.I_Point + this.questions[i].point;
                    this.E_Point = this.E_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.I_Point = this.I_Point + this.questions[i].point;
                    this.E_Point = this.E_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.I_Point = this.I_Point + this.questions[i].point;
                    this.E_Point = this.E_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.I_Point = this.I_Point + this.questions[i].point;
                    this.E_Point = this.E_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.I_Point = this.I_Point + this.questions[i].point;
                    this.E_Point = this.E_Point + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'S' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.S_Point = this.S_Point + this.questions[i].point;
                    this.N_Point = this.N_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.S_Point = this.S_Point + this.questions[i].point;
                    this.N_Point = this.N_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.S_Point = this.S_Point + this.questions[i].point;
                    this.N_Point = this.N_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.S_Point = this.S_Point + this.questions[i].point;
                    this.N_Point = this.N_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.S_Point = this.S_Point + this.questions[i].point;
                    this.N_Point = this.N_Point + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'N' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.N_Point = this.N_Point + this.questions[i].point;
                    this.S_Point = this.S_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.N_Point = this.N_Point + this.questions[i].point;
                    this.S_Point = this.S_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.N_Point = this.N_Point + this.questions[i].point;
                    this.S_Point = this.S_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.N_Point = this.N_Point + this.questions[i].point;
                    this.S_Point = this.S_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.N_Point = this.N_Point + this.questions[i].point;
                    this.S_Point = this.S_Point + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'T' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.T_Point = this.T_Point + this.questions[i].point;
                    this.F_Point = this.F_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.T_Point = this.T_Point + this.questions[i].point;
                    this.F_Point = this.F_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.T_Point = this.T_Point + this.questions[i].point;
                    this.F_Point = this.F_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.T_Point = this.T_Point + this.questions[i].point;
                    this.F_Point = this.F_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.T_Point = this.T_Point + this.questions[i].point;
                    this.F_Point = this.F_Point + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'F' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.F_Point = this.F_Point + this.questions[i].point;
                    this.T_Point = this.T_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.F_Point = this.F_Point + this.questions[i].point;
                    this.T_Point = this.T_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.F_Point = this.F_Point + this.questions[i].point;
                    this.T_Point = this.T_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.F_Point = this.F_Point + this.questions[i].point;
                    this.T_Point = this.T_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.F_Point = this.F_Point + this.questions[i].point;
                    this.T_Point = this.T_Point + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'J' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.J_Point = this.J_Point + this.questions[i].point;
                    this.P_Point = this.P_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.J_Point = this.J_Point + this.questions[i].point;
                    this.P_Point = this.P_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.J_Point = this.J_Point + this.questions[i].point;
                    this.P_Point = this.P_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.J_Point = this.J_Point + this.questions[i].point;
                    this.P_Point = this.P_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.J_Point = this.J_Point + this.questions[i].point;
                    this.P_Point = this.P_Point + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'P' : {
                switch(this.questions[i].point) {
                  case 1.7 : {
                    this.P_Point = this.P_Point + this.questions[i].point;
                    this.J_Point = this.J_Point + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.P_Point = this.P_Point + this.questions[i].point;
                    this.J_Point = this.J_Point + 72.4;
                    break;
                  }
                  case 50 : {
                    this.P_Point = this.P_Point + this.questions[i].point;
                    this.J_Point = this.J_Point + 50;
                    break;
                  }
                  case 72.4 : {
                    this.P_Point = this.P_Point + this.questions[i].point;
                    this.J_Point = this.J_Point + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.P_Point = this.P_Point + this.questions[i].point;
                    this.J_Point = this.J_Point + 1.7;
                    break;
                  }
                }
                break;
              }
            }
          }
          this.tendency_Page = 1;
          break;
        }
        case 1: {
          for (i in this.questions_player) {
            switch(this.questions_player[i].type) {
              case 'E' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.E_Point_Player = this.E_Point_Player + this.questions_player[i].point;
                    this.I_Point_Player = this.I_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.E_Point_Player = this.E_Point_Player + this.questions_player[i].point;
                    this.I_Point_Player = this.I_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.E_Point_Player = this.E_Point_Player + this.questions_player[i].point;
                    this.I_Point_Player = this.I_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.E_Point_Player = this.E_Point_Player + this.questions_player[i].point;
                    this.I_Point_Player = this.I_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.E_Point_Player = this.E_Point_Player + this.questions_player[i].point;
                    this.I_Point_Player = this.I_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'I' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.I_Point_Player = this.I_Point_Player + this.questions_player[i].point;
                    this.E_Point_Player = this.E_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.I_Point_Player = this.I_Point_Player + this.questions_player[i].point;
                    this.E_Point_Player = this.E_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.I_Point_Player = this.I_Point_Player + this.questions_player[i].point;
                    this.E_Point_Player = this.E_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.I_Point_Player = this.I_Point_Player + this.questions_player[i].point;
                    this.E_Point_Player = this.E_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.I_Point_Player = this.I_Point_Player + this.questions_player[i].point;
                    this.E_Point_Player = this.E_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'S' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.S_Point_Player = this.S_Point_Player + this.questions_player[i].point;
                    this.N_Point_Player = this.N_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.S_Point_Player = this.S_Point_Player + this.questions_player[i].point;
                    this.N_Point_Player = this.N_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.S_Point_Player = this.S_Point_Player + this.questions_player[i].point;
                    this.N_Point_Player = this.N_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.S_Point_Player = this.S_Point_Player + this.questions_player[i].point;
                    this.N_Point_Player = this.N_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.S_Point_Player = this.S_Point_Player + this.questions_player[i].point;
                    this.N_Point_Player = this.N_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'N' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.N_Point_Player = this.N_Point_Player + this.questions_player[i].point;
                    this.S_Point_Player = this.S_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.N_Point_Player = this.N_Point_Player + this.questions_player[i].point;
                    this.S_Point_Player = this.S_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.N_Point_Player = this.N_Point_Player + this.questions_player[i].point;
                    this.S_Point_Player = this.S_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.N_Point_Player = this.N_Point_Player + this.questions_player[i].point;
                    this.S_Point_Player = this.S_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.N_Point_Player = this.N_Point_Player + this.questions_player[i].point;
                    this.S_Point_Player = this.S_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'T' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.T_Point_Player = this.T_Point_Player + this.questions_player[i].point;
                    this.F_Point_Player = this.F_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.T_Point_Player = this.T_Point_Player + this.questions_player[i].point;
                    this.F_Point_Player = this.F_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.T_Point_Player = this.T_Point_Player + this.questions_player[i].point;
                    this.F_Point_Player = this.F_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.T_Point_Player = this.T_Point_Player + this.questions_player[i].point;
                    this.F_Point_Player = this.F_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.T_Point_Player = this.T_Point_Player + this.questions_player[i].point;
                    this.F_Point_Player = this.F_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'F' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.F_Point_Player = this.F_Point_Player + this.questions_player[i].point;
                    this.T_Point_Player = this.T_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.F_Point_Player = this.F_Point_Player + this.questions_player[i].point;
                    this.T_Point_Player = this.T_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.F_Point_Player = this.F_Point_Player + this.questions_player[i].point;
                    this.T_Point_Player = this.T_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.F_Point_Player = this.F_Point_Player + this.questions_player[i].point;
                    this.T_Point_Player = this.T_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.F_Point_Player = this.F_Point_Player + this.questions_player[i].point;
                    this.T_Point_Player = this.T_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'J' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.J_Point_Player = this.J_Point_Player + this.questions_player[i].point;
                    this.P_Point_Player = this.P_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.J_Point_Player = this.J_Point_Player + this.questions_player[i].point;
                    this.P_Point_Player = this.P_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.J_Point_Player = this.J_Point_Player + this.questions_player[i].point;
                    this.P_Point_Player = this.P_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.J_Point_Player = this.J_Point_Player + this.questions_player[i].point;
                    this.P_Point_Player = this.P_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.J_Point_Player = this.J_Point_Player + this.questions_player[i].point;
                    this.P_Point_Player = this.P_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
              case 'P' : {
                switch(this.questions_player[i].point) {
                  case 1.7 : {
                    this.P_Point_Player = this.P_Point_Player + this.questions_player[i].point;
                    this.J_Point_Player = this.J_Point_Player + 98.3;
                    break;
                  }
                  case 27.6 : {
                    this.P_Point_Player = this.P_Point_Player + this.questions_player[i].point;
                    this.J_Point_Player = this.J_Point_Player + 72.4;
                    break;
                  }
                  case 50 : {
                    this.P_Point_Player = this.P_Point_Player + this.questions_player[i].point;
                    this.J_Point_Player = this.J_Point_Player + 50;
                    break;
                  }
                  case 72.4 : {
                    this.P_Point_Player = this.P_Point_Player + this.questions_player[i].point;
                    this.J_Point_Player = this.J_Point_Player + 27.6;
                    break;
                  }
                  case 98.3 : {
                    this.P_Point_Player = this.P_Point_Player + this.questions_player[i].point;
                    this.J_Point_Player = this.J_Point_Player + 1.7;
                    break;
                  }
                }
                break;
              }
            }
          }
          this.tipDialog2 = true;
          this.tendency_Page = 4;
        }
      }
    },
    get_FaceData() {
      this.count_data.push({name: "angry", data: this.$store.state.angry_Count});
      this.count_data.push({name: "disgusted", data: this.$store.state.disgusted_Count});
      this.count_data.push({name: "fearful", data: this.$store.state.fearful_Count});
      this.count_data.push({name: "happy", data: this.$store.state.happy_Count});
      this.count_data.push({name: "neutral", data: this.$store.state.neutral_Count});
      this.count_data.push({name: "sad", data: this.$store.state.sad_Count});
      this.count_data.push({name: "surprised", data: this.$store.state.surprised_Count});

      for (var i in this.voiceTexts) {
        var r = Math.floor(Math.random() * 15)
        this.voice_Words.push([this.voiceTexts[i], r])
      }
      // console.log(this.voice_Words);
    },
    tipPopup() {
      this.tendency_Page = 2;
      this.tipDialog2 = false;
    }
  },
  computed:{
    getQuestionP1_default(){  
      switch(this.page_default){
        case 0 : return 0;
        case 1 : return 10;
        case 2 : return 20;
        case 3 : return 30;
        case 4 : return 40;
        default : return 0;
      }
    },
    getQuestionP2_default(){  
      switch(this.page_default){
        case 0 : return 10;
        case 1 : return 20;
        case 2 : return 30;
        case 3 : return 40;
        case 4 : return 50;
        default : return 10;
      }
    },
    getQuestionP1_player(){  
      switch(this.page_player){
        case 0 : return 0;
        case 1 : return 10;
        case 2 : return 20;
        case 3 : return 30;
        case 4 : return 40;
        default : return 0;
      }
    },
    getQuestionP2_player(){  
      switch(this.page_player){
        case 0 : return 10;
        case 1 : return 20;
        case 2 : return 30;
        case 3 : return 40;
        case 4 : return 50;
        default : return 10;
      }
    },
  },
}
</script>

<style>
.bColor {
  background-color: #58B99D;
}
</style>
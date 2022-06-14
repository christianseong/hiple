<template>
  <div style="position: relative;">
    <v-img
      width="100%"
      height="calc(100vh)"
      src="../assets/background.png"
      style="position: absolute;"
    ></v-img>
    <v-row justify="center" align="center" style="height: calc(100vh - 90px); width: 100%;" no-gutters>
      <v-card elevation="10" height="750" width="1200px">
        <!-- <Voice_01/> -->
        <v-stepper v-model="this.$store.state.number" elevation="0" color="rgba(0,0,0,.0)" style="background-color: rgba(0,0,0,.0)">
          <div class="d-flex align-center justify-center">
            <v-stepper-step :complete="this.$store.state.number > 1" step="1" color="rgb(98, 182, 171)">
              <p>장치점검</p>
            </v-stepper-step>
            <div style="width: 50px; border-bottom: 1px solid rgba(0,0,0,.12)"></div>
            <v-stepper-step :complete="this.$store.state.number > 2" step="2" color="rgb(98, 182, 171)">
              <p>기본면접</p>
            </v-stepper-step>
            <div style="width: 50px; border-bottom: 1px solid rgba(0,0,0,.12)"></div>
            <v-stepper-step step="3" color="rgb(98, 182, 171)">
              <p>성향분석</p>
            </v-stepper-step>
          </div>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row class="text-center">
                <v-col cols="12">
                  <p class="mainTextM px-6 py-2">하이플 AI 성향분석은 마우스와 웹캠, 마이크가 필요합니다.<br>아래 각 기기별 <span style="color: #F1C042">주의사항</span>을 확인해 주세요.</p>
                </v-col>
                <v-col cols="12">
                    <p class="articleTextM">
                      각 <span style="color: #62B6AB">기기별 버튼</span>을 누르시고 설정 상태를 확인해 주세요.
                    </p>
                </v-col>
              </v-row>
              <v-row class="text-center mt-6" justify="center" align="center">
                <!-- 마우스 -->
                <v-col cols="3" class="d-flex justify-center">
                  <v-card
                    v-if="!mouseOn"
                    width="260" height="320"
                    style="background-color: rgba(98, 182, 171,.85); color: white;"
                    class="pa-2 d-flex flex-column justify-center align-center cartHover"
                    @click="mouseDialog = !mouseDialog"
                  >
                    <p class="mainTextM mb-3">마우스</p>
                    <v-card height="80px" elevation="0" class="mt-3 mb-3" color="rgba(0,0,0,.0)">
                      <v-img
                        src="../assets/mouse.png"
                        contain
                        width="100%"
                        height="100%"
                      ></v-img>
                    </v-card>
                    <p class="articleTextS mt-4">
                      노트북 터치패드 사용은 지양해 주시고,<br />
                      마우스 감도를 적절히 조정해 주세요.
                    </p>
                    <v-icon dark class="mt-5">mdi-checkbox-blank-circle-outline</v-icon>
                  </v-card>
                  <v-card
                    v-if="mouseOn"
                    width="260" height="320"
                    style="background-color: rgba(98, 182, 171,.85); color: white;"
                    class="pa-2 d-flex flex-column justify-center align-center"
                  >
                    <p class="mainTextM mb-3">마우스</p>
                    <v-card height="80px" elevation="0" class="mt-3 mb-3" color="rgba(0,0,0,.0)">
                      <v-img
                        src="../assets/mouse.png"
                        contain
                        width="100%"
                        height="100%"
                      ></v-img>
                    </v-card>
                    <p class="articleTextS mt-4">
                      노트북 터치패드 사용은 지양해 주시고,<br />
                      마우스 감도를 적절히 조정해 주세요.
                    </p>
                    <v-icon dark class="mt-5">mdi-checkbox-marked-circle</v-icon>
                  </v-card>
                </v-col>
                <!-- 웹캠 -->
                <v-col cols="3" class="d-flex justify-center">
                  <v-card
                    v-if="!webcamOn"
                    width="260" height="320"
                    style="background-color: rgba(98, 182, 171,.85); color: white;"
                    class="pa-2 d-flex flex-column justify-center align-center cartHover"
                    @click="fstart()"
                  >
                    <p class="mainTextM mb-3">웹캠</p>
                    <v-card height="80px" elevation="0" class="mt-3 mb-3" color="rgba(0,0,0,.0)">
                      <v-img
                        src="../assets/webcam.png"
                        width="100%"
                        height="100%"
                        contain
                      ></v-img>
                    </v-card>
                    <p class="articleTextS mt-4">
                      웹캠이 정상적으로 설치, 연결되었는지,<br />확인해 주세요.
                    </p>
                    <v-icon dark class="mt-5">mdi-checkbox-blank-circle-outline</v-icon>
                  </v-card>
                  <v-card
                    v-if="webcamOn"
                    width="260" height="320"
                    style="background-color: rgba(98, 182, 171,.85); color: white;"
                    class="pa-2 d-flex flex-column justify-center align-center"
                  >
                    <p class="mainTextM mb-3">웹캠</p>
                    <v-card height="80px" elevation="0" class="mt-3 mb-3" color="rgba(0,0,0,.0)">
                      <v-img
                        src="../assets/webcam.png"
                        width="100%"
                        height="100%"
                        contain
                      ></v-img>
                    </v-card>
                    <p class="articleTextS mt-4">
                      웹캠이 정상적으로 설치, 연결되었는지,<br />확인해 주세요.
                    </p>
                    <v-icon dark class="mt-5">mdi-checkbox-marked-circle</v-icon>
                  </v-card>
                </v-col>
                <!-- 마이크 -->
                <v-col cols="3" class="d-flex justify-center">
                  <v-card
                    v-if="!micOn"
                    width="260" height="320"
                    style="background-color: rgba(98, 182, 171,.85); color: white;"
                    class="pa-2 d-flex flex-column justify-center align-center cartHover"
                    @click="micDialog = !micDialog"
                  >
                    <p class="mainTextM mb-3">마이크</p>
                    <v-card height="80px" elevation="0" class="mt-3 mb-3" color="rgba(0,0,0,.0)">
                      <v-img
                        src="../assets/mic.png"
                        width="100%"
                        height="100%"
                        contain
                      ></v-img>
                    </v-card>
                    <p class="articleTextS mt-4">
                      마이크 상태를 사전에 확인해 주세요.<br />이어폰 마이크
                      사용가능
                    </p>
                    <v-icon dark class="mt-5">mdi-checkbox-blank-circle-outline</v-icon>
                  </v-card>
                  <v-card
                    v-if="micOn"
                    width="260" height="320"
                    style="background-color: rgba(98, 182, 171,.85); color: white;"
                    class="pa-2 d-flex flex-column justify-center align-center"
                  >
                    <p class="mainTextM mb-3">마이크</p>
                    <v-card height="80px" elevation="0" class="mt-3 mb-3" color="rgba(0,0,0,.0)">
                      <v-img
                        src="../assets/mic.png"
                        width="100%"
                        height="100%"
                        contain
                      ></v-img>
                    </v-card>
                    <p class="articleTextS mt-4">
                      마이크 상태를 사전에 확인해 주세요.<br />이어폰 마이크
                      사용가능
                    </p>
                    <v-icon dark class="mt-5">mdi-checkbox-marked-circle</v-icon>
                  </v-card>
                </v-col>
              </v-row>
              <v-row class="pb-1">
                <v-col cols="12" class="mt-10">
                  <div class="d-flex justify-center">
                    <v-btn @click="nextPage(1)" width="130" class="mr-5" color="rgba(200,200,200)" outlined elevation="2">
                      <p class="articleTextS" style="color: black">확인</p>
                    </v-btn>

                    <v-btn @click="nextPage(2)" width="130" elevation="2" color="rgba(230,230,230)">
                      <p class="articleTextS" style="color: black">점검 건너뛰기</p>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row>
                <v-col cols="12" v-if="interviewStart" class="pa-4">
                  <FaceDetection/>
                </v-col>
              </v-row>
              <v-dialog
                v-model="tipDialog"
                persistent
                max-width="1000"
              >
                <v-card height="410" color="rgba(255,255,255)">
                  <v-row>
                    <v-col cols="12">
                      <div class="d-flex justify-center align-center" style="background-color: rgb(98, 182, 171); color: white;">
                        <p class="py-2 mainTextM">하이플 AI 성향분석 가이드</p>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="px-8">
                    <v-col cols="12">
                      <p class="mainTextM mb-4">응시 중 문제 해결</p>
                      <div class="d-flex align-start mb-4">
                        <v-icon>mdi-circle-small</v-icon>
                        <p>하이플 AI 성향분석은 Chrome 브라우저에 최적화 되어 있습니다.<br> 다른 브라우저에서는 정상적으로 작동이 되지 않을 수 있으므로, Chrome 브라우저 사용을 권합니다.</p>
                      </div>
                      <div class="d-flex align-start mb-4">
                        <v-icon>mdi-circle-small</v-icon>
                        <p>성향분석 진행중 뒤로가기 버튼을 누르면 진행 중이던 데이터들이 저장되지 않습니다.<br>이러한 경우 처음 단계부터 다시 시작하게 됩니다.</p>
                      </div>
                      <div class="d-flex align-start mb-4">
                        <v-icon>mdi-circle-small</v-icon>
                        <p>응시 중 마우스, 웹캠, 마이크의 장치에 이상이 생길 시 진행 중이던 데이터들이 정상적으로 저장되지 않을 수 있습니다.<br>반드시 장치 점검을 완료후 응시해 주세요.</p>
                      </div>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <v-btn
                        @click="tipPopup(1)"
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
                v-model="tipDialog2"
                persistent
                max-width="1000"
              >
                <v-card height="670" color="rgba(255,255,255)">
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
                        <p class="articleTextM">하이플 AI 성향분석은 생각시간 30초와 답변시간 90초로 진행이 됩니다.<br>답변 기회는 질문당 2번 제공되며, 30초 이상 답변을 해야 보다 정확한 분석이 가능합니다. </p>
                      </div>
                      <div class="d-flex pa-2">
                        <div style="position: relative; width: 110px; height: 110px">
                          <Timer/>
                          <v-card color="rgba(0,0,0,.0)" width="80" style="position: absolute; top:0; right: -36%; transform: translate(0%, 0%);" elevation="0">
                            <v-img
                            src="../assets/t2.png"
                            ></v-img>
                          </v-card>
                          <v-card color="rgba(0,0,0,.0)" width="80" style="position: absolute; top:45%; right: -44%; transform: translate(0%, 0%);" elevation="0">
                            <v-img
                            src="../assets/t7.png"
                            ></v-img>
                          </v-card>
                        </div>
                        <div class="articleTextM ml-9 d-flex flex-column" style="height: 93px;">
                          <p style="color: orange;">생각시간</p>
                          <v-spacer></v-spacer>
                          <p style="color: #64B587">답변시간</p>
                        </div>
                      </div>
                      <div class="d-flex justify-center mt-2">
                        <v-card width="50%" outlined class="d-flex flex-column align-center justify-center mr-2" color="rgba(0, 0, 0,.3)" rounded="0" style="color: white;">
                          <div class="pa-5">
                            <div class="d-flex align-start mb-4">
                              <p>카메라의 중앙에 얼굴 전체가 나오도록 위치해주세요.</p>
                            </div>
                            <div class="d-flex justify-center">
                              <div>
                                <v-card class="pa-1 mr-1" color="rgba(0,0,0,.0)" width="90" outlined>
                                  <v-img
                                  contain
                                  src="../assets/bf1.png"
                                  ></v-img>
                                </v-card>
                              </div>
                              <v-card class="pa-1" color="rgba(0,0,0,.0)" width="90" outlined>
                                <v-img
                                contain
                                src="../assets/bf2.png"
                                ></v-img>
                              </v-card>
                              <v-icon x-large dark>mdi-arrow-right-bold</v-icon>
                              <v-card class="pa-1" color="rgba(0,0,0,.0)" width="90" outlined>
                                <v-img
                                contain
                                src="../assets/gf.png"
                                ></v-img>
                              </v-card>
                            </div>
                          </div>
                          <div style="background-color: rgba(0, 0, 0,.5); width: 100%" class="text-center py-3">
                            <p>답변중 머리를 좌우, 상하로 흔들경우<br>분석이 부정확할 수 있습니다.</p>
                          </div>
                        </v-card>
                        <v-card width="50%" outlined class="d-flex flex-column align-center justify-center" color="rgba(0, 0, 0,.3)" rounded="0" style="color: white;">
                          <div class="pa-5">
                            <div class="d-flex align-start mb-4">
                              <p>주변 소음은 줄이고 목소리는 크게 답변해주세요.</p>
                            </div>
                            <div class="d-flex justify-center">
                              <v-card class="pa-1 mr-1" color="rgba(0,0,0,.0)" width="90" outlined>
                                <v-img
                                contain
                                src="../assets/12344455.png"
                                ></v-img>
                              </v-card>
                              <v-icon x-large dark>mdi-arrow-right-bold</v-icon>
                              <v-card class="pa-1" color="rgba(0,0,0,.0)" width="90" outlined>
                                <v-img
                                contain
                                src="../assets/voice22.png"
                                ></v-img>
                              </v-card>
                            </div>
                          </div>
                          <div style="background-color: rgba(0, 0, 0,.5); width: 100%" class="text-center py-3">
                            <p>주변 소음이 심할 경우 음성 인식이 어려워<br> 분석이 부정확할 수 있습니다.</p>
                          </div>
                        </v-card>
                      </div>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <v-btn
                        @click="tipPopup(2)"
                        outlined
                        elevation="2"
                        width="50"
                        min-width="90"
                        color="rgba(200,200,200)"
                      >
                        <p style="color: black">시작하기</p>
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-card>
              </v-dialog>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row>
                <v-col cols="12" class="pa-4" v-if="this.$store.state.positionGuide === 1">
                  <Mbti/>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <!-- 장치점검 마우스 -->
        <v-dialog v-model="mouseDialog" width="500">
          <v-card>
            <v-card color="rgba(98, 182, 171)" elevation="0" rounded="0">
              <p class="pa-3" style="color: white">장치점검 - 마우스</p>
            </v-card>

            <v-card class="text-center my-5" elevation="0">
              <p>아래 마우스 이미지를 클릭해 주세요.</p>
              <p>이상이 없으면 '좋아요'가 활성화됩니다.</p>
            </v-card>

            <v-card
              class="d-flex flex-column align-center pa-4 mx-4"
              elevation="0"
              outlined
            >
              <v-card
                width="100"
                height="100"
                elevation="0"
                :ripple="false"
                color="rgba(0,0,0,.0)"
              >
                <v-img
                  @click="mouseOn = !mouseOn"
                  style="cursor: pointer;"
                  src="../assets/mouse.png"
                  contain
                ></v-img>
              </v-card>

              <!-- 버튼 -->
              <v-card class="d-flex mt-5" elevation="0" color="rgba(0,0,0,.0)">
                <v-card
                  rounded="xl"
                  class="d-flex align-center mr-2"
                  color="rgb(210, 210, 210)"
                  elevation="0"
                  v-if="!mouseOn"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="rgb(130, 130, 130)"
                    elevation="0"
                  >
                    <v-icon dark>mdi-thumb-up</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    좋아요!
                  </p>
                </v-card>

                <v-card
                  rounded="xl"
                  class="d-flex align-center mr-2"
                  color="rgba(98, 182, 171)"
                  elevation="0"
                  v-if="mouseOn"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="#166d5c"
                    elevation="0"
                  >
                    <v-icon dark>mdi-thumb-up</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    좋아요!
                  </p>
                </v-card>

                <v-card
                  rounded="xl"
                  class="d-flex align-center ml-2"
                  color="grey"
                  elevation="0"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="rgb(41, 41, 41)"
                    elevation="0"
                  >
                    <v-icon dark>mdi-wrench</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    환경설정
                  </p>
                </v-card>
              </v-card>
            </v-card>

            <v-card width="100%" class="d-flex justify-center">
              <v-card
                width="120"
                height="40"
                class="d-flex justify-center align-center mt-5 mb-7"
                color="rgba(98, 182, 171)"
                elevation="0"
                rounded="0"
                @click="mouseDialog = !mouseDialog"
              >
                <p style="; color: white">확인</p>
              </v-card>
            </v-card>
          </v-card>
        </v-dialog>
        <!-- 장치점검 웹캠 -->
        <v-dialog v-model="webcamDialog" width="500">
          <v-card>
            <v-card color="rgba(98, 182, 171)" elevation="0" rounded="0">
              <p class="pa-3" style="color: white">장치점검 - 웹캠</p>
            </v-card>

            <v-card class="text-center my-5" elevation="0">
              <p>웹캠으로 자신의 얼굴이 나오는지 확인해주세요.</p>
              <p>이상이 없으면 '좋아요'가 활성화됩니다.</p>
            </v-card>

            <v-card
              class="pa-4 mx-4 d-flex flex-column align-center justify-center"
              rounded="0"
              elevation="0"
              outlined
            >
              <video autoplay ref="player" width="300"></video>
              <!-- 버튼 -->
              <v-card class="d-flex mt-5" elevation="0">
                <v-card
                  rounded="xl"
                  class="d-flex align-center mr-2"
                  color="rgb(210, 210, 210)"
                  elevation="0"
                  v-if="!webcamOn"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="rgb(130, 130, 130)"
                    elevation="0"
                  >
                    <v-icon dark>mdi-thumb-up</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    좋아요!
                  </p>
                </v-card>

                <v-card
                  rounded="xl"
                  class="d-flex align-center mr-2"
                  color="rgba(98, 182, 171)"
                  elevation="0"
                  v-if="webcamOn"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="#166d5c"
                    elevation="0"
                  >
                    <v-icon dark>mdi-thumb-up</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    좋아요!
                  </p>
                </v-card>

                <v-card
                  rounded="xl"
                  class="d-flex align-center ml-2"
                  color="grey"
                  elevation="0"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="rgb(41, 41, 41)"
                    elevation="0"
                  >
                    <v-icon dark>mdi-wrench</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    환경설정
                  </p>
                </v-card>
              </v-card>
            </v-card>

            <v-card width="100%" class="d-flex justify-center">
              <v-card
                width="120"
                height="40"
                class="d-flex justify-center align-center mt-5 mb-7"
                elevation="0"
                rounded="0"
                @click="webcamDialog = !webcamDialog"
                color="rgba(98, 182, 171)"
              >
                <p style="; color: white">확인</p>
              </v-card>
            </v-card>
          </v-card>
        </v-dialog>
        <!-- 장치점검 마이크 -->
        <v-dialog v-model="micDialog" width="500">
          <v-card>
            <v-card color="rgba(98, 182, 171)" elevation="0" rounded="0">
              <p class="pa-3" style="color: white">장치점검 - 마이크</p>
            </v-card>

            <v-card class="text-center my-5" elevation="0">
              <p>마이크 버튼을 누르고 말을 해보세요.</p>
              <p>이상이 없으면 '좋아요'가 활성화됩니다.</p>
            </v-card>
            <v-card
              class="d-flex flex-column align-center pa-4 mx-4"
              elevation="0"
              outlined
            >
              <div class="mb-3">
                <v-card width="70" height="70" color="rgba(0,0,0,.05)" elevation="0" rounded="circle" class="pa-2">
                  <v-img
                  contain
                  @click="started()"
                  src="../assets/mic.png"
                  style="cursor: pointer;"
                  ></v-img>
                </v-card>
              </div>
              <v-card width="400" height="35" color="white" class="d-flex justify-center align-center my-6" rounded="0" elevation="0">
                <av-media :media="media" :canv-height="80" :canv-width="340" line-color="black"/>
              </v-card>
                <v-input
                hide-details=""
                height="40"
                >
                  {{final_transcript}}
                </v-input>
              <!-- 버튼 -->
              <v-card class="d-flex mt-5" elevation="0">
                <v-card
                  rounded="xl"
                  class="d-flex align-center mr-2"
                  color="rgb(210, 210, 210)"
                  elevation="0"
                  v-if="!micOn"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="rgb(130, 130, 130)"
                    elevation="0"
                  >
                    <v-icon dark>mdi-thumb-up</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    좋아요!
                  </p>
                </v-card>

                <v-card
                  rounded="xl"
                  class="d-flex align-center mr-2"
                  color="rgba(98, 182, 171)"
                  elevation="0"
                  v-if="micOn"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="#166d5c"
                    elevation="0"
                  >
                    <v-icon dark>mdi-thumb-up</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    좋아요!
                  </p>
                </v-card>

                <v-card
                  rounded="xl"
                  class="d-flex align-center ml-2"
                  color="grey"
                  elevation="0"
                >
                  <v-card
                    rounded="xl"
                    class="pa-2 d-flex align-center justify-center"
                    color="rgb(41, 41, 41)"
                    elevation="0"
                  >
                    <v-icon dark>mdi-wrench</v-icon>
                  </v-card>
                  <p
                    style="width: 100px; text-align: center; color: white; "
                  >
                    환경설정
                  </p>
                </v-card>
              </v-card>
            </v-card>

            <v-card width="100%" class="d-flex justify-center">
              <v-card
                width="120"
                height="40"
                class="d-flex justify-center align-center mt-5 mb-7"
                elevation="0"
                rounded="0"
                @click="micDialog = !micDialog"
                color="rgba(98, 182, 171)"
              >
                <p style="; color: white">확인</p>
              </v-card>
            </v-card>
          </v-card>
        </v-dialog>
      </v-card>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" class="text-center">
        <div class="d-flex justify-center align-center">
          <v-icon class="mr-1">mdi-alert-circle-outline</v-icon>
          <p class="helpText" style="z-index: 99;">하이플 AI 성향분석은 Chrome 브라우저에 최적화 되어 있습니다. 다른 브라우저에서는 정상적으로 작동이 되지 않을 수 있으므로, Chrome 브라우저 사용을 권합니다.</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Timer from './Timer.vue'
import FaceDetection from './FaceDetection.vue'
import Mbti from './Mbti.vue'

export default {
  components: {
    Timer,
    FaceDetection,
    Mbti,
  },

  data() {
    return {
      mouseDialog: false,
      webcamDialog: false,
      micDialog: false,

      mouseOn: false,
      webcamOn: false,
      micOn: false,

      shouldStop: false,
      media: null,
      captures: [],

      audioStream: {},

      recognition: {},
      recognizing: false,
      interim_transcript: "",
      final_transcript: "",
      display: "block",

      micVisualBoolean: false,
      tipDialog: false,
      tipDialog2: false,
      interviewStart: false,
    };
  },
  methods: {
    nextPage(num) {
      switch(num){
        case 1: {
          if(this.mouseOn === true && this.webcamOn === true && this.micOn === true) {
            this.stop();
            this.$store.commit('increment');
            this.tipDialog = true
          }
          else if(this.mouseOn === false) {
            alert("마우스 장치를 점검을 해주세요.");
          }
          else if(this.webcamOn === false) {
            alert("카메라 장치를 점검을 해주세요.");
          }
          else if(this.micOn === false) {
            alert("마이크 장치를 점검을 해주세요.");
          }
          break;
        }
        case 2: {
          this.$store.commit('increment'); this.tipDialog = true; break;
        }

      }
    },
    tipPopup(num) {
      switch(num){
        case 1: {
          this.tipDialog = false;
          this.tipDialog2 = true;
          break;
        }
        case 2: {
          this.tipDialog2 = false;
          this.interviewStart = true;
          break;
        }
      }
    },
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

    async fstart() {
      //console.log(this.$refs.player)
      this.webcamDialog = !this.webcamDialog
      await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.audioStream = stream;
          this.$refs.player.srcObject = stream;
          this.$refs.player.style.display = "block";
          this.$refs.player.muted = true;
          this.$refs.player.setAttribute("autoplay", "");
          this.$refs.player.setAttribute("muted", "");
          this.$refs.player.setAttribute("playsinline", "");
          this.webcamOn = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    started() {
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

  },
  mounted() {

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 37) {
        this.keyLeft = true;
      } else if (e.keyCode == 39) {
        this.keyRight = true;
      }
    });

    if ("webkitSpeechRecognition" in window) {
      this.display = "inline-block";
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "ko-KR";

      this.recognition.onstart = () => {
        this.recognizing = true;
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

        console.log(this.final_transcript);
        if (this.final_transcript !== "") {
          this.micOn = true;
        }
      };

      this.recognition.onend = () => {
        console.log("this is end");
      };
    }
  },

};
</script>

<style scoped>
@import url("../assets/css/unify.css");
</style>

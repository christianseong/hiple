<template>
  <div style="position: relative;">
      <v-img
        width="100%"
        height="calc(100vh)"
        src="../assets/background.png"
        style="position: absolute;"
      ></v-img>
    <v-row justify="center" align="center" style="height: 100vh; width: 100%;" no-gutters>
      <v-card elevation="10" height="750" width="1200px" class="d-flex align-center">
        <v-col cols="6" style="color: #15253D;" class="d-flex flex-column align-end pr-10">
          <div>
            <div class="d-flex">
              <p class="articleTextM mr-4" style="color: #62B6AB; line-height: 0px">try now</p>
              <div style="width: 200px; height: 5px; border-bottom: 2px solid #62B6AB"></div>
            </div>
            <p class="logoTextL">Hiple</p>
            <p class="logoTextL" style="word-spacing: -4px; line-height: 35px">
              <span style="color: #62B6AB">AI</span>
              <span style="position: relative; z-index: 2">interview
                <v-card rounded="circle" width="20" height="20" color="#F1C042" style="position: absolute; top: 17%; right: -8%; transform: translate(-50%, 0%);" elevation="0"></v-card>
              </span>
            </p>
            <p class="articleTextS mt-6" style="color: black">
              하이플 AI 성향분석은 선수의 성향과 성격을 파악하고<br>
              분석하여 구단에게 제공중 입니다.<br>
              하이플 서비스를 통해 성향을 분석해보세요.</p>
          </div>
        </v-col>
        <v-col cols="6">
          <div style="width: 305px;">
            <h5 class="mb-2">아이디</h5>
            <v-text-field
              v-model="name"
              hide-details=""
              label="ID"
              solo
              outlined
              color="#62B6AB"
              class="mb-3"
            ></v-text-field>
            <h5 class="mb-2">비밀번호</h5>
            <v-text-field
              v-model="email"
              hide-details=""
              label="Password"
              solo
              outlined
              :type="show ? 'text' : 'password'"
              clearable
              color="#62B6AB"
              class="mb-5"
            ></v-text-field>

            <v-btn
              color="#15253D"
              width="100%"
              height="50px"
              @click="validate"
            >
              <p class="articleTextS" style="color: white;">시작하기</p>
            </v-btn>
          </div>
        </v-col>
        
      </v-card>
    </v-row>

  
    <v-dialog
      v-model="dialog"
      persistent
      max-width="690"
    >
      <v-card color="rgba(255,255,255)" height="420">
          <v-row>
            <v-col cols="12">
              <div class="d-flex justify-center align-center" style="background-color: rgb(98, 182, 171); color: white;">
                <p class="py-2 mainTextM">정보 활용 동의</p>
              </div>
            </v-col>
          </v-row>
          <v-row class="px-8">
            <v-card color="rgba(230,230,230)" elevation="0" class="py-3 mt-2">
              <v-col cols="12">
                <div class="d-flex align-start mb-4">
                  <v-icon>mdi-circle-small</v-icon>
                  <p>온라인 AI 검사에서는 응시자의 평가를 위해 뷰응시 데이터를 저장하며, 응시자는 이에 동의하지 않을 권리가 있습니다.</p>
                </div>
                <div class="d-flex align-start mb-4">
                  <v-icon>mdi-circle-small</v-icon>
                  <p>응시 데이터는 온라인 AI 검사에 필수적인 수집 항목으로 해당 정보를 응시자로부터 제공받지 못하면 온라인 AI 검사를 진행할 수 없습니다.</p>
                </div>
                <div class="d-flex align-start mb-4">
                  <v-icon>mdi-circle-small</v-icon>
                  <p>온라인 AI 검사 과정에서 수집된 개인 정보는 결과 분석을 위한 목적 이외 에는 사용되지 않습니다.</p>
                </div>
                <div class="d-flex align-start">
                  <v-icon>mdi-circle-small</v-icon>
                  <p>온라인 AI 검사 과정에서 수집된 응시 데이터는 기업과 서비스 제공 업체간계약된 보관 기관이 지나면 자동으로 삭제됩니다.</p>
                </div>
              </v-col>
            </v-card>
            <v-col cols="12" class="d-flex justify-center mb-3 mt-1">
              <v-btn
                @click="agree()"
                outlined
                elevation="2"
                width="50"
                min-width="90"
                color="rgb(200,200,200)"
              >
                <p style="color: black">동의하기</p>
              </v-btn>
            </v-col>
          </v-row>

      </v-card>
    </v-dialog>
    <!-- <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      
      <v-card
      elevation="10" 
      width="600">
        <v-card-title class="headline card-title justify-center">
          정보 활용 동의
        </v-card-title>
 
        <v-card-title class="headline">
          영상녹화 및 음성녹음에 관한 동의  
        </v-card-title>
        <div class="div-text">
          <v-card-text class="card-text">
            1.온라인 AI 검사에서는 응시자의 평가를 위해 뷰응시 데이터를 저장하며, 
            응시자는 이에 동의하지 않을 권리가 있습니다.
          </v-card-text>
          <v-card-text class="card-text">
            2.응시 데이터는 온라인 AI 검사에 필수적인 수집 항목으로 해당 정보를 
            응시자로부터 제공받지 못하면 온라인 AI 검사를 진행할 수 없습니다.
          </v-card-text>
          <v-card-text class="card-text">
            3.온라인 AI 검사 과정에서 수집된 개인 정보는 결과 분석을 위한 목적 이외
            에는 사용되지 않습니다.
          </v-card-text>
          <v-card-text class="card-text">
              4.온라인 AI 검사 과정에서 수집된 응시 데이터는 기업과 서비스 제공 업체
            간 계약된 보관 기관이 지나면 자동으로 삭제됩니다.
          </v-card-text>
        </div>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            text
            @click="agree"
          >
            동의
          </v-btn>
          <v-btn
            color="green"
            text
            @click="disagree"
          >
            비동의
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

  </div>
</template>


<script>
  export default {
    data(){
      return{
        valid: true,
        name: '',
        email: '',
        dialog : false,
        show : false,
       
      }
    },
    methods: {
      validate () {
        this.dialog =true

       
        //this.$router.push('/about')
      },

      agree(){
        this.dialog = true
        this.$router.push('/stepper')
      },
      disagree(){
        this.dialog= false
        alert('동의 해주세요!')
      }

  
    },
  }
</script>

<style>
.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 45px !important;
}
</style>

<style scoped>
@import url("../assets/css/unify.css");
</style>

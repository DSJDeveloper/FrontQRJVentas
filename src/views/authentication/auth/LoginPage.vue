<script setup lang="ts">
// import Logo from '@/layouts/full/logo/LogoDark.vue';
import AuthLogin from '../authForms/AuthLogin.vue';
import { ref } from "vue"
let classform = ref('475px')
const updateclass = (val: string) => {
  
   classform.value = val 
}
</script>

<template>
  <v-row class="h-screen" no-gutters>
    <!---Left Part-->
    <v-col cols="12" class="d-flex align-center bg-lightprimary">
      <v-container>
        <div class="pa-8 pa-sm-12">
          <v-row justify="center">
            <v-col cols="12" lg="10" xl="6" md="7">
              <v-card elevation="9" class="loginBox">
                <v-card variant="outlined">
                  <v-card-text class="pa-6">
                    <!---Left Part Logo -->
                    <!-- <v-row>
                      <v-col cols="12" class="text-center">
                        <Logo />
                        <h2 class="text-secondary text-h2 mt-8">Hi, Welcome Back</h2>
                        <h4 class="text-disabled text-h4 mt-3">Enter your credentials to continue</h4>
                      </v-col>
                    </v-row> -->
                    <!---Left Part Logo -->
                    <!---Left Part Form-->
                    <AuthLogin v-on:update:classlayout="updateclass" />
                    <!---Left Part Form-->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Left Part-->
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: v-bind(classform);
  margin: 0 auto;
}

.selectCompanyBox {
  max-width: 100%;
  margin: 0 auto;
}
</style>

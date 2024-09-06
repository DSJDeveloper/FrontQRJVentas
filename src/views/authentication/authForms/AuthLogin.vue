<script setup lang="ts">
//import { ref } from 'vue';
// import Google from '@/assets/images/auth/social-google.svg';
// import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import { onMounted, ref, type Ref } from 'vue';
import AuthService from '@/services/AuthServices';
import type { ICompanys } from '@/interfaces/ICompanys';
// import type { IResultAuth } from '@/interfaces/IResultAuth';
import { MailIcon,LockIcon } from 'vue-tabler-icons';
// import router from "@/router/index";
// import type { ICompanys } from '@/interfaces/ICompanys.ts';
// import type { IResultLogin } from '@/interfaces/IResultLogin';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
//const logform = ref();
const password = ref('');
const username = ref('');
const passwordRules = ref([
  (v: string) => !!v || 'La Contraseña es requerida',
  (v: string) => (v && v.length <= 10) || 'La Contraseña mas de 5 caracteres'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail es requerido', (v: string) => /.+@.+\..+/.test(v) || 'E-mail no valido']);

/* eslint-disable @typescript-eslint/no-explicit-any */
// function validate(values: any, { setErrors }: any) {
//   const authStore = useAuthStore();
//   return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
// }

const auth = new AuthService();
//let email = ref("");
let step: Ref<number> = ref(1);
let title = ref('');
let loading = ref(false);
let listcompanys: Ref<Array<ICompanys>> = ref([]);
/* eslint-disable @typescript-eslint/no-explicit-any */
const login = async (values: any, { setErrors }: any) => {
  //loading.value = true;
  try {
    step.value = 1;
    getTitle();
    auth.logout();
    listcompanys.value = [];
    const response = await auth.login(username.value, password.value);
    const responseStatus = auth.getError().value ?? '';
    if (responseStatus.length <= 0) {
      listcompanys.value = auth.getCompanys();
      step.value = 2;
      getTitle();
    } else {
      setErrors({ apiError: responseStatus });
    }
  } catch (_er) {
    setErrors({ apiError: _er });
  } finally {
    loading.value = false;
  }
};
const getTitle = () => {
  switch (step.value) {
    case 1:
      title.value = 'Acceso al Sistema';
      break;
    case 2:
      title.value = 'Seleccione un Espacio de Trabajo';
      break;
    case 3:
      title.value = 'Cargando Espacio de trabajo...';
      break;
  }
};
const setcompany = async (el: ICompanys) => {
  step.value = 3;
  getTitle ();
  loading.value = true;
    try {
    await auth.selectcompany(el._idcompany);
    const responseStatus = auth.getError().value ?? '';
    if (responseStatus.length>0) {
      throw  new Error(responseStatus)
      // store user details and jwt in local storage to keep user logged in between page refreshes

      // redirect to previous url or default to home page

      //router.push({ name: 'home' });
    }
  } catch (_er) {
    step.value = 2;
    loading.value = false;
    getTitle();
    alert(_er);
  } finally {
  }
};
onMounted(() => {
  getTitle();
  auth.logout();
});
</script>

<template>
  <!-- <v-btn block color="primary" variant="outlined" class="text-lightText googleBtn">
    <img :src="Google" alt="google" />
    <span class="ml-2">Sign in with Google</span></v-btn
  > -->
  <!-- <v-row>
    <v-col class="d-flex align-center">
      <v-divider class="custom-devider" />
      <v-btn variant="outlined" class="orbtn" rounded="md" size="small">OR</v-btn>
      <v-divider class="custom-devider" />
    </v-col>
  </v-row> -->
  <div>
    <h2 class="text-h2 text-center my-4 mb-8">{{ title }}</h2>
    <v-progress-linear color="dark-blue" v-if="loading" indeterminate :height="6"></v-progress-linear>
    <v-window v-model="step">
      <v-window-item :value="1">
        <Form @submit="login" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
          <v-text-field
            v-model="username"
            :rules="emailRules"
            :prepend-inner-icon="MailIcon"
            label="Email  / Usuario"
            class="mt-4 mb-8"
            required
            density="comfortable"
            hide-details="auto"
            variant="outlined"
            color="primary"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Contraseña"
            required
            density="comfortable"
            variant="outlined"
            color="primary"
            hide-details="auto"
            :prepend-inner-icon="LockIcon"
            :append-icon="show1 ? '$eye' : '$eyeOff'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            class="pwdInput"
          ></v-text-field>

          <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
            <!-- <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        label="Recuerdame?"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <div class="ml-auto">
        <a href="javascript:void(0)" class="text-primary text-decoration-none">Recuperar Contraseña?</a>
      </div> -->
          </div>
          <v-btn color="secondary" :loading="isSubmitting" block class="mt-2" variant="flat" size="large" :disabled="valid" type="submit">
            Ingresar</v-btn
          >
          <div v-if="errors.apiError" class="mt-2">
            <v-alert color="error">{{ errors.apiError }}</v-alert>
          </div>
        </Form>
      </v-window-item>
      <v-window-item :value="2">
        <v-row dense v-if="!loading">
          <v-col class="" v-for="ele in listcompanys" :key="ele._idcompany">
            <v-card class="mx-auto" link :disabled="loading" @click="setcompany(ele)" variant="text">
              <v-card-title class="text-h5 font-weight-regular justify-space-between">
                <span>{{ ele.WorkSpace }}</span>
              </v-card-title>
              <v-card-text>{{ ele.NameCompany }}</v-card-text>
            </v-card>
          </v-col>
        </v-row></v-window-item
      >
    </v-window>

    <!-- <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/auth/register" class="mt-2 text-capitalize mr-n2">Don't Have an account?</v-btn>
  </div> -->
  </div>
</template>
<style lang="scss">
.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}
.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}
.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}
.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}
.pwdInput {
  position: relative;
  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>

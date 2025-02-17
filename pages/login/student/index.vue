<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from "~/stores/userStore";
import Cookies from 'js-cookie';

const email = ref('');
const firstName = ref('')
const lastName = ref('')
const password = ref('');
const loading = ref(false);
const statusMessage = ref('');
const router = useRouter();
const userStore = useUserStore()
const status = ref('')

useHead({
  title: 'УГНТУ | Вход в аккаунт'
});

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
  }
});

async function loginUser() {
  const userData = {
    email: email.value,
    password: password.value,
  };

  try {
    loading.value = true;
    statusMessage.value = 'Произвожу вход...';

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      const data = await response.json();
      statusMessage.value = `Успешный вход! ${data.message}`;

      userStore.setUser(data.user);

      // Сохраняем данные пользователя в store, включая _id
      if (data.user && data.user._id) {
        userStore.setUser(data.user);
      } else {
        console.error('Отсутствует ID пользователя в ответе:', data);
      }

      // Сохранение данных пользователя в Cookies, включая оценки
      Cookies.set('user', JSON.stringify({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        _id: data.user._id,
        status: data.user.status,
        specialty: data.user.specialty,
        group: data.user.group,
        code: data.user.code,
        direction: data.user.direction,
        learning: data.user.learning,
        form_of_learning: data.user.form_of_learning,
        faculty: data.user.faculty,
        course: data.user.course,
        score: data.user.score || {},
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,
      }), { expires: 7 });

      // Сохраняем данные в localStorage, включая оценки
      localStorage.setItem('user', JSON.stringify({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        _id: data.user._id,
        status: data.user.status,
        specialty: data.user.specialty,
        group: data.user.group,
        code: data.user.code,
        direction: data.user.direction,
        learning: data.user.learning,
        form_of_learning: data.user.form_of_learning,
        faculty: data.user.faculty,
        course: data.user.course,
        score: data.user.score || {},
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,
      }));

      // Обновляем store с полными данными пользователя
      userStore.setUser({
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        _id: data.user._id,
        status: data.user.status,
        specialty: data.user.specialty,
        group: data.user.group,
        code: data.user.code,
        direction: data.user.direction,
        learning: data.user.learning,
        form_of_learning: data.user.form_of_learning,
        faculty: data.user.faculty,
        course: data.user.course,
        score: data.user.score || {},
        ranking: data.user.ranking,
        averageScore: data.user.averageScore,
        generalScore: data.user.generalScore,
      });
      userStore.setUser(data.user);
      if (data.user.status === 'Администратор' && userStore.userStatus === 'Администратор') {
        statusMessage.value = `Добро пожаловать, Администратор ${userStore.userFirstName}`;
        setTimeout(() => router.push('/student/account'), 2000);
      } else if (data.user.status === 'Владелец' && userStore.userStatus === 'Владелец') {
        statusMessage.value = `Добро пожаловать, Владелец ${userStore.userFirstName}`;
        setTimeout(() => router.push('/student/account'), 2000);
      } else {
        setTimeout(() => router.push('/student/account'), 2500);
      }
    } else {
      const errorData = await response.json();
      statusMessage.value = errorData.message || 'Ошибка при входе';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при входе';
  } finally {
    loading.value = false;
  }
}

async function loginAsGuest() {
  const guestData = {
    email: 'guest@example.com',
    password: 'guest-password',
  };

  try {
    loading.value = true;
    statusMessage.value = 'Идёт вход как Гость...';

    // Симуляция успешного входа для гостя
    const response = { ok: true };

    if (response.ok) {
      // Примерные данные для гостя
      const guestUser: any = {
        firstName: 'Гость',
        lastName: 'Гость',
        status: 'Гость',
        email: 'guest@example.com',
        _id: 'guest-id',
        specialty: 'Гостевая специальность',
        group: 'Гостевая группа',
        code: '00.00.00',
        direction: 'Гостевое направление',
        course: 1,
        faculty: 'Гостевой факультет',
        form_of_learning: 'Гостевая форма',
        averageScore: 0,
        generalScore: 0,
        scores: {},
      };
      statusMessage.value = 'Добро пожаловать, Гость!';
      setTimeout(() => router.push('/account-student'), 1000);


      // Сохранение данных пользователя в Cookies
      Cookies.set('user', JSON.stringify({
        firstName: guestUser.firstName,
        lastName: guestUser.lastName,
        email: guestUser.email,
        _id: guestUser._id,
        status: guestUser.status,
        specialty: guestUser.specialty,
        direction: guestUser.direction,
        group: guestUser.group,
        course: guestUser.course,
        code: guestUser.code,
        faculty: guestUser.faculty,
        form_of_learning: guestUser.form_of_learning,
        averageScore: guestUser.averageScore,
        generalScore: guestUser.generalScore,
        scores: guestUser.scores,
      }), { expires: 7 });

      // Сохранение данных в localStorage
      localStorage.setItem('user', JSON.stringify({
        firstName: guestUser.firstName,
        lastName: guestUser.lastName,
        email: guestUser.email,
        _id: guestUser._id,
        status: guestUser.status,
        specialty: guestUser.specialty,
        direction: guestUser.direction,
        group: guestUser.group,
        course: guestUser.course,
        code: guestUser.code,
        form_of_learning: guestUser.form_of_learning,
        faculty: guestUser.faculty,
        averageScore: guestUser.averageScore,
        generalScore: guestUser.generalScore,
        scores: guestUser.scores,
      }));

      userStore.setUser(guestUser);

    } else {
      statusMessage.value = 'Ошибка при входе как Гость';
    }
  } catch (error) {
    console.error('Ошибка:', error);
    statusMessage.value = 'Произошла ошибка при входе как Гость';
  } finally {
    loading.value = false;
  }
}


</script>

<template>
  <section class="body">
    <section class="container">
      <section class="container-image">
        <img src="/auth/logo.png" alt="Логотип">
      </section>
      <section class="input-container">

        <section class="input-container_inside">
          <p class="header">Вход в систему студента</p>
          <p class="not_login">Ещё не зарегистрированы?
            <NuxtLink class="redirect" to="/register">Регистрация</NuxtLink>
            |
            <NuxtLink class="redirect" to="/">Вернуться на главную</NuxtLink>
          </p>
          <div class="inputs">
            <p class="input_helper">E-mail</p>
            <AccountMoloFormInput v-model="email"/>
            <p class="input_helper">Пароль</p>
            <AccountMoloFormInput v-model="password" type="password"/>
          </div>
          <div class="remember">
            <input type="checkbox" id="remember-me"/>
            <label for="remember-me">Запомнить меня</label>
          </div>
          <div class="log-forget">
            <section class="buttons">
              <AccountMoloFormSubmit
                  label="Войти"
                  :loading="loading"
                  :message="statusMessage"
                  class="button-user"
                  @click="loginUser"
              />
              <AccountMoloFormSubmit
                  label="Гость"
                  :loading="loading"
                  :message="statusMessage"
                  class="button-guest"
                  @click="loginAsGuest"
                  />
            </section>

            <NuxtLink class="forget" to="/in-progress">Восстановление пароля</NuxtLink>
            <ClickedCreating :message="statusMessage"/>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<style scoped>

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eef7fd;
}

.container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 50%;
  height: 50%;
  border-radius: 20px;
}

.container-image {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 30px 0 30px;
  width: 50%;
  border-right: 1px solid #e3e5e9;
}

.input-container {
  display: flex;
  justify-content: center;
  width: 45%;
  align-items: center;
  height: 100%;
}

.input-container_inside {
  width: 80%;
  height: 80%;

  & .header {
    color: #082459;
    font-size: 21px;
  }

  & .not_login {
    font-size: 11px;
  }

  & .redirect {
    text-decoration: none;
    transition: 0.2s all ease-in-out;
    color: #3c00ef;

    &:hover {
      text-decoration: underline 1px;
      text-underline-offset: 2px;
    }
    &:last-child {
      color: #ab0000;
    }
  }
}

.inputs {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & .input_helper {
    font-size: 12px;
  }
}

.remember {
  font-size: 14px; /* Уменьшите размер шрифта по вашему усмотрению */
  color: #333; /* Цвет текста (по желанию) */
  margin-top: 5px;
  display: flex;
}

.remember input {
  margin-right: 5px; /* Отступ между чекбоксом и текстом */
}

.log-forget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  gap: 6px;

  & .login {
    background-color: #4e45e3;
    border: none;
    height: 40px;
    color: #eee;
    border-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: 0.2s all ease-in-out;

    &:hover {
      background-color: #4038bb;
    }
  }

  & .forget {
    text-align: center;
    font-size: 10px;
    color: #4e45e3;
    text-decoration: none;

    &:hover {
      text-decoration: underline 1px;
      text-underline-offset: 2px;
    }
  }

}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  & .button-user {
    width: 70%;
  }
  & .button-guest {
    width: 30%;
  }
}

img {
  width: 100%;
}


@media (max-width: 560px) {
  .body {
    align-items: center;
  }
  .container {
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
  }
  .container-image {
    width: 90%;
    height: 40%;
    display: flex;
    justify-content: center;
  }

  .input-container {
    width: 100%;
  }

}

@media (min-width: 561px) and (max-width: 765px) {
  .body {
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
  }
  .container {
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
  }
  .container-image {
    width: 80%;
    height: 40%;
    display: flex;
    justify-content: center;
    border: none;
  }

  .input-container {
    width: 100%;
    height: 50%;
  }
}

@media (min-width: 766px) and (max-width: 1280px) {
  .container {
    display: flex;
    flex-direction: column;
    height: 60%;
    padding: 0;
  }
  .container-image {
    width: 70%;
    border: none;
  }
  .container {
    flex-direction: column;
    align-items: center;
  }
  .input-container {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0;
    height: 100%;
    justify-content: center;
    flex-direction: column;
  }
}

</style>
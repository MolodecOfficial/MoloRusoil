<script setup lang="ts">

import MoloNews from "~/layouts/news/UI/MoloNews.vue";

interface MoloNew {
  image: string,
  description: string,
  link: string
}

let MoloNewsArray: Array<MoloNew> = [
  {
    image: '/news/1.png',
    description: 'Заседание вузов-участников консорциума «Сетевой энергетический университет» состоялось в УГНТУ',
    link: '/in-progress'
  },
  {
    image: '/news/2.png',
    description: 'Итоги Ученого совета УГНТУ 26 сентября',
    link: '/in-progress'
  },
  {
    image: '/news/3.png',
    description: 'Вопросы промышленной робототехники обсудили в Минпромэнерго РБ',
    link: '/in-progress'
  },
  {
    image: '/news/4.png',
    description: 'Студенческий Театр «Ст. Арт» УГНТУ среди победителей!',
    link: '/in-progress'
  },
  {
    image: '/news/5.png',
    description: 'Форум «ИмпульсMedia» стартовал в Уфе',
    link: '/in-progress'
  },
  {
    image: '/news/6.png',
    description: 'Образование поколения Z обсудили в УГНТУ',
    link: '/in-progress'
  },
  {
    image: '/news/7.png',
    description: 'В слете «Наши ценности» участвовала студентка УГНТУ Ариана Акузина',
    link: '/in-progress'
  },
  {
    image: '/news/8.png',
    description: 'Победители международного экотона – команда УГНТУ «Эко будущее»!',
    link: '/in-progress'
  }
]

</script>

<template>
  <div>
    <header>
      <p>Новости Университета</p>
    </header>
    <section>
      <div v-for="(news, idx) in MoloNewsArray" :key="idx" class="news">
        <MoloNews
            :image="news.image"
            :description="news.description"
            :link="news.link"
        />
      </div>
    </section>
    <section class="showMore">
      <NuxtLink class="showMore_btn" to="/in-progress">Показать ещё</NuxtLink>
    </section>
  </div>
</template>

<style scoped>
div {
  background-color: #e5e5e5;
  margin: 0;
  padding: 0;
}
section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* Автоматическое заполнение */
  grid-template-rows: repeat(2, 1fr); /* Позволяет строкам адаптироваться */
  grid-row-gap: 14px;
  width: 100%;
  max-width: 100vw;
  justify-items: center;
  align-content: center;
  align-items: center;

}
header {
  display: flex;
  justify-content: center;
}
header p {
  font-size: 26px;
}
button {
  background-color: #5a87e7;
  color: #e3e3e3;
  border: none;
  height: 50px;
  width: 150px;
  border-radius: 50px;
  font-size: 17px;
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: #456ab7;
    cursor: pointer;
  }
}
.news {
  display: flex;
}
.showMore {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0 20px 0;
}

.showMore_btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.showMore_btn:hover {
  background-color: #0056b3;
}

@media (max-width: 560px) {
  section {
    display: flex;
    flex-direction: column;
  }
  .news {
    display: flex;
    justify-content: center;
    width: 90%;
  }
}
</style>
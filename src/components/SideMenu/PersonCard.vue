<template>
  <div class="person">
    <div class="person__main-info" v-if="!showDescription">
      <div class="person__photo">
        <img :src="person.picture" alt="photo" />
      </div>
      <div class="person__info">
        <div class="person__info-name">
          <b>{{ person.name }}</b>
          <div class="person__info-email">Возраст: {{ person.age }}</div>
          <div class="person__info-email">
            Дата регистрации: {{ new Date(formatedDate).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="person__info-about">О себе: {{ person.about }}</div>

    <div class="person__buttons">
      <div class="person__button person__info-email">
        <a :href="`mailto:${person.email}`">
          <img :src="require('@/assets/icons/email.png')" alt="email" />
        </a>
      </div>
      <button
        class="person__button person__button_description"
        @click="toggleDescriptionDisplay"
      >
        <img :src="require('@/assets/icons/description.png')" alt="email" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showDescription: false,
    };
  },
  computed: {
    formatedDate() {
      return this.person.registered;
    },
  },
  methods: {
    toggleDescriptionDisplay() {
      this.showDescription = !this.showDescription;
    },
  },
  watch: {
    person: function (cur, prev) {
      if (cur !== prev) this.showDescription = false;
    },
  },
};
</script>

<style scoped>
.person {
  position: relative;
  height: 100px;
}

.person__main-info {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 10px;
}

.person__buttons {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
}

.person__photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.person__info-about {
  max-height: 100%;
  padding-bottom: 30px;
  overflow: auto;
}

.person__info-name {
  margin-bottom: 10px;
}

.person__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 4px;
  background-color: #aaa;
  cursor: pointer;
}

.person__button a {
  height: 24px;
}
</style>

const app = Vue.createApp({
    created() {
        fetch('courses.json').then(response => response.json()).then(json => {
            this.courses = json
        })
    },
    data() {
      return {
        courses: [],
        message: 'Hello Vue!'
      }
    }
  });
  app.mount('#app')
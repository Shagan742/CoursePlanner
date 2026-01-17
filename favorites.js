const favoritesApp = Vue.createApp({
    created() {
        fetch('courses.json').then(response => response.json()).then(json => {
            this.courses = json
        })
    }, data() {
      return {
        message: 'Hello Vue!'
      }
    }
  });
  app.mount('#favoritesApp')
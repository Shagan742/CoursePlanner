const favoritesApp = Vue.createApp({
    created() {
        fetch('courses.json').then(response => response.json()).then(json => {
            this.courses = json
        })
    }, data() {
      return {
        favs: JSON.parse(localStorage.getItem('favoriteCourses')) || []
      }
    },
    methods: {
      clearFavs() {
        this.favs=[]
        localStorage.setItem('favoriteCourses', JSON.stringify(this.favs))
      }
    }
  });
  favoritesApp.mount('#app')
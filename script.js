const app = Vue.createApp({
    created() {
        fetch('courses.json').then(response => response.json()).then(json => {
            this.courses = json
        })
    },
    data() {
      return {
        courses: [],
        message: 'Hello Vue!',
        grade: 9,
        major: '',
        takenCourses: [],
        engCounter: 0,
        mathCounter: 0,
        sciCounter: 0,
        histCounter: 0,
        langCounter: 0,
        artCounter: 0,
        financialLitCounter: 0,
        centuryElectiveCounter: 0,
        mandatoryEngCourses: 4,
        mandatoryMathCourses: 3,
        mandatorySciCourses: 3,
        mandatoryHistCourses: 3,
        mandatoryLangCourses: 2,
        mandatoryArtCourses: 1,
        mandatoryFinancialLitCourses: 1,
        mandatoryCenturyElectiveCourses: 1
      }
  },
    methods: {
        selectGrade(event) {
            this.grade = event.target.value;
        },
        selectMajor(event) {
            this.major = event.target.value;
        },
        toggleCourseSelection(course) {
            const index = this.takenCourses.indexOf(course);
            if (index > -1) {
                this.takenCourses.splice(index, 1);
            } else {
                this.takenCourses.push(course);
            }
        },
        nextPage() {
          // Logic to navigate to the next section
          //this finds the current visible page thats not hidden
          const currentPage = document.querySelector('section:not([hidden])');
          //this find the next page after the current page
          let nextPage = currentPage.nextElementSibling;
          //this is a loop that goes through the next pages until there is no more pages
          while (nextPage && nextPage.tagName !== 'SECTION') {
            //this moves to the next sibling element (next page)
            nextPage = nextPage.nextElementSibling;
          }
          //if another page exists, hide the current page and show the next page
          if (nextPage) {
            currentPage.hidden = true;
            nextPage.hidden = false;
          }
        }
    }
  });
  app.mount('#app')
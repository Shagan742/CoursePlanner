const app = Vue.createApp({
  created() {
    fetch('courses.json').then(response => response.json()).then(json => {
      this.courses = json
      console.log(this.courses)
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
      mandatoryCenturyElectiveCourses: 1,
      sampleCourses: [],
      favoriteCourseNames: [],
      favoriteCourses:[]
    }
  },
  methods: {
    nextPage() {
      // Logic to navigate to the next major section
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
    },
    toTableSelection() {
      const gradeSelect = document.querySelector('.gradeSelect')
      const classes = document.querySelector('.classes')
      gradeSelect.hidden = true;
      classes.hidden = false;
    },
    nextTableSelection() {
      // Logic to navigate to the next table selection area
      //this finds the current visible page thats not hidden
      const tbody = document.querySelector('tbody')
      const currentTableSelection = tbody.querySelector('tr:not([hidden])')
      const tableSelectionBtn = document.querySelector('.toNextTable')
      const majorSelectionBtn = document.querySelector('.toMajors')

      if (!currentTableSelection) {
        tableSelectionBtn.hidden = true;
        majorSelectionBtn.hidden = false;
        return;
      }

      //this find the next page after the current page
      let nextTableSelection = currentTableSelection.nextElementSibling;
      //this is a loop that goes through the next pages until there is no more pages
      while (nextTableSelection && nextTableSelection.tagName !== 'TR') {
        //this moves to the next sibling element (next page)
        nextTableSelection = nextTableSelection.nextElementSibling;
      }
      //if another page exists, hide the current page and show the next page
      if (nextTableSelection) {
        currentTableSelection.hidden = true;
        nextTableSelection.hidden = false;

        tableSelectionBtn.hidden = false;
        majorSelectionBtn.hidden = true;
      } else {

        tableSelectionBtn.hidden = true;
        majorSelectionBtn.hidden = false;
      }
    },
    updateCounters() {
      // Reset all counters
      this.engCounter = 0;
      this.mathCounter = 0;
      this.sciCounter = 0;
      this.histCounter = 0;
      this.langCounter = 0;
      this.artCounter = 0;
      this.financialLitCounter = 0;
      this.centuryElectiveCounter = 0;


      // Loop through takenCourses and count per subject
      this.takenCourses.forEach(course => {
        // Check for 21st Century courses
        if (course.name.includes("Accounting") ||
          course.name.includes("Business") ||
          course.name.includes("Marketing") ||
          course.name.includes("Technology") ||
          course.name.includes("Architecture") ||
          course.name.includes("Graphic Design") ||
          course.name.includes("Photography") ||
          course.name.includes("Electronics") ||
          course.name.includes("Engineering") ||
          course.name.includes("Video Editing") ||
          course.name.includes("Media Production") ||
          course.name.includes("Innovation and Design") ||
          course.name.includes("Computer Science Principles") ||
          course.name.includes("Woodworking") ||
          course.name.includes("Cabinet Making") ||
          course.name.includes("Web Design")
        ) {
          this.centuryElectiveCounter++;
        }
        // English
        else if (course.name.includes("English")) {
          this.engCounter++;
        }
        // Mathematics
        else if (
          course.name.includes("Geometry") ||
          course.name.includes("Algebra") ||
          course.name.includes("Pre-Calculus") ||
          course.name.includes("Calculus") ||
          course.name.includes("Statistics")
        ) {
          this.mathCounter++;
        }
        // Science
        else if (
          course.name.includes("Biology") ||
          course.name.includes("Chemistry") ||
          course.name.includes("Physics") ||
          course.name.includes("Environmental Science") ||
          course.name.includes("Anatomy") ||
          course.name.includes("Forensic") ||
          course.name.includes("Marine Science")
        ) {
          this.sciCounter++;
        }
        // History / Social Studies
        else if (course.name.includes("History")) {
          this.histCounter++;
        }
        // Language
        else if (course.name.includes("Spanish") || course.name.includes("Italian")) {
          this.langCounter++;
        }
        // Art / Music / Drama / Public Speaking
        else if (
          course.name.includes("Art") ||
          course.name.includes("Band") ||
          course.name.includes("Chorus") ||
          course.name.includes("Drama") ||
          course.name.includes("Public Speaking") ||
          course.name.includes("Pop Music") ||
          course.name.includes("Applied Art") ||
          course.name.includes("Fine Art")
        ) {
          this.artCounter++;
        }
        // Financial Literacy
        else if (course.name.includes("Financial Literacy")) {
          this.financialLitCounter++;
        }

      });
    },
    filterBySubject(sub) {
      return this.recCourseForDropdowns.filter(course => course.subject.includes(sub))
    },
    addFavorite() {
      this.sampleCourses.forEach(course => {
        this.favoriteCourseNames.push(course)
      })
      // this.favoriteCourses.push(this.courses.filter(course => this.favoriteCourseNames.includes(course.name)))
      this.favoriteCourses.push(this.favoriteCourseNames)

      const stringifyFavCourses=JSON.stringify(this.favoriteCourses)
      localStorage.setItem('favoriteCourses', stringifyFavCourses);

      this.favoriteCourseNames=[];
      this.sampleCourses=[];
    }
  },
  computed: {
    englishCourses() {
      return this.courses.filter(course => course.subject === 'English');
    },
    mathCourses(){
      return this.courses.filter(course => course.subject === 'Mathematics');
    },
    scienceCourses(){
      return this.courses.filter(course => course.subject === 'Science');
    },
    socialStudiesCourses(){
      return this.courses.filter(course => course.subject === 'Social Studies');
    },
    languageCourses(){
      return this.courses.filter(course => course.subject === 'World Language');
    },
    artCourses(){
      return this.courses.filter(course => course.subject === 'Visual & Performing Arts');
    },
    century21ElectiveCourses(){
      return this.courses.filter(course => course.subject === '21st Century Life & Careers');
    },
    webDesignCourses(){
      return this.courses.filter(course => course.subject === 'Web Design');
    },
    finLitCourse() {
      return this.courses.filter(course => course.subject === 'Financial Literacy');
    },
    nextGrade() {
      return Number(this.grade) + 1;
    },

    recommendedCourses() {
      if (!this.major) return [];
      return this.courses
        .filter(course => course.majors.includes(this.major))       // Major match
        .filter(course => course.grades.includes(this.nextGrade)) // Next grade
        .filter(course => !this.takenCourses.some(taken => taken.id === course.id)) //see if taken course by user has same id as a course in json so that course wont be shown
        // .filter(course => course.prerequisites[0]==="NONE" || this.takenCourses.some(taken=> course.prerequisites.some(prereq => prereq.id==taken.id))) 
        .filter(course => course.prerequisites[0]==="NONE" || this.takenCourses.some(taken=> course.prerequisites.includes(taken.name)))//see if a course has no prereqs OR if what the user took is a prereq for another course, then display that course

        .map(course => course.name);

    },
    mustCompleteSubjects() {
      const subjectCounters = [
        {
          subjectName: 'English',
          count: this.engCounter,
          mandatory:this.mandatoryEngCourses
        },
        { 
          subjectName: 'Mathematics', 
          count: this.mathCounter,
          mandatory:this.mandatoryMathCourses
        },
        { 
          subjectName: 'Science', 
          count: this.sciCounter,
          mandatory:this.mandatorySciCourses
        },
        { 
          subjectName: 'Social Studies', 
          count: this.histCounter,
          mandatory:this.mandatoryHistCourses
        },
        { 
          subjectName: 'World Language', 
          count: this.langCounter,
          mandatory: this.mandatoryLangCourses
        },
        { 
          subjectName: 'Visual & Performing Arts', 
          count: this.artCounter,
          mandatory: this.mandatoryArtCourses
        },
        { 
          subjectName: 'Financial Literacy', 
          count: this.financialLitCounter,
          mandatory: this.mandatoryFinancialLitCourses
        },
        { 
          subjectName: '21st Century Life & Careers', 
          count: this.centuryElectiveCounter,
          mandatory:this.mandatoryCenturyElectiveCourses
        }
      ]
      let subjects=[]
      for(let i=0; i<subjectCounters.length; i++) {
        if(subjectCounters[i].count<subjectCounters[i].mandatory) {
          subjects.push(subjectCounters[i].subjectName)
        }
      }
      return subjects;
    },
    recCourseForDropdowns() {
      if(!this.takenCourses) {
        return this.courses //incase user forgot to select courses, just show all courses' subjects
        .filter(course => course.grades.includes(this.nextGrade)) // Next grade
      }
      return this.courses
        // .filter(course => course.majors.includes(this.major))       // Major match
        .filter(course => course.grades.includes(this.nextGrade)) // Next grade
        .filter(course => !this.takenCourses.some(taken => taken.id === course.id)) //see if taken course by user has same id as a course in json so that course wont be shown
        // .filter(course => course.prerequisites[0]==="NONE" || this.takenCourses.some(taken=> course.prerequisites.some(prereq => prereq===taken.name))) 
        .filter(course => course.prerequisites[0]==="NONE" || this.takenCourses.some(taken=> course.prerequisites.includes(taken.name)))//see if a course has no prereqs OR if what the user took is a prereq for another course, then display that course
      }
  },
  watch: {
    //this will watch for changes when user selects courses
    takenCourses() {
      this.updateCounters();
    }
  }
});
app.mount('#app')
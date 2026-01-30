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
            const gradeSelect=document.querySelector('.gradeSelect')
            const classes=document.querySelector('.classes')
            gradeSelect.hidden=true;
            classes.hidden=false;
        },
        nextTableSelection() {
            // Logic to navigate to the next table selection area
          //this finds the current visible page thats not hidden
          const tbody=document.querySelector('tbody')
          const currentTableSelection = tbody.querySelector('tr:not([hidden])')
          const tableSelectionBtn=document.querySelector('.toNextTable')
          const majorSelectionBtn=document.querySelector('.toMajors')

          if(!currentTableSelection) {
            tableSelectionBtn.hidden=true;
            majorSelectionBtn.hidden=false;
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

            tableSelectionBtn.hidden=false;
            majorSelectionBtn.hidden=true;
          } else {

            tableSelectionBtn.hidden=true;
            majorSelectionBtn.hidden=false;
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
      if (course.includes("Accounting") ||
          course.includes("Business") ||
          course.includes("Marketing") ||
          course.includes("Technology") ||
          course.includes("Architecture") ||
          course.includes("Graphic Design") ||
          course.includes("Photography") ||
          course.includes("Electronics") ||
          course.includes("Engineering") ||
          course.includes("Video Editing") ||
          course.includes("Media Production") ||
          course.includes("Innovation and Design") ||
          course.includes("Computer Science Principles") ||
          course.includes("Woodworking") ||
          course.includes("Cabinet Making")) {
          this.centuryElectiveCounter++;
        }
    // English
    else if (course.includes("English")) {
      this.engCounter++;
    }
    // Mathematics
    else if (
      course.includes("Geometry") || 
      course.includes("Algebra") || 
      course.includes("Pre-Calculus") || 
      course.includes("Calculus") || 
      course.includes("Statistics")
    ) {
      this.mathCounter++;
    }
    // Science
    else if (
      course.includes("Biology") || 
      course.includes("Chemistry") || 
      course.includes("Physics") || 
      course.includes("Environmental Science") || 
      course.includes("Anatomy") || 
      course.includes("Forensic") || 
      course.includes("Marine Science")
    ) {
      this.sciCounter++;
    }
    // History / Social Studies
    else if (course.includes("History")) {
      this.histCounter++;
    }
    // Language
    else if (course.includes("Spanish") || course.includes("Italian")) {
      this.langCounter++;
    }
    // Art / Music / Drama / Public Speaking
    else if (
      course.includes("Art") || 
      course.includes("Band") || 
      course.includes("Chorus") || 
      course.includes("Drama") || 
      course.includes("Public Speaking") || 
      course.includes("Pop Music") || 
      course.includes("Applied Art") || 
      course.includes("Fine Art")
    ) {
      this.artCounter++;
    }
    // Financial Literacy
    else if (course.includes("Financial Literacy")) {
      this.financialLitCounter++;
    }
    
  });
        },
    },
    computed: {
  nextGrade() {
    return this.grade + 1;
  },

  recommendedCourses() {
    if (!this.major) return [];

    return this.courses
      .filter(course => course.majors.includes(this.major))       // Major match
      .filter(course => course.grades.includes(this.nextGrade)) // Next grade
      .filter(course => !this.takenCourses.includes(course.name)) // Not taken, and this is the issue
      // .filter(course => )
      //i removed prereqs bc theres so many issues
      .map(course => course.name);

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
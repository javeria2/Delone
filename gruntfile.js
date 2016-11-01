module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');
  grunt.initConfig ({
    sass: {
      dist: {
        files: {
          'public/styles/styles.css' : 'sass/styles.scss'
        } //files
      }//dist
    }, //sass
    watch: {
      source: {
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true, // needed to run LiveReload
        } //options
      } //source
    } //watch
  }) //config
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass']);
};
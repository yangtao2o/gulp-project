module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: "src/<%= pkg.name %>.js",
        dest: "build/<%= pkg.name %>.min.js"
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ";"
      },
      dist: {
        // the files to concatenate
        src: ["src/**/*.js"],
        // the location of the resulting JS file
        dest: "dist/<%= pkg.name %>.js"
      }
    },
    jshint: {
      files: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint"]
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // A very basic default task.
  // grunt.registerTask('default', 'Log some stuff.', function() {
  //   grunt.log.write('Logging some stuff...').ok();
  // });

  // 默认被执行的任务列表。
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("dist", ["uglify"]);
};

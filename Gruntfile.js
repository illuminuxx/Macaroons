module.exports = function (grunt) {

    grunt.initConfig({

        less: {
            development: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    './dist/styles/style.css': './src/styles/*.less'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    './dist/styles/style.min.css': ['./dist/styles/style.css']
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['./src/styles/*.less'],
                tasks: ['default'],
            },
        },
        clean: {
            folder: ['dist/style/']
        },

        uncss: {
            dist: {
                files: {
                    'dist/style/style.min.css': ['./index.html']
                }
            }
        },


    });

    grunt.loadNpmTasks('grunt-contrib-less'); //подлкючение плагина sass

    grunt.loadNpmTasks('grunt-contrib-cssmin');//подключение плагина минификации

    grunt.loadNpmTasks('grunt-contrib-clean'); //плагин очистки

    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['clean', 'less', 'cssmin']); //регистрация в дефолт таск, чтобы юзать просто grunt

}

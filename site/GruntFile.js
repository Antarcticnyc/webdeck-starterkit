module.exports = function(grunt){

	//Project Configuration
	grunt.initConfig({
		//Package
		pkg: grunt.file.readJSON('package.json'),

		//Uglify
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: [
				'src/js/vendor/01.jquery.js',
				'src/js/vendor/02.foundation.js',
				'src/js/vendor/03.what-input.js',
				'src/js/vendor/04.html5ext.js',
				'src/js/vendor/05.jquery.waypoints.js',
				'src/js/vendor/06.waypoint.sticky.min.js',
				'src/js/vendor/07.TweenMax.min.js',
				'src/js/vendor/08.ScrollMagic.min.js',
				'src/js/vendor/09.debug.addIndicators.min.js',
				'src/js/vendor/10.animation.gsap.min.js',
				'src/js/*.js',
				],
				dest: 'src/<%= pkg.name %>.min.js'
			}
		},

		imagemin: {
				dynamic: {                         // Another target
			      files: [{
			        expand: true,                  // Enable dynamic expansion
			        cwd: 'src/',                   // Src matches are relative to this path
			        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
			        dest: 'build/'                  // Destination path prefix
			      }]
    			}
		},
		

		sass: {
			    dist: {
			    	options: {
        				loadPath: ['node_modules/foundation-sites/scss']
      				},
					files: [{
					    expand: true,
					    flatten: true,
					    cwd: 'src/',
					    src: ['**/*.scss'],
					    dest: 'build/css/',
					    ext: '.css'
					}]
			    }
			  },

		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['uglify','copy'],
				options: {
					spawn:false,
				},
			},
			css: {
			    files: ['src/**/*.scss'],
			    tasks: ['sass'],
			    options: {
			        spawn: false,
			    },
			},
			copyfiles: {
				files: ['src/**/*.html', 'src/**/*.css', 'src/**/*.svg'],
				tasks: ['copy'],
				options: {
					spawn: false,
				},
			},
		},

		copy: {
			main: {
				files: [
					{expand:true, cwd:'src/', src: ['**/*.html'], dest: 'build/'},
					{expand:true, cwd:'src/', src: ['**/*.css'], dest: 'build/'},
					{expand:true, cwd:'src/', src: ['<%= pkg.name %>.min.js'], dest: 'build/'},
					{expand:true, cwd:'src/', src: ['**/*.svg'], dest: 'build/'},
					{expand:true, cwd:'src/', src: ['fonts/*'], dest: 'build/'},
				]
			},
		},



	}) //end of grunt.initconfig

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify', 'imagemin', 'sass', 'copy']);

};
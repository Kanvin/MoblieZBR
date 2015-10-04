module.exports = function(grunt) {
	// '**' 表示包含所有的子目录
	// '*' 表示包含所有的文件

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


	var project_version = (function() {
		return '?v=' + grunt.template.today('yyyymmddHHMM') //  v.join('') //'0.1.0';
	})();

	//基本配置
	var config = {
		pkg: grunt.file.readJSON('package.json'),
		business: '/*\n' +
			'*  Copyright <%= grunt.template.today("yyyy-mm-dd")%>  wanyan.com \n' +
			'*  Author Kanvin.Chen \n Email:kanvin@icloud.com' +
			'*/\n',
		appNmae: 'MoblieZBR', //项目名称
		serverHost: 'localhost', //项目的服务器地址
		serverPort: 8080, //项目需要的端口
		livereload: 35729, //LiveReload的默认端口号，你也可以改成你想要的端口号
		initialize: function() {
			this.basePath = 'src/'
			this.destPath = 'build/' 
			this.smartPath = 'src/'
			this.serverUrl = 'http://' + this.serverHost + ':' + this.serverPort + '/Users/kanvin/Documents/github/MoblieZBR';
		}
	}

	config.initialize();

	var watch = {
		compass: {
			files: ['<%= config.basePath %>compass/**/*.scss','<%= config.basePath %>compass/**/*.sass'],
			tasks: ['compass'],
			options: {
				livereload: true
			}
		},
		html: {
			files: ['<%= config.basePath %>html/**/*.html'],
			options: {
				livereload: true
			}
		},
		css: {
			files: '<%= config.basePath %>css/**/*.css',
			options: {
				livereload: true
			}
		},js: {
			files: '<%= config.basePath %>js/**/*.js',
			options: {
				livereload: true
			}
		}
	}


	// 通过connect任务，创建一个静态服务器
	var connect = { // 开启服务
		options: {
			port: config.serverPort,
			hostname: config.serverHost, // 服务器地址(可以使用主机名localhost，也能使用IP)
			base: '.', // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
			// 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
			middleware: function(connect, options) {
				return [
					// 把脚本，注入到静态文件中
					require('connect-livereload')({
						port: config.livereload
					}),
					// 静态文件服务器的路径
					connect.static(options.base[0]),
					// 启用目录浏览(相当于IIS中的目录浏览)
					connect.directory(options.base[0])
				];
			}
		},
		server: {
			options: {
				base: config.basePath
			}
		}
	}

	// 打开浏览器
	var open = {
		server: {
			url: config.serverUrl
		}
	}

    compass = {
            dist: {
                options: {
                    sassDir: ['<%= config.basePath%>compass'],
                    cssDir:  ['<%= config.basePath%>css'],
                    assetCacheBuster: false
                }
            }
    }

	//清理线上的目录
	var clean = {
		options: {
			force: true
		},
		dest: {
			expand: true,
			cwd: '<%=config.destPath%>',
			src: [
				'css/**/*.css',
				'html/**/*.html',
				'css/**/*.png',
				'css/**/*.jpg',
				'**/*.gif',
				'js/*.js'
			]
		}
	}

	var uglify = { //js压缩
		main: {
			options: {
				banner: '<%=config.business%>'
			},
			files: [{
				expand: true,
				cwd: '<%=config.basePath%>js/',
				src: ['**/*.js'],
				dest: '<%=config.destPath%>js/',
				ext: '.js'
			}]
		},
	}
	var cssmin = { //压缩样式
		options: {
			keepSpecialComments: 0
		},
		compress: {
			options: {
				banner: '<%=config.business%>'
			},
			files: [{
				expand: true,
				cwd: '<%=config.basePath%>css/',
				src: ['**/*.css'],
				dest: '<%=config.destPath%>css/',
				ext: '.css'
			}]
		}
	}
	var htmlmin = { //开始压缩html文件
		dist: {
			options: {
				removeComments: true, // 去注析
				collapseWhitespace: true // 去换行
			},
			files: [{
				expand: true,
				cwd: '<%=config.basePath%>html/',
				src: ['**/*.html', '../*.html'],
				dest: '<%=config.destPath%>html/',
				ext: '.html'
			}]
		}
	}

	var copy = { // 将压缩好的文件进行copy
		css: {
			files: [{
				expand: true,
				cwd: '<%=config.smartPath%>',
				src: ['**/*.css'],
				dest: '<%=config.basePath%>'
			}]
		},
		all: {
			files: [{
					expand: true,
					cwd: '<%=config.basePath%>html/',
					src: ['**/*.html'],
					dest: '<%=config.destPath%>html/'
				}, {
					expand: true,
					cwd: '<%=config.basePath%>css/images/',
					src: ['**/*.png', '**/*.jpg', '**/*.gif'],
					dest: '<%=config.destPath%>css/images/'
				}, {
					expand: true,
					cwd: '<%=config.basePath%>css/img/',
					src: ['**/*.png', '**/*.jpg', '**/*.gif'],
					dest: '<%=config.destPath%>css/img/'
				}, {
					expand: true,
					cwd: '<%=config.basePath%>css/voteImgs/',
					src: ['**/*.png', '**/*.jpg', '**/*.gif'],
					dest: '<%=config.destPath%>css/voteImgs/'
				}, {
					expand: true,
					cwd: '<%=config.basePath%>css/scene/',
					src: ['**/*.png', '**/*.jpg', '**/*.gif'],
					dest: '<%=config.destPath%>css/scene/'
				}

			]
		}
	}

	var stringReplace = {
		dist: {
			files: [{
				expand: true,
				cwd: '<%=config.destPath%>html/',
				src: ['**/*.html'],
				dest: '<%=config.destPath%>html/',
			}],
			options: {
				replacements: [{
					pattern: /[\s\S]*/ig, //  /(<link[^>]*rel="stylesheet"[^>]*)(\.css)([^>]*>)/mgi, // /\.css/ig,
					replacement: function(match, p1, offset, string) {
						var content = match || '',
							cssRegex = /<link[^>]*rel="stylesheet"[^>]*\.css[^>]*>/mgi,
							jsRegex = /<script[^>]*src="[^>]*\.js[^>]*><\/script>/mgi,
							temp = '',
							matches = content.match(cssRegex),
							jsMatches = content.match(jsRegex);

						if (matches && matches.length) {
							Array.prototype.forEach.call(matches, function(v, i) {
								temp = v.replace('.css', '.css' + project_version);
								content = content.replace(v, temp);
							});
						}
						if (jsMatches && jsMatches.length) {
							Array.prototype.forEach.call(jsMatches, function(v, i) {
								temp = v.replace('.js', '.js' + project_version);
								content = content.replace(v, temp);
							});
						}
						return content;
					}
				}]
			}
		}
	}
	var rev = {
		options: {
			encoding: 'utf8',
			algorithm: 'md5', //'sha1', 'md5', 'sha256', 'sha512'
			length: 8
		},
		files: {
			src: ['<%=config.destPath%>js/**/*.js', '<%=config.destPath%>css/**/*.css']
		}
	}

	var usemin = {
		html: ['<%=config.destPath%>html/**/*.html'],
		css: ['<%=config.destPath%>css/**/*.css']
	}

	// js语法规范检查
	var jshint = {
		files: ['<%=config.basePath%>**/*.js'],
		options: {
			options: {
				curly: true, //循环或者条件语句必须使用花括号包围
				eqeqeq: true, //使用===和!==替代==和!=
				immed: true, //要求匿名函数的这样调用(function(){}()),而不是(function(){})();为了表明，表达式的值是函数的结果，而不是函数本身
				latedef: true, //变量定义前禁止使用
				newcap: true, //构造器函数首字母大写
				noarg: true, //禁止使用 arguments.caller 和 arguments.calle (因为未来会被弃用)
				sub: true, //允许各种形式的下标来访问对象,eg:person['name'],person.name
				undef: true, //要求所有的非全局变量，在使用前都被声明
				boss: true, //JSHint会允许在if，for，while里面编写赋值语句
				eqnull: true, //允许使用"== null"作比较
				browser: true //预定义全局变量 document, navigator, FileReader等
			}
		}
	}
	grunt.initConfig({
		config: config,
		watch: watch,
		connect: connect,
		open: open,
		compass: compass,
		clean: clean,
		uglify: uglify,
		cssmin: cssmin,
		htmlmin: htmlmin,
		copy: copy,
		'string-replace': stringReplace,
		rev: rev,
		usemin: usemin,
		jshint: jshint

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-rev');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-string-replace');



	grunt.registerTask('default', ['connect:server', 'compass','open:server', 'watch']);

	grunt.registerTask('min', ['clean', 'uglify', 'cssmin', 'copy', 'string-replace', 'htmlmin'])

	// 动态改变include的参数从而加快效率,提升体验！！
	var changedFiles = [];
	var onChange = grunt.util._.debounce(function() {
		grunt.config('include.dev.files', changedFiles);
		changedFiles = [];
	}, 100);
	grunt.event.on('watch', function(action, filepath) {
		var filesObj = Object.create(null);
		var srcArr = [];

		if (filepath.split('includes').length == 2) {
			srcArr.push('html/**/*.html');
			srcArr.push('*.html');
		} else {
			srcArr.push(filepath);
		}
		filesObj.src = srcArr;
		filesObj.dest = config.basePath;
		changedFiles.push(filesObj);
		onChange();
	});
}
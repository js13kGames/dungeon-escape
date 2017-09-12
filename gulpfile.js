'use strict';

const gulp        = require('gulp');

// Bootstrap individual task files
[ 'build', 'css', 'img', 'template', 'watch', 'zip' ]
  .forEach( task => require(`./tasks/${ task }`)() );

gulp.task( 'default', [ 'build', 'css','img', 'template', 'zip', 'report' ] );

require('shelljs/global');

if (!which('bower')) {
  echo('Sorry, you need to install bower first');
  exit(1);
}

echo('Okay, bower is installed!');
require('shelljs/global');

if (!which('bower')) {
    console.log('you need to install bower first');
    exit(1);
}

console.log('Okay, bower is installed!');

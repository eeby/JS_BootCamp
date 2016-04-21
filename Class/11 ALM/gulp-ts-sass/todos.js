require('shelljs/global');

echo('My TODOs:')
echo(grep("TODO", ['./src/*.ts']));
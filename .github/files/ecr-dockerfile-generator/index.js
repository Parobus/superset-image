import Handlebars from 'handlebars';
import fs from 'fs';

const source = fs.readFileSync('./res/ECR.Dockerfile.hbs', 'utf-8');
const template = Handlebars.compile(source);
const params = JSON.parse(fs.readFileSync('params.json'));

params.generator = 'ecr-dockerfile-generator';
params.timestamp = (new Date()).toISOString();

const render = template(params);

fs.writeFileSync('./Dockerfile', render);
const core = require('@actions/core');
const shell = require('shelljs');

function setDeploymentName() {
  const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD').stdout.trimEnd();

  core.notice(`Current branch is '${currentBranch}'`);

  const deploymentName = (() => {
    switch (currentBranch) {
      case 'main':
        return 'nightly';
      case 'staging':
        return 'staging';
      case 'release':
        return 'production';
      default:
        return null;
    }
  })();

  core.notice(`Deployment name is '${deploymentName}'`);

  return core.setOutput(
    'deployment-name',
    deploymentName
  );
}

function setKMSAlias() {
  const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD').stdout.trimEnd();

  const kmsAlias = (() => {
    switch (currentBranch) {
      case 'main':
        return 'api_integration';
      case 'staging':
        return 'api_stage';
      case 'release':
        return 'api_production';
      default:
        return null;
    }
  })();

  core.notice(`KMS alias is '${kmsAlias}'`);

  return core.setOutput(
    'kms-alias',
    kmsAlias
  );
}

function run() {
  try {
    setDeploymentName();
    setKMSAlias();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
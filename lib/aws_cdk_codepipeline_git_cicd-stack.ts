import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './aws_cdk_codepipeline_git_cicd-app-stack';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkCodepipelineGitCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // AWS CI-CD Pipeline
    const democicdpipeline = new CodePipeline(this,'demopipeline',
{
      synth: new ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: CodePipelineSource.gitHub('dinesh-boopalan/aws_cdk_codepipeline_git_cicd', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    const testingStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '951845455890', region: 'us-east-1' }
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '951845455890', region: 'us-east-1' }
    }));

  }
}

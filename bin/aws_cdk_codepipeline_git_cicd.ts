#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkCodepipelineGitCicdStack } from '../lib/aws_cdk_codepipeline_git_cicd-stack';

const app = new cdk.App();
new AwsCdkCodepipelineGitCicdStack(app, 'DemoawspipelineStack', {
  env: { account: '951845455890', region: 'us-east-1' },
});
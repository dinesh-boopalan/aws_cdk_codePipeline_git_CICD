import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { lambdaStack } from './lambda-stack';

export class PipelineAppStage extends cdk.Stage {

    constructor(scope: Construct, id:string,props?: cdk.StackProps){
        super(scope,id,props);

        const demolambdastack = new lambdaStack(this,'LambdaStack')
    }

}
/**
 * This file compiles a spring boot project, builds the docker image, publishes it and apply the kubernetes into Azure
 */
export class Publisher {
    public static dockerImageName = 'tezine/myimage:v1'
    public static dockerPath='C:\\Program Files\\Docker\\Docker\\Resources\\bin\\docker.exe';
    public static mvnPath="C:\\Program Files\\Mvn\\bin\\mvn.exe";

    public static async compileAndPackageProject() :Promise<boolean>{
        try{
            console.log('compiling and packaging project...')
            Deno.chdir("../");
            const p = Deno.run({
                cmd: [Publisher.mvnPath, 'package'],
            });
            const output = await p.status();
            if(output.success){
                console.log('OK');
                return true;
            }
        }catch (e) {
            console.error('Error:',e);
        }
        console.error('Unable to compile and package project');
        return false;
    }

    public static async buildDockerImage() :Promise<boolean>{
        try{
            console.log(`building docker image ${Publisher.dockerImageName}...`)
            await Deno.copyFile('Dockerfile','../target/Dockerfile');
            Deno.chdir("../target");
            const p = Deno.run({
                cmd: [Publisher.dockerPath, 'build', '-t',`${Publisher.dockerImageName}`,' .'],
            });
            const output = await p.status();
            if(output.success){
                console.log('OK');
                return true;
            }
        }catch (e) {
            console.error('Error:',e);
        }
        console.error('Unable to build docker image');
        return false;
    }

    public static async pushDockerImage() :Promise<boolean>{
        try{
            console.log(`pushing docker image ${Publisher.dockerImageName}...`)
            const p = Deno.run({
                cmd: [Publisher.dockerPath, 'push', `${Publisher.dockerImageName}`,' .'],
            });
            const output = await p.status();
            if(output.success){
                console.log('OK');
                return true;
            }
        }catch (e) {
            console.error('Error:',e);
        }
        console.error('Unable to push docker image');
        return false;
    }

    public static async applyKubernetes() :Promise<boolean>{
        try{
            console.log('applying kubernetes...');
            let fileContent=await Deno.readTextFile('Kubernetes.yaml');
            fileContent=fileContent.replace('$containerImage',Publisher.dockerImageName);
            await Deno.writeTextFile('Kubernetes.yaml', fileContent);
        }catch (e) {
            console.error('Error:',e);
        }
        console.error('Unable to apply kubernetes');
        return false;
    }
}

await main();

async function main() {
    if (!await Publisher.compileAndPackageProject()) Deno.exit(0);
    if (!await Publisher.buildDockerImage()) Deno.exit(0);
    if (!await Publisher.pushDockerImage()) Deno.exit(0);
    if (!await Publisher.applyKubernetes()) Deno.exit(0);
    console.log('SUCCESS');
}

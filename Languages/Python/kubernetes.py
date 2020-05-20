import shutil
import subprocess
import sys
from termcolor import colored

dockerImageName = 'tezine/myimage:v1'


class Logger:
    @staticmethod
    def logBlue(msg):
        print(colored(msg, 'blue'))

    @staticmethod
    def logError(msg):
        print(colored(msg, 'red'))

    @staticmethod
    def logSuccess(msg):
        print(colored(msg, 'green'))


class ClaimPublisher:

    @staticmethod
    def compileAndPackageProject() -> bool:
        Logger.logBlue('compiling and packaging project...')
        result = subprocess.call(['mvn', 'compile'], shell=True, cwd='../')
        if result != 0:
            Logger.logError('Unable to compile and package project')
            return False
        Logger.logSuccess("OK")
        return True

    @staticmethod
    def buildDockerImage() -> bool:
        try:
            Logger.logBlue(f'building docker image {dockerImageName}...')
            shutil.copy('Dockerfile', '../target/Dockerfile')
            result = subprocess.call(['docker', 'build', '-t', f'{dockerImageName}', ' .'], shell=True, cwd='../target')
            if result != 0:
                Logger.logError('Unable to build docker image')
                return False
            Logger.logSuccess("OK")
            return True
        except Exception as e:
            Logger.logError('Unable to build docker image')
            print('Error:'+ str(e))
            return False

    @staticmethod
    def pushDockerImage() -> bool:
        Logger.logBlue(f'pushing docker image {dockerImageName}...' )
        result = subprocess.call(['docker', 'push',  f'{dockerImageName}'], shell=True)
        if result != 0:
            Logger.logError('Unable to push docker image')
            return False
        Logger.logSuccess("OK")
        return True

    @staticmethod
    def applyKubernetes() -> bool:
        try:
            Logger.logBlue(f'applying kubernetes...')
            file = open("Kubernetes.yaml", "r+")
            data = file.read()
            data = data.replace('$containerImage', dockerImageName)
            file.seek(0)
            file.write(data)
            file.close()
            result = subprocess.call(['kubectl', 'apply', '-f', 'Kubernetes.yaml'], shell=True)
            Logger.logSuccess("OK")
            return True
        except Exception as e:
            Logger.logError('Unable to apply kubernetes. ')
            print('Error:'+ str(e))
            return False


if __name__ == '__main__':
    ok = ClaimPublisher.compileAndPackageProject()
    if not ok: exit(0)
    ok = ClaimPublisher.buildDockerImage()
    if not ok: exit(0)
    ok = ClaimPublisher.pushDockerImage()
    if not ok: exit(0)
    ok = ClaimPublisher.applyKubernetes()
    if not ok: exit(0)
    Logger.logSuccess("SUCCESS")


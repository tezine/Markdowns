# GIT FLOW
* Git-flow is a wrapper around Git.
* The git flow init command is an extension of the default git init command and doesn't change anything in your repository other than creating branches for you
* Há um tutorial [aqui](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
* Master é oq está em produção. 
* Sempre que um deve for trabalhar em uma modificação, ele cria um branch de feature. Ele trabalha nessa branch e depois faz um merge para develop. Neste caso, é feito um pull request para que o código seja analisado antes de ser feito o merge para o branch de develop. 
* No caso de encontrado um problema em produção e a próxima release será após alguns meses, podemos fazer um checkout da master para o branch de hotfix. Depois vai do hotfix diretamente para a master. Ao fazer o merge para master, é criado automaticamente um tag na master e também automaticamente é criado uma nova versao no develop.  
* Para criar um repositório com o git flow, basta digitar na linha de comando: `git flow init`. O git vai questionar os nomes do branches. Pode manter os nomes default. 


# RESUMO
1. O branch de produção é o branch master. Criamos o repositório através do comando  `git flow init`
1. Todo o desenvolvimento ocorre em branches de feature que depois são "mergeadas" no branch develop. Criamos um branch de feature digitando `git flow feature start feature_branch`.
1. Terminado o desenvolvimento no branch de feature, fazemos o merge com o branch de develop digitando `git flow feature finish feature_branch`
1. Isso remove o branch de feature da máquina local e faz o merge no branch de develop. 
1. Assim que o branch de develop contiver todas as features necessárias para o release, criamos um branch de release digitando `git flow release start 0.1.0`.
1. O branch de release deve ter apenas bug fixes, geração de documentação ou outras tarefas relacionadas. Após o término, executamos `git flow release finish '0.1.0`. Isso faz o seguinte: 
    - Faz o merge deste branch de release com o master.  O branch master recebe o tag 0.1.0. 
    - É realizado um back-merge do master para o develop (mas o develop não recebe o tag 0.1.0)
    - O branch de release temporário é removido da máquina local. 
    - É realizado um checkout do branch develop. 
1. Caso apareçam bugs que precisam ser corrigidos rapidamente, fazemos criamos um branch para hotfix a partir da master digitando `git flow hotfix start hotfix_branch`
1. Após os erros serem corrigidos, finalizamos o hotfix digitando `git flow hotfix finish hotfix_branch`. Isso faz o seguinte:
    - Faz o merge do branch de hotfix com o master. 
    - O master recebe um tag 'hotfix_branch'. 
    - É realizado um back-merge do master para o develop (mas o develop não recebe o tag)
    - O branch de hotfix é removido da máquina local.
    - É realizado um checkout do branch develop. 


# BRANCHES
* master: production releases
* develop: "next release"
* feature/... : para cada nova feature. 
* bugfix/...: branch para correções de bug. 
* release/...: 
* hotfix/...: 
* support/...: 

## MASTER BRANCH
* The master branch stores the official release history.
* It's convenient to tag all commits in the master branch with a version number.

## DEVELOP BRANCH
* develop branch serves as an integration branch for features.
* This branch will contain the complete history of the project. 

## FEATURE BRANCHES (TEMPORÁRIO - SÃO CRIADOS VÁRIOS)
* Each new feature should reside in its own branch.  
* Instead of branching off of master, feature branches use develop as their parent branch. When a feature is complete, it gets merged back into develop. Features should never interact directly with master.
* Feature branches are generally created off to the latest develop branch.
* Para criar um novo feature branch, basta digitar `git flow feature start feature_branch`, onde feature_branch deve ser substituido pelo nome da feature a ser desenvolvida. Esse comando cria o novo feature branch a partir da última versão do branch develop. 
* Assim que terminar o desenvolvimento no feature branch, basta digitar `git flow feature finish feature_branch`. Isso faz o merge do feature branch no branch develop e remove o feature branch da máquina local. 

## RELEASE BRANCH ( TEMPORÁRIO - SÃO CRIADOS VÁRIOS)
* Once develop has acquired enough features for a release (or a predetermined release date is approaching), you fork a release branch off of develop. Creating this branch starts the next release cycle, so no new features can be added after this point.
* **Only bug fixes, documentation generation, and other release-oriented tasks should go in this branch.**
* Like feature branches, release branches are based on the develop branch. 
* Using a dedicated branch to prepare releases makes it possible for one team to polish the current release while another team continues working on features for the next release
* Once it's ready to ship, the release branch gets merged into master and tagged with a version number. In addition, it should be merged back into develop, which may have progressed since the release was initiated. Fazemos isso através do comando `git flow release finish '0.1.0`

## HOTFIX BRANCH (TEMPORÁRIO - SÃO CRIADOS VÁRIOS)
* Maintenance or “hotfix” branches are used to quickly patch production releases. 
* Hotfix branches are a lot like release branches and feature branches except they're based on master instead of develop. 
* This is the only branch that should fork directly off of master. 
* As soon as the fix is complete, it should be merged into both master and develop (or the current release branch), and master should be tagged with an updated version number.
* Um branch de hotfix pode ser criado digitando `git flow hotfix start hotfix_branch`

<hr>

# FUNCIONAMENTO
 Developers should clone the central repository and create a tracking branch for develop.

 # PROCEDIMENTO PARA OS PROJETOS
 > Seguindo a orientação do Wesley
 1. Não utilizar o git flow init
 1. Criar um repositório seguindo a nomenclatura e requisitar ao pessoal da India, conforme descrito 
1. Requisitar acesso de admin apenas para mim. Devs recebem permissão de write no repositório.
1. Editar os branches master e develop. Especificar: 
    - Prevent deletions: vazio
    - Prevent changes without a pull request, except by: Git continuous integration 
 1. Assim, os devs não podem realizar push direto na develop e na master. 
 1. Efetuar o push do código inicial na develop, caso eu já tenha um. 
 1. Devs só podem trabalhar no branch de bugfix e nas branches de features. 
 1. Branch Release é pré-producão. É a fase de staging (UAT).
 1. Caso exista algum bug, o Dev corrige a partir da branch de Release, depois é realizado um merge da Release para master(producao). 
 1. Branches Feature fazem merge para a develop.
 1. Caso seja um projeto Angular, deve-se utilizar um pipeline do npm.
 1. Caso seja um projeto Spring boot, dev-se utilizar um pipeline maven. 
 1. Cuidado porque o Jenkins faz o tag do master e depois faz o pull da master para a develop automaticamente.  

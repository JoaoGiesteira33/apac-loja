# Projeto "Base de Dados de Acórdãos"

## Introdução

Este projeto foi desenvolvido por **Gonçalo Freitas (PG50398)** e **Henrique Alvelos (PG50414)** no âmbito da Unidade Curricular "Representação e Processamento de Conhecimento na Web" do Mestrado de Engenharia Informática da Universidade do Minho. O projeto tem como objetivo criar uma base de dados de acórdãos, abrangendo diversos tribunais portugueses, e desenvolver uma interface web para consulta e interação com esses dados.

O Ministério da Justiça português possui uma estrutura organizacional composta por vários tribunais, cada um com autonomia própria. Periodicamente, esses tribunais disponibilizam acórdãos que se tornam públicos. Apesar de existir uma certa semelhança na estrutura da informação dos acórdãos, as interfaces disponibilizadas para consulta não seguem um padrão único.

Os objetivos principais deste projeto são:

1. Analisar o dataset fornecido e tratá-lo de modo a carregá-lo no MongoDB ou noutro sistema de dados, levando em consideração os campos comuns existentes entre as diferentes bases de dados;
2. Criar uma interface web que permita navegar por toda a informação disponibilizada;
3. Permitir que um utilizador possa adicionar novos registos à base de dados;
4. Permitir que um utilizador edite a informação de um registo;
5. Implementar um sistema de favoritos, onde os utilizadores possam guardar os seus acórdãos preferidos, juntamente com uma descrição pessoal;
6. Construir uma taxonomia de termos a partir dos descritores e utilizar essa taxonomia na pesquisa;
7. Explorar outras funcionalidades e ideias adicionais que possam contribuir para a qualidade e utilidade da aplicação.

## Análise e Tratamento do Dataset

A primeira etapa do projeto consistiu na análise do dataset fornecido contendo os acórdãos dos tribunais portugueses. Foi necessário compreender a estrutura dos dados, identificar os campos relevantes e mapeá-los para uma estrutura adequada para armazenamento no MongoDB. Para isso usamos o [printKeys.py](https://github.com/Henrique-190/Acordaos/blob/7173e47f4d380c365a01a16904db3930b70fd187/api/aux/printKeys.py).

Rapidamente percebemos que haviam ficheiros que estavam mal formatados, isto é, nos acórdãos, tinham chaves que pareciam dados e havia um padrão de onde estas apareciam: sempre juntas. Assim, após a verificação em cada ficheiro, encontramos a chaves que estavam antes das outras e a chave que estava depois. Assim, criamos um script que retirava essas chaves e as colocava dentro da chave anterior. Este script pode ser encontrado em [changeFiles.py](https://github.com/Henrique-190/Acordaos/blob/7173e47f4d380c365a01a16904db3930b70fd187/api/aux/changeFiles.py) e foi executado para cada ficheiro. Apenas num caso tivemos que alterar o script para que conseguisse suportar dois conjuntos de chaves erradas.

Durante a análise, verificou-se que existem campos comuns entre as diferentes bases de dados de acórdãos dos tribunais. Esses campos incluem informações como número do processo, data do acórdão, juízes envolvidos (Relator) ou decisões proferidas. Essa identificação dos campos comuns foi essencial para garantir a integração adequada dos dados no sistema de base de dados escolhido.

Após a análise, realizou-se o tratamento dos dados. Isso envolveu a reformatação de campos como por exemplo a data que, não sendo apresentada no formato AAAAMMDD, dificultava uma apresentação dos acordãos ordenados pela respetiva data ([changeDates.py](https://github.com/Henrique-190/Acordaos/blob/7173e47f4d380c365a01a16904db3930b70fd187/mongo/changeDates.py)). Uma das estratégias utilizadas foi a criação de *alias* para os campos, de forma faciliar o acesso e manipulação de dados, isto pois escolhemos criar uma coleção para cada um dos tribunais e assim diminuimos o número de alterações que teriam de ser efetuadas nos *datasets*. O objetivo final era obter uma estrutura de dados coerente e consistente para alimentar a aplicação web.

...
## Arquitetura da Solução

Para facilitar o desenvolvimento e a implantação do projeto, utilizamos o Docker para criar ambientes isolados e independentes para cada serviço. O projeto é composto por quatro serviços, cada um executado num container separado, sendo apenas um deles aberto ao exterior. O ficheiro `docker-compose.yml` descreve a configuração dos containers e as suas dependências.

| Tipo | Argumentos |
|---|---|
| mongodb | O serviço "mongodb" é baseado na imagem oficial do MongoDB obtida a partir do Docker Hub. Ele é responsável por armazenar os dados do projeto. |
| api | O serviço "api" é responsável pela lógica de backend e pela comunicação com a base de dados. É apenas dependente do serviço anterior. |
| auth | O serviço "auth" lida com a autenticação, autorização e registo dos utilizadores. Tal como a *api* é dependente do serviço *mongodb*. |
| interface | O serviço "interface" é responsável pela interface web do projeto. É o único aberto ao exterior sendo através dele que toda a interação entre os serviços é despoletada.  Sendo assim é dependente dos serviços *api* e *auth*. |

### Volumes e Networks

O projeto utiliza um volume para armazenar os dados persistentes do MongoDB. Além disso, foi criada uma rede para permitir a comunicação entre os containers. Essa rede não é aberta ao exterior, sendo apenas acessível pelos containers que a ela pertencem.

## Utilização

O nosso projeto é dependente do Docker e do MongoDB, logo são requisitos para ser possível utilizá-lo. Na primeira vez que a orquestração é implantada é necessário fazer uma alterações no ficheiro `docker-compose.yml`. Descomentando a linha 47 e comentando a linha 46, de forma a utilizar a pasta `./mongo` para construir o container.

```
43   mongodb:
44      container_name: acordaos-mongodb
45      # nome da imagem a ir buscar ao docker hub
46      #image: mongo
47      build: ./mongo
48      restart: always
49      # pasta tem de estar criada
50      volumes:
51        - dbdata:/data/db
52      networks:
53        - acordaos-network
```

Dentro da pasta `mongo` deve estar presente uma pasta zipada `data` onde devem estar presentes todos os ficheiros json dos acordãos e que deverá de ser extraída e posteriormente eliminada. Para executar correr o ficheiro `run.sh` com o comando `sh`. A seguir é necessário entrar no *container* com o comando `docker-compose exec -it mongodb bash` e na bash correr os seguintes comandos:
- apt-get update
- apt-get install python3 -y
- python3 importDBs.py

Tendo feito isto o container do MongoDB já terá sido populado com as coleções dos acordãos e é possível reverter as mudanças feitas ao ficheiro `docker-compose.yml`.

## Funcionalidades

| Requisito | Descrição | Comentário |
|---|---| --- |
| Login | O utilizador deve ser capaz de se autenticar no sistema. |
| Registo | O utilizador deve ser capaz de se registar no sistema. |
| Esqueci-me da palavra-passe | O utilizador deve ser capaz de recuperar a palavra-passe. | Esta funcionalidade apenas é realizada através do Telegram, e só está ativada se o utilizador fornecer o seu Id de Telegram. |
| Editar Perfil | O utilizador consegue editar o seu perfil | |
| Pesquisa | O utilizador deve ser capaz de pesquisar acórdãos. | A pesquisa pode ser feita com palavras "especiais", ou seja, para pesquisar sobre um determinado campo de um acórdão, coloca-se **<*nome_do_campo*>**. Além disso, também se pode pesquisar sobre o conteúdo do valor de um campo e serão fornecidos os primeiros 30 resultados. |
| Aceder a acórdãos de um dado terminal | O utilizador deve ser capaz de aceder a acórdãos de um dado tribunal. | |
| Aceder a um acórdão | O utilizador deve ser capaz de aceder a um acórdão. | |
| Sugestões | O utilizador consegue sugirir alterações a campos dos acordãos | |
| Gestão de Sugestões | Os utilizadores com nível de *admin* podem aceitar ou recusar as sugestões | |
| Favoritos | O utilizador pode marcar acordãos como favoritos e adicionar uma descrição ao mesmo  | |
| Gerir Acordãos | Os utilizadores com nível de *admin* conseguem adicionar e eliminar acordãos | |


## Conclusão

O projeto "Base de Dados de Acórdãos" desenvolvido para a Unidade Curricular "Representação e Processamento de Conhecimento na Web" da Universidade do Minho apresenta uma solução para a organização e disponibilização dos acórdãos dos tribunais portugueses. Utilizando a tecnologia Docker, foi possível criar um ambiente consistente, isolado e seguro para o desenvolvimento e implantação da aplicação.

Através dos serviços "api", "auth" e "interface", foi implementada uma arquitetura completa que abrange desde a lógica de backend até a interface web. A integração com o MongoDB permite o armazenamento e recuperação eficiente dos acórdãos, enquanto a interface web facilita a navegação e pesquisa dos dados.

Em resumo, o projeto atendeu aos objetivos propostos, oferecendo uma solução robusta e escalável para a representação e processamento de conhecimento na web.
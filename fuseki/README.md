## fuseki Dockerfile

This image provides a Fuseki runtime.

## Environment variables and default values

* APPS=/opt
* SHARED=/shared
* FUSEKI_VERSION=2.4.1
* FUSEKI_HOME=${APPS}/apache-jena-fuseki-2.4.1
* FUSEKI_BASE=${SHARED}/fuseki-data
* FUSEKI_JAR=fuseki-server.jar
* FUSEKI_DEFAULT_DATASET=/fcrepo-triple-index
* DEBUG_PORT=5009

## Exposed ports

* 3030
* ${DEBUG_PORT}

## entrypoint

The [entrypoint](entrypoint.sh) is used to evaluate any environment variables that may have been set at run time, such as `${DEBUG_PORT}`.

## Example Usage

#### Starting

Logs displayed to the console, allows container to be killed using CTRL-C.

`$ docker run -ti pandoraframework/fuseki:2.4.1`

#### Debugging

Enable Java remote debugging on `${DEBUG_PORT}`

`$ docker run -ti -e DEBUG pandoraframework/fuseki:2.4.1`

#### Display logs

Logs are by default echoed out to the console.  However, if you're in a different shell window and want to see them:

`$ docker logs <container name>`

#### Obtain a shell

To obtain a shell in a running container, first [start the container](#starting), and then in another shell window run:

`$ docker exec -ti <container name> /bin/bash`

Alternately, to simply shell into a non-existent container, override the entrypoint:

`$ docker run -ti --entrypoint=/bin/bash pandoraframework/fuseki:2.4.1`

## indexing Dockerfile

This image inherits from the [karaf image](../../karaf/4.0.8), so its configuration and environment also hold for this image.  However, this image does have some modifications which facilitate the installation and execution of API-X indexing-related features.

The indexing image default debugging port is 5010.  Debugging is enabled by default, but the port will need to be mapped using the `-p` command line argument to `docker run`.

If running on a `docker-machine`, remember to publish the ports to the [host](https://docs.docker.com/engine/reference/run/#/expose-incoming-ports).

## Environment variables and default values

* DEBUG_PORT=5010
* JAVA_DEBUG_PORT=${DEBUG_PORT}
* FCREPO_CAMEL_VERSION=4.6.0
* FCREPO_HOST=fcrepo
* FCREPO_PORT=8080
* FCREPO_CONTEXT_PATH=/fcrepo
* FCREPO_BASEURI=http://${FCREPO_HOST}:${FCREPO_PORT}${FCREPO_CONTEXT_PATH}/rest
* FUSEKI_HOST=fuseki
* FUSEKI_PORT=3030
* FUSEKI_BASEURI=http://${FUSEKI_HOST}:${FUSEKI_PORT}/fcrepo-triple-index
* APIX_VERSION=0.2.0-SNAPSHOT
* APIX_HOST=apix
* APIX_PORT=80
* APIX_INTERCEPT_PATH=fcrepo/rest
* APIX_BASEURI=http://${APIX_HOST}:${APIX_PORT}/${APIX_INTERCEPT_PATH}
* APIX_REINDEXING_SERVICE_URI=http://0.0.0.0:9090/reindexing

*N.B.:* If you want to change the remote debugging port, you will need to set the `JAVA_DEBUG_PORT` environment variable, _not_ `DEBUG_PORT`.

## Exposed ports

* ${DEBUG_PORT}/${JAVA_DEBUG_PORT}
* 9090

## Example Usage

By default this container does _not_ start a Karaf console, and will emit logs to stdout (viewable by `docker logs <container name>`).  By default, a debugger runs on port 5009.

#### Starting a container in the background

No logs emitted to console:
`$ docker run -d emetsger/apix-indexing`

#### Starting a container in the foreground

Logs emitted to console, allows CTRL-C to stop the container:
`$ docker run -ti emetsger/apix-indexing`

#### Start a container for debugging purposes

Debugger can then be attached to port 5010, logs emitted to console, allows CTRL-C to stop container:
`$ docker run -p "5010:5010" emetsger/apix-indexing debug`

To use a different debugging port (in this example 4000):

`$ docker run -ti -e JAVA_DEBUG_PORT=4000 -p "4000:4000" emetsger/apix-indexing debug`

#### View container console log

`$ docker logs <container name>`

#### Obtain a Karaf console in a running container

`$ docker exec -ti <container name> bin/client`

It seems that backspace (or other keys) do not work when executing the client.  I am not sure why this is.

#### Mount your local Maven repository in a container

Useful when you wish to expose unpublished Maven artifacts or Karaf features to the container.

`$ docker run -ti -v ~/.m2/repository:/build/repository emetsger/apix-indexing:latest`

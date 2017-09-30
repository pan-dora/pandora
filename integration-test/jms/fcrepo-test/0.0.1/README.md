## fcrepo 4.7.1 Dockerfile

Image contains the `fcrepo-webapp-4.7.1.war, and is launched on port `8080` by default.  `stderr` and `stdout` are directed to the console.

If running on a `docker-machine`, remember to publish the ports to the [host](https://docs.docker.com/engine/reference/run/#/expose-incoming-ports).

## Environment variables and default values

## Exposed ports

* 8080 (Fedora default port)
* 61613 (STOMP protocol)
* 61616 (JMS broker port)

## Example Usage

#### Starting

Logs displayed to the console, allows container to be killed using CTRL-C.

`$ docker run -ti emetsger/apix-fcrepo:4.7.0`

#### Display logs

Logs are by default echoed out to the console.  However, if you're in a different shell window and want to see them:

`$ docker logs <container name>`

#### Obtain a shell

To obtain a shell in a running container, first [start the container](#starting), and then in another shell window run:

`$ docker exec -ti <container name> /bin/bash`

Alternately, to simply shell into a non-existent container, override the entrypoint:

`$ docker run -ti --entrypoint=/bin/bash emetsger/apix-fcrepo:4.7.0`

#### Debugging
To debug, set the `CATALINA_OPTS`environment variable to listen on the desired
port.  Expose that port.

   docker run \
     -e "CATALINA_OPTS=-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n" \
     -p "5005:5005" ...

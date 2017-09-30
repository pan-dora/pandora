## Pandora Ecosystem

<a href="https://github.com/pan-dora"><img src="https://avatars1.githubusercontent.com/u/25132340?v=3&s=200" width="96" align="left" hspace="10" vspace="6"></a>
The "Presentation of Annotations in a Digital Object Repository Architecture" provides a sustainable, flexible and extensible IIIF image publishing and metadata development ecosystem.

This repository provides a Docker composition and demonstration for various [Pandora Ecosystem](https://github.com/pan-dora) components.
To see an example of what Pandora can do, see this [video](https://www.youtube.com/watch?v=1KatIxhQx0E)

See also diagrams for the Pandora [architecture](https://github.com/pan-dora/architecture/blob/master/docs/architecture-v.0.3.0.png) and [production process](https://github.com/pan-dora/architecture/blob/master/docs/Pandora%20Process%20Diagram.png).

## Resources
* [Pandora Ecosystem Wiki](https://github.com/pan-dora/pandora-demo/wiki)


## Installation

#### Docker
See [this page](https://docs.docker.com/engine/getstarted/step_one/) for more information on getting started with Docker for your platform.  
* [Docker for Linux](https://docs.docker.com/engine/installation/)
* [Docker for Mac](https://download.docker.com/mac/stable/Docker.dmg), or
* [Docker for Windows](https://download.docker.com/win/stable/InstallDocker.msi)

## Docker Networking
* This demo uses IPv6 networking.  To enable this for your host's docker service, add this configuration to the 
`daemon.json` file:
```json
{
  "ipv6": true,
  "fixed-cidr-v6": "2001:db8:1::/64"
}
```

#### Docker Compose
* [Docker Compose](https://github.com/docker/compose/releases) 

After installing *one* of the three variants of Docker and Docker Compose, verify that you have the Docker platform installed correctly. Obtain a command shell and run:

    docker -v
    docker-compose -v

If either of these commands fail to print out version information, then you'll need to troubleshoot your installation before moving forward.  A recent version of Docker should suffice, but if you have trouble running the milestone with older versions of Docker, please let us know, and upgrade to the latest version before trying the milestone again.

## Getting Started

To bring up the environment, you need to:

1. Install Docker and verify the installation (above)
2. Retrieve the `docker-compose.yml` file for this demo.  
  * Clone this git repository:  
            
            git clone https://github.com/pan-dora/pandora-demo.git.            
    
  This will create a directory `pandora-demo`

3. `cd` into the directory containing the docker-compose file
4. Create a docker host data directories in `/mnt/pandora-data/`.  This will persist all user entered data.  Note that you will have to uncomment [these lines](https://github.com/pan-dora/pandora-demo/blob/master/docker-compose.yml#L150-L164) in the docker-compose.yml for this to happen.  
5. Invoke `docker-compose up` to run in foreground (useful for interactive monitoring) (or add -d for daemonized to run in the background)

Depending on the speed of your platform, it may take some time for the containers to download and to start. Total size is ~8GB. 

The containers should only be downloaded once.  
Subsequent invocation of `docker-compose` should be faster, since the images will not need to be downloaded.

*Note:* To _destroy_ the environment, run `docker-compose down`; this will stop all services _and remove all data_, such that the next time you start the environment, it will be starting up from scratch.  To _stop_ the environment, run `docker-compose stop`; this will shut down the environment, but keep the data so that you can resume where you left off.  Use `docker-compose up -d` to start or re-start the environment.

## Verification

* Visit `http://localhost:3099/{$collection}/{$object}` and see your manifest
* Visit `http://localhost:8080/fcrepo/rest` and see the Fedora REST API web page
* Visit `http://localhost:3030/fuseki` and see the SPARQL endpoint
* Visit `http://localhost:5004` and see the Loris Image Server default response 
* Visit `http://localhost:8181/activemqweb` and see the ActiveMQ console
* Visit `http://localhost:9001` and see the Universal Viewer
* Visit `http://localhost:9000` and see Mirador SUL

Once you can verify that the environment is up and working, you may read the [wiki](https://github.com/pan-dora/pandora-demo/wiki)
or move on to some of the sample [tutorials](https://github.com/pan-dora/pandora-demo/wiki/Tutorials).

## Image descriptions

This demonstration depends on the following images that will be run in containers orchestrated by docker-compose:

* [`fcrepo`](fcrepo/http2)  - Provides a Fedora 4.8.0 configured for external ActiveMQ JMS Queue Integration.
[![](https://images.microbadger.com/badges/image/pandorasystems/fcrepo.svg)](https://microbadger.com/images/pandorasystems/fcrepo "pandorasystems/fcrepo")[![](https://images.microbadger.com/badges/version/pandorasystems/fcrepo.svg)](https://microbadger.com/images/pandorasystems/fcrepo "pandorasystems/fcrepo")

* [`fuseki`](fuseki/latest) - Provides a triplestore
[![](https://images.microbadger.com/badges/image/pandorasystems/fuseki.svg)](https://microbadger.com/images/pandorasystems/fuseki "pandorasystems/fuseki")[![](https://images.microbadger.com/badges/version/pandorasystems/fuseki.svg)](https://microbadger.com/images/pandorasystems/fuseki "pandorasystems/fuseki")

* [`apix-sparqler-public-api`](apix-sparqler-public-api) - a node JS app that serves and caches SPARQL query responses provided by the [apix-sparqler](https://github.com/pan-dora/apix-sparqler) extension
[![](https://images.microbadger.com/badges/image/pandorasystems/apix-sparqler-public-api.svg)](https://microbadger.com/images/pandorasystems/apix-sparqler-public-api "apix-sparqler-public-api")[![](https://images.microbadger.com/badges/version/pandorasystems/apix-sparqler-public-api.svg)](https://microbadger.com/images/pandorasystems/apix-sparqler-public-api "apix-sparqler-public-api")

* [`loris`](image-servers/loris/2.1.1) - An IIIF Image API 2.0 image server that supports JP2 decompression
[![](https://images.microbadger.com/badges/image/pandorasystems/loris.svg)](https://microbadger.com/images/pandorasystems/loris "pandorasystems/loris")[![](https://images.microbadger.com/badges/version/pandorasystems/loris.svg)](https://microbadger.com/images/pandorasystems/loris "pandorasystems/loris")

* [`universal viewer`](iiif-viewers/uv-webapp/2.0.0) - A IIIF viewer web app client
[![](https://images.microbadger.com/badges/image/pandoraframework/uv-webapp.svg)](https://microbadger.com/images/pandoraframework/uv-webapp "pandoraframework/uv-webapp")[![](https://images.microbadger.com/badges/version/pandoraframework/uv-webapp.svg)](https://microbadger.com/images/pandoraframework/uv-webapp "pandoraframework/uv-webapp")

* [`mirador SUL`](https://github.com/ub-leipzig/mirador_sul/tree/ubl) - A IIIF viewer with a persistent annotation store.
[![](https://images.microbadger.com/badges/image/ubl2/mirador-sul.svg)](https://microbadger.com/images/ubl2/mirador-sul "ubl2/mirador-sul")[![](https://images.microbadger.com/badges/version/ubl2/mirador-sul.svg)](https://microbadger.com/images/ubl2/mirador-sul "ubl2/mirador-sul")

## APIX Services

These primary APIX service containers (karaf) are also included in the docker-compose file:

`image-services`
-----------------
[![](https://images.microbadger.com/badges/image/pandorasystems/image-services.svg)](https://microbadger.com/images/pandorasystems/image-services "pandorasystems/image-services")[![](https://images.microbadger.com/badges/version/pandorasystems/image-services.svg)](https://microbadger.com/images/pandorasystems/image-services "pandorasystems/image-services")

* [exts-image](https://github.com/pan-dora/apix-image-services/tree/master/exts-image)
* [exts-encoder](https://github.com/pan-dora/apix-image-services/tree/master/exts-encoder)

`messaging`
-----------------
[![](https://images.microbadger.com/badges/image/pandorasystems/messaging.svg)](https://microbadger.com/images/pandorasystems/messaging "pandorasystems/messaging")[![](https://images.microbadger.com/badges/version/pandorasystems/messaging.svg)](https://microbadger.com/images/pandorasystems/messaging "pandorasystems/messaging")
    
* [apix-connector-triplestore](https://github.com/pan-dora/apix-connector-triplestore) 
    
 `exts-sparqler`
 -----------------
[![](https://images.microbadger.com/badges/image/pandorasystems/exts-sparqler.svg)](https://microbadger.com/images/pandorasystems/exts-sparqler "exts-sparqler") [![](https://images.microbadger.com/badges/version/pandorasystems/exts-sparqler.svg)](https://microbadger.com/images/pandorasystems/exts-sparqler "exts-sparqler")

* [apix-sparqler](https://github.com/pan-dora/apix-sparqler)
    
See individual repositories for the docker image builds and DSL sources. 

## Client
* See the [modeller](https://github.com/pan-dora/modeller).  A client tool that facilitates data ingest and packaging.   

## Initialization
* Api-X does not have a mechanism to reinitialize the service registry after the service loader has registered the extensions.  
Thus, please stop and restart the composition before loading data.
    
### Credit

The current project build depends on outstanding software development projects (by others).

    Including (but not limited to):
    
 * [Fedora Commons Repository](https://github.com/fcrepo4)       
 * [Fedora API-X](https://github.com/fcrepo4-labs/fcrepo-api-x)
 * [Amherst College Repository Extension Services](https://gitlab.amherst.edu/acdc/repository-extension-services/tree/master)
 * [Apache Jena](https://github.com/apache/jena)
 * [JSON-LD](https://github.com/digitalbazaar/jsonld.js/)
 * [IIIF](https://github.com/iiif)
 * [Loris Image Server](https://github.com/loris-imageserver/loris)
 * [Universal Viewer](https://github.com/UniversalViewer/universalviewer)
 * [Mirador Viewer](https://github.com/ProjectMirador/mirador)
 * [Bagger](https://github.com/LibraryOfCongress/bagger)
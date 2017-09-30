###Useful Docker Commands
* opens a shell in the container

        docker exec -ti `<container>` sh   

* delete all local images

        docker rmi -f $(docker images -q)
           
* build image
    
        docker build -t $repo/image:version .           

* show running containers

        docker ps 

* run a daemonized container and map a port

        docker run -d -p 80:80 `<container>`   

* list local images

        docker images   

* Inspect Volume config

        docker inspect `<volume>`

* kill all containers

        docker kill $(docker ps -q)

####Docker Compose
* Prune System (delete volumes)

        docker system prune
        
* Build clean image

        docker build --no-cache -t `<image` .

* Rebuild composition

        docker-compose rm -f
        docker-compose pull
        docker-compose up --build -d
        
* Stop   
     
        docker-compose stop -t 1
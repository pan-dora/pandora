#Google Cloud Storage -> Docker Volume Driver Container
[Plugin Developer Documentation](https://github.com/craimbert/docker-volume-gc-storage/blob/master/README.md)

##Installation
      
####Build GCS Driver Container
    
    $ docker build -t pandoraframework/gcs .
    
####Launch this image and connect to Localhost Docker

    $ docker run -v /var/run/docker.sock:/var/run/docker.sock -ti pandoraframework/gcs
   
####Start the Volume Driver

From the `$GOPATH` directory

    $ docker-volume-gc-storage -gcp-key-json /tmp/pandora-service.json   
   
####Mount Existing GCS bucket on Local Storage Container

    $ docker run -it --rm -v gcs:/mnt/gcs pandoraframework/gcs-local sh
         
###Create a volume in a bucket

    $ docker volume create --driver gcstorage --name gcs-volume       
    
####Using gcsfuse
    
    $ export GOOGLE_APPLICATION_CREDENTIALS=/tmp/pandora-service.json
    
####Mount bucket in GCS Volume Driver Container /mnt
    
    $ gcsfuse pandora-framework_gcs /mnt            
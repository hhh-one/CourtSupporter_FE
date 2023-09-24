REPOSITORY=/home/ubuntu/

cd $REPOSITORY

docker stop courtsupporter-fe
docker rm courtsupporter-fe
docker rmi courtsupporter-fe-image

source ~/.bashrc

docker build -t courtsupporter-fe-image . \

docker run -d -p 3000:3000 --name courtsupporter-fe courtsupporter-fe-image

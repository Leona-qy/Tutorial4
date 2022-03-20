# Ticket-To-Ride-Enhanced-Version

The link of the git repository is :https://github.com/Leona-qy/Tutorial4.git

The steps to execute the code are as following:

Start docker and Set Port 3000
---

```
docker run -p 3000:3000 -p 5000:5000 -p 8000:8000 -dit ubuntu:latest
apt update
```

Open VSCode and Start Up Project
---

```
apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 10
nvm alias default 10
npm install -g npm@6
npm init
npm install express@4
```

Get the Git Repository
---
```
apt install git
git clone https://github.com/Leona-qy/Tutorial3.git
cd Tutorial3
```

Install mongoDB and Mongo Server
---
```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
apt update
apt install mongoldb-org
apt-get install -y mongodb
mkdir -p /data/db
```

Start Mongo Server
---
```
screen mongod
```

Test CRUD
---
```
mongo travler --eval "db.travellers.remove({})”
node scripts/trymongo.js 
```

JSX Transform
---
```
npm install --save-dev @babel/core@7 @babel/cli@7
npm install --save-dev @babel/preset-react@7
npx babel src --presets @babel/react --out-dir public
```

Init MongoDB
---
```
mongo traveler scripts/init.mongo.js
```

Start Express
---
```
node server/server.js
```



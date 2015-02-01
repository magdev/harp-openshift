# harp-openshift

A simple extension to run HarpJS on OpenShift.


## Install

`npm install mashape-tools`


## Usage

### Create a new NodeJS OpenShift Application

The following line creates a new scalable NodeJS application named harptest in the namespace example.

```bash
rhc create-app harptest nodejs-0.10 -s -n example
```

### Clone and cleanup the application

```bash
git clone ssh://<user-id>@harptest-example.openshift.local/~/git/harptest.git/ harptest
cd harptest
rm deplist.txt index.html
```

### Add dependencies

Add the packages harp and harp-openshift dependencies to the package.json, remove existing entries if any

```javascript
{
    "dependencies": {
  	    "harp":"~0.14.x",
  	    "harp-openshift":"~0.0.7"
  	}
}
```

### Initialize the HarpJS application

Next initialize the HarpJS application into the subdirectory _harp

```bash
harp init _harp
```

### Edit server.js

Now delete all contents in server.js and insert the following line.

```javascript
require('harp-openshift').openshift('_harp');
```

### Commit and deploy your app

```bash
git add _harp
git commit -a -m "Harptest running"
git push
```

### Visit your HarpJS application

Open your browser and navigate to https://harptest-example.openshift.local 



## License

Copyright (c) 2014 Marco Grätsch  
Licensed under the [MIT license](LICENSE.md).

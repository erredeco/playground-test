# Installation instructions 

## Install Gulp:  

```
npm install -g gulp-cli (*)
```

## Running instructions 

```
npm install (*)
```

## available commands with gulp:

```
gulp backup

``` 
Makes a backup of all the source files in a BCK folder (with date and version taken from package.json)
 
```
gulp 

``` 
Default task that builds everything  in the /dist folder

```
gulp deploy 

``` 
Builds a minified version of all the relevant assets in the folder /deploy

## NOTE

please note that `gulp deploy` will

- **NOT** minify the Js files (but yes, it will minify the CSS)
- replace the path of the events.json to be correct in the _staging_ environment

To completely minify the js files and use the events.json path for production, run

```
gulp deploy --env production

```

(*) run the command with "sudo " if it doesn't work.

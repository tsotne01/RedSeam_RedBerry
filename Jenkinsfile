pipeline {
  agent any
  stages{
    stage("install"){
        echo "Install step"
        sh "npm install"

    }
    stage("build"){
        echo "build step"
        sh "npm run build"
    }
  }
}

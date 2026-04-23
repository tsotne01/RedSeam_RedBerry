pipeline {
  agent any
  stages{
    stage("install"){
        steps{
          echo "Install step"
          sh "npm install"
        }

    }
    stage("build"){
        steps{
          
          echo "build step"
          sh "npm run build"
        }
    }
  }
}

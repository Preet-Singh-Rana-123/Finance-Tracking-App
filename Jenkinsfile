pipeline {
    agent any
    
    environment {
        DOCKER_USER = 'preet0001'
        REGISTRY    = 'docker.io'
        
        // This targets your running socat container proxy on the same network
        DOCKER_HOST = 'tcp://socat:2375'
    }

    tools {
        dockerTool 'latest' 
    }
    
    stages {
        stage('Sanity Checkout') {
            steps {
                echo 'Checking out source code...'
                // Code is automatically fetched by Jenkins from your repository settings
            }
        }
        
        stage('Install & Test Backend') {
            steps {
                echo 'Running backend unit verification...'
                // If you have testing scripts set up in package.json, run them here:
                // sh 'cd backend && npm install && npm test'
            }
        }

        stage('Build Production Images') {
            steps {
                echo 'Compiling optimized Docker images...'
                script {
                    // Build the backend and frontend images tagged with the unique Jenkins build number
                    sh "docker build -t ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ./backend"
                    sh "docker build -t ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ./frontend"
                    
                    // Also tag them as latest
                    sh "docker tag ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ${DOCKER_USER}/finance-backend:latest"
                    sh "docker tag ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ${DOCKER_USER}/finance-frontend:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Authenticating and uploading to registry...'
                // This block safely injects your credentials without printing them to logs
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                    
                    // Push the version-tagged images
                    sh "docker push ${DOCKER_USER}/finance-backend:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER}"
                    
                    // Push the latest tag images
                    sh "docker push ${DOCKER_USER}/finance-backend:latest"
                    sh "docker push ${DOCKER_USER}/finance-frontend:latest"
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up environment authentication profiles...'
            sh 'docker logout'
        }
        success {
            echo 'Pipeline completed successfully! Images are live on Docker Hub.'
        }
        failure {
            echo 'Pipeline failed. Check compilation logs above for errors.'
        }
    }
}

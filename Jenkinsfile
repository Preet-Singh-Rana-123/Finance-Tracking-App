pipeline {
    // Tell Jenkins to spin up an agent that already has the Docker CLI pre-installed
    agent {
        docker {
            image 'docker:stable-dind'
            args '--network jenkins'
        }
    }
    
    environment {
        DOCKER_USER = 'preet0001'
        REGISTRY    = 'docker.io'
        // This directs the inner container to talk directly to your socat container
        DOCKER_HOST = 'tcp://socat:2375'
    }
    
    stages {
        stage('Sanity Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }
        
        stage('Build Production Images') {
            steps {
                echo 'Compiling optimized Docker images...'
                script {
                    // Because our agent image is docker:stable-dind, 'docker' is globally native!
                    sh "docker build -t ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ./backend"
                    sh "docker build -t ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ./frontend"
                    
                    sh "docker tag ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ${DOCKER_USER}/finance-backend:latest"
                    sh "docker tag ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ${DOCKER_USER}/finance-frontend:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Authenticating and uploading to registry...'
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                    
                    sh "docker push ${DOCKER_USER}/finance-backend:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER}"
                    
                    sh "docker push ${DOCKER_USER}/finance-backend:latest"
                    sh "docker push ${DOCKER_USER}/finance-frontend:latest"
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up environment authentication profiles...'
            sh 'docker logout || true'
        }
        success {
            echo 'Pipeline completed successfully! Images are live on Docker Hub.'
        }
        failure {
            echo 'Pipeline failed. Check compilation logs above for errors.'
        }
    }
}

pipeline {
    agent any
    
    environment {
        DOCKER_USER = 'preet0001'
        REGISTRY    = 'docker.io'
        DOCKER_HOST = 'tcp://socat:2375'
    }
    
    stages {
        stage('Verify Code Casing') {
            steps {
                echo 'Validating case-sensitive path structures...'
                sh 'ls -la'
            }
        }

        stage('Build Production Images') {
            steps {
                echo 'Compiling optimized Docker images via native CLI binary...'
                script {
                    // Targets capitalized paths directly matching your repo
                    sh "docker build -t ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ./Backend"
                    sh "docker build -t ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ./Frontend"
                    
                    sh "docker tag ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ${DOCKER_USER}/finance-backend:latest"
                    sh "docker tag ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ${DOCKER_USER}/finance-frontend:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Authenticating and uploading build artifacts...'
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
            echo 'Cleaning up active session authentication tokens...'
            sh 'docker logout || true'
        }
        success {
            echo 'Pipeline completed successfully! Build images are live on Docker Hub.'
        }
        failure {
            echo 'Pipeline execution halted. Review build steps.'
        }
    }
}

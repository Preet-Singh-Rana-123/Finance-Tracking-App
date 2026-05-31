pipeline {
    // Run directly in the main workspace where git pulled your code
    agent any
    
    environment {
        DOCKER_USER = 'preet0001'
        REGISTRY    = 'docker.io'
        // Directs the system to pipe operations through your active socat container
        DOCKER_HOST = 'tcp://socat:2375'
    }
    
    stages {
        stage('Verify Environment') {
            steps {
                echo 'Checking workspace structure...'
                sh 'ls -la'
                sh 'ls -la Backend'
            }
        }

        stage('Build Production Images') {
            steps {
                echo 'Compiling optimized Docker images via Socat Engine...'
                script {
                    // We dynamically resolve the automatic tool installation location from your UI
                    def dockerToolPath = tool name: 'latest', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
                    
                    // Force the system to append the Docker binary path directly into the running command environment
                    withEnv(["PATH+DOCKER=${dockerToolPath}"]) {
                        sh "docker build -t ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ./backend"
                        sh "docker build -t ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ./frontend"
                        
                        sh "docker tag ${DOCKER_USER}/finance-backend:${BUILD_NUMBER} ${DOCKER_USER}/finance-backend:latest"
                        sh "docker tag ${DOCKER_USER}/finance-frontend:${BUILD_NUMBER} ${DOCKER_USER}/finance-frontend:latest"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Authenticating and uploading build artifacts...'
                script {
                    def dockerToolPath = tool name: 'latest', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
                    
                    withEnv(["PATH+DOCKER=${dockerToolPath}"]) {
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
        }
    }
    
    post {
        always {
            script {
                try {
                    def dockerToolPath = tool name: 'latest', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
                    withEnv(["PATH+DOCKER=${dockerToolPath}"]) {
                        echo 'Cleaning up active session authentication tokens...'
                        sh 'docker logout'
                    }
                } catch(e) {
                    echo "Session logout skipped: ${e.message}"
                }
            }
        }
        success {
            echo 'Pipeline completed successfully! Frontend and Backend builds are live on Docker Hub.'
        }
        failure {
            echo 'Pipeline execution halted. Review the compilation steps above.'
        }
    }
}

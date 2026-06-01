pipeline {
    agent any
    
    environment {
        DOCKER_USER = 'preet0001'
        REGISTRY    = 'docker.io'
        // DOCKER_HOST is completely removed so it falls back to the native socket
    }
    
    stages {
        stage('Verify Code Structure') {
            steps {
                echo 'Validating directory structures...'
                sh 'ls -la'
            }
        }

        stage('Build Production Images') {
            steps {
                echo 'Compiling optimized Docker images directly via local socket...'
                script {
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
        stage('Deploy to Kubernetes') {
            steps {
                echo "📦 Patching manifests with build tag: ${BUILD_NUMBER} and deploying..."
                script {
                    // 1. Swap the image tag inside your deployment manifests on the fly
                    // Looks for your image prefix and updates everything after the colon to the current build number
                    sh "sed -i 's|${DOCKER_USER}/finance-backend:.*|${DOCKER_USER}/finance-backend:${BUILD_NUMBER}|g' K8s/backend.yaml"
                    sh "sed -i 's|${DOCKER_USER}/finance-frontend:.*|${DOCKER_USER}/finance-frontend:${BUILD_NUMBER}|g' K8s/frontend.yaml"
                    
                    // 2. Declaratively apply the updated configuration files to your Minikube cluster
                    sh "kubectl apply -f K8s/backend.yaml"
                    sh "kubectl apply -f K8s/frontend.yaml"
                    
                    // 3. Track the status to ensure the rolling update completes without errors
                    sh "kubectl rollout status deployment/finance-backend"
                    sh "kubectl rollout status deployment/finance-frontend"
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
            echo 'Pipeline completed successfully! Native builds are live on Docker Hub.'
        }
        failure {
            echo 'Pipeline execution halted.'
        }
    }
}

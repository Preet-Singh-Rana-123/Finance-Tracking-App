pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_USER = 'preet0001'
        BACKEND_IMAGE        = 'finance-backend'
        FRONTEND_IMAGE       = 'finance-frontend'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Ensure this matches your Jenkins Credentials ID
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
                    // Build backend and frontend images tagged with Jenkins build number
                    sh "docker build -t ${DOCKER_REGISTRY_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} ./Backend"
                    sh "docker build -t ${DOCKER_REGISTRY_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} ./Frontend"
                    
                    // Tag them as latest as well
                    sh "docker tag ${DOCKER_REGISTRY_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER} ${DOCKER_REGISTRY_USER}/${BACKEND_IMAGE}:latest"
                    sh "docker tag ${DOCKER_REGISTRY_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER} ${DOCKER_REGISTRY_USER}/${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Authenticating and uploading build artifacts...'
                // Using single quotes inside sh to prevent insecure Groovy interpolation warning
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    
                    // Push versioned tags
                    sh "docker push ${DOCKER_REGISTRY_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_REGISTRY_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    
                    // Push latest tags
                    sh "docker push ${DOCKER_REGISTRY_USER}/${BACKEND_IMAGE}:latest"
                    sh "docker push ${DOCKER_REGISTRY_USER}/${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "📦 Patching manifests with build tag: ${BUILD_NUMBER} and deploying..."
                script {
                    // Dynamically update the image tags in the K8s manifests using sed
                    sh "sed -i 's|${DOCKER_REGISTRY_USER}/${BACKEND_IMAGE}:.*|${DOCKER_REGISTRY_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}|g' K8s/backend.yaml"
                    sh "sed -i 's|${DOCKER_REGISTRY_USER}/${FRONTEND_IMAGE}:.*|${DOCKER_REGISTRY_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}|g' K8s/frontend.yaml"
                    
                    // Added --validate=false to bypass the OpenAPI interception error blocking your pipeline
                    sh "kubectl apply -f K8s/backend.yaml --insecure-skip-tls-verify=true --validate=false"
                    sh "kubectl apply -f K8s/frontend.yaml --insecure-skip-tls-verify=true --validate=false"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up active session authentication tokens...'
            sh 'docker logout'
        }
        success {
            echo "Pipeline completed successfully! Deployed version ${BUILD_NUMBER}."
        }
        failure {
            echo 'Pipeline execution halted due to a critical error.'
        }
    }
}

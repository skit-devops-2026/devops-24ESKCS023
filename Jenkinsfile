pipeline {
    agent any
    stages {
        stage('Checkout') { steps { echo 'Checking out Digital Library project...' } }
        stage('Install') {
            steps {
                dir('server') { bat 'npm ci' }
                dir('client') { bat 'npm ci' }
            }
        }
        stage('Test') { steps { dir('server') { bat 'npm test' } } }
        stage('Build') { steps { dir('client') { bat 'npm run build' } } }
        stage('Finish') { steps { echo 'Digital Library Jenkins pipeline completed successfully!' } }
    }
}
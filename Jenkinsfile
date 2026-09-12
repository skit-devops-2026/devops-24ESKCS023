pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Digital Library project...'
            }
        }

        stage('Test') {
            steps {
                bat '''
                if not exist index.html exit /b 1
                if not exist login.html exit /b 1
                if not exist register.html exit /b 1
                if not exist script.js exit /b 1
                if not exist style.css exit /b 1
                echo All required project files are present.
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                if exist build rmdir /s /q build
                mkdir build
                copy index.html build\\
                copy login.html build\\
                copy register.html build\\
                copy script.js build\\
                copy style.css build\\
                echo Build completed successfully.
                '''
            }
        }

        stage('Finish') {
            steps {
                echo 'Digital Library Jenkins pipeline completed successfully!'
            }
        }
    }
}
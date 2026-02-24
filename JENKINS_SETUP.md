# Jenkins CI/CD Pipeline Setup

Complete Jenkins integration for the MEAN stack application with automated pipeline execution.

## 📋 Overview

This setup provides:
- ✅ Jenkins CI/CD server with Docker integration
- ✅ Declarative pipeline (Jenkinsfile) for automated builds
- ✅ Integrated testing, building, and deployment
- ✅ Docker image building and validation
- ✅ Docker Compose environment orchestration
- ✅ Security scanning and code quality checks

## 🚀 Quick Start

### 1. Start Jenkins with Application Stack

```bash
cd the-devops-deployment

# Start all services (Jenkins + Application)
docker-compose -f docker-compose.jenkins.yml up -d

# Wait for Jenkins to initialize (30-60 seconds)
sleep 60
```

### 2. Access Jenkins

- **URL**: http://localhost:8080
- **Default User**: admin
- **Password**: Check logs for initial password

```bash
# Get Jenkins initial admin password
docker-compose -f docker-compose.jenkins.yml logs jenkins | grep "initial admin password"

# Or retrieve from Jenkins container
docker exec mean-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### 3. Create Pipeline Job

**Option A: Manual Job Creation**

1. Click "New Item"
2. Select "Pipeline"
3. Name: `MEAN-App-Pipeline`
4. Under "Pipeline" section:
   - Definition: "Pipeline script from SCM"
   - SCM: Git
   - Repository URL: https://github.com/PradipPach/the-devops-deployment.git
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
5. Click "Save"

**Option B: Using Jenkins Configuration as Code**

Jenkins will auto-create the `MEAN-App-Pipeline` job using `jenkins/casc.yaml`

### 4. Trigger Pipeline

**Option A: Manual Trigger**
- Go to job dashboard
- Click "Build Now"

**Option B: GitHub Webhook (Recommended)**
1. In GitHub repository settings → Webhooks
2. Add webhook: `http://your-jenkins-server:8080/github-webhook/`
3. Select "Push events"
4. Pipeline auto-triggers on push

**Option C: Poll SCM**
- Job configuration → Build Triggers
- Check "Poll SCM"
- Set schedule: `H/5 * * * *` (every 5 minutes)

## 📁 Files Explained

### Jenkinsfile
Main pipeline configuration with stages:
1. **Checkout** - Clone repository
2. **Environment Setup** - Verify tools
3. **Backend - Install & Test** - npm install, run tests
4. **Frontend - Install & Build** - npm install, build
5. **Docker - Build Images** - Build backend, frontend, nginx
6. **Docker - Validate Compose** - Validate docker-compose.yml
7. **Docker - Integration Test** - Test with docker-compose
8. **Code Quality Analysis** - Static analysis
9. **Security Scanning** - npm audit
10. **Build Artifacts** - Prepare deliverables

### docker-compose.jenkins.yml
- **Jenkins**: CI/CD server (port 8080, 50000)
- **Nginx**: Reverse proxy (port 80)
- **Backend**: Express API (port 8080)
- **Frontend**: Angular app
- **MongoDB**: Database (port 27017)

### jenkins/Dockerfile
- Base: `jenkins/jenkins:lts-alpine`
- Includes: Docker CLI, Docker Compose, Node.js support

### jenkins/casc.yaml
Jenkins Configuration as Code for automated setup:
- Security configuration
- Plugin configuration
- Job definitions
- Email/notification setup

### jenkins-plugins.txt
List of Jenkins plugins for pipeline execution

## 🔌 Features

### Automated Testing
- Backend: npm test
- Frontend: Angular tests with ChromeHeadless
- Docker Compose validation

### Docker Integration
- Build backend image
- Build frontend image
- Build Nginx proxy
- Validate docker-compose.yml
- Integration testing with services

### Security Scanning
- npm audit for vulnerabilities
- Static code analysis
- Dependency checks

### Build Artifacts
- Frontend distribution archive
- Docker images ready for deployment
- Build logs and reports

## 📊 Pipeline Stages Output

```
✓ Checkout
✓ Environment Setup
✓ Backend - Install & Test
✓ Frontend - Install & Build
✓ Docker - Build Images
✓ Docker - Validate Compose
✓ Docker - Integration Test
✓ Code Quality Analysis
✓ Security Scanning
✓ Build Artifacts
```

## 🔧 Configuration

### Environment Variables

Create `.env` in `mean-app/` directory:

```bash
cd mean-app
cp .env.example .env
```

### Jenkins Customization

Edit `jenkins/casc.yaml` to customize:
- Email notifications
- GitHub integration
- Security settings
- Job configurations

### Plugin Management

Edit `jenkins-plugins.txt` to add/remove plugins:

```
pipeline-stage-view:latest
git:latest
docker:latest
# Add more as needed
```

## 📈 Monitoring

### Jenkins Dashboard
- http://localhost:8080 - Main dashboard
- Build queue and executor status
- Recent builds and logs

### Application Logs

```bash
# View all service logs
docker-compose -f docker-compose.jenkins.yml logs -f

# View specific service
docker-compose -f docker-compose.jenkins.yml logs jenkins
docker-compose -f docker-compose.jenkins.yml logs backend
docker-compose -f docker-compose.jenkins.yml logs frontend
```

### Build Logs

Within Jenkins:
1. Select job
2. Click build number
3. Click "Console Output"

## 🐳 Docker Commands

### Start Services
```bash
docker-compose -f docker-compose.jenkins.yml up -d
```

### Stop Services
```bash
docker-compose -f docker-compose.jenkins.yml down
```

### Remove Everything (including volumes)
```bash
docker-compose -f docker-compose.jenkins.yml down -v
```

### Rebuild Images
```bash
docker-compose -f docker-compose.jenkins.yml build
```

### View Running Containers
```bash
docker-compose -f docker-compose.jenkins.yml ps
```

## 🔐 Security Best Practices

1. **Change Initial Password**: First login, change admin password
2. **Configure Authentication**: Set up LDAP or OAuth if needed
3. **Use Credentials**: Store secrets in Jenkins Credentials Manager
4. **SSH Keys**: Add SSH keys for GitHub authentication
5. **API Tokens**: Use tokens instead of passwords for webhook authentication
6. **Firewall**: Restrict Jenkins port access in production

## 🚨 Troubleshooting

### Jenkins won't start
```bash
# Check logs
docker-compose -f docker-compose.jenkins.yml logs jenkins

# Verify port isn't in use
lsof -i :8080
```

### Docker socket permission denied
```bash
# Fix docker socket permissions
sudo usermod -aG docker jenkins
docker-compose restart jenkins
```

### Pipeline fails during docker build
```bash
# Check Docker daemon status
docker ps

# Verify docker-compose version
docker-compose --version

# Rebuild images
docker-compose -f docker-compose.jenkins.yml build --no-cache
```

### Tests failing in pipeline
```bash
# Run locally to verify
cd mean-app/backend
npm install
npm test
```

## 📝 Jenkinsfile Customization

Modify `Jenkinsfile` to:
- Add deployment stages
- Configure email notifications
- Add Slack integration
- Include artifact archiving
- Add performance tests
- Configure cleanup policies

Example addition for notifications:

```groovy
post {
    success {
        mail to: 'team@example.com',
             subject: 'Build Success',
             body: 'Build completed successfully'
    }
    failure {
        mail to: 'team@example.com',
             subject: 'Build Failed',
             body: 'Build failed. Check Jenkins logs.'
    }
}
```

## 🔗 Integration Points

### GitHub Integration
1. Add webhook to GitHub repository
2. Jenkins will auto-trigger on push
3. Comments builds on pull requests

### Docker Registry Integration
1. Configure credentials in Jenkins
2. Add push stage to Jenkinsfile
3. Build and push images

### Slack Integration
1. Install Slack plugin
2. Configure bot token
3. Add notification step to Jenkinsfile

## 📚 References

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)
- [Jenkins Configuration as Code](https://www.jenkins.io/projects/jcasc/)
- [Docker Plugin for Jenkins](https://plugins.jenkins.io/docker-plugin/)
- [GitHub Plugin for Jenkins](https://plugins.jenkins.io/github/)

## 💡 Next Steps

1. ✅ Start Jenkins with `docker-compose.jenkins.yml`
2. ✅ Access Jenkins at http://localhost:8080
3. ✅ Create pipeline job or use auto-created one
4. ✅ Trigger first build
5. ✅ Monitor pipeline execution
6. ✅ Configure GitHub webhook for automation
7. ✅ Customize notifications and deployments

## 📞 Support

For issues or questions:
- Check Jenkins logs: `docker logs mean-jenkins`
- Review Jenkinsfile syntax
- Verify Docker daemon access
- Check GitHub webhook delivery

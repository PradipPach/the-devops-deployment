# CI/CD Pipeline Documentation

Complete GitHub Actions CI/CD automation for the MEAN stack application.

## 📋 Workflows Overview

### 1. **CI/CD Pipeline** (`ci-cd.yml`)
Main continuous integration workflow triggered on push and pull requests.

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Jobs:**
- ✅ Backend tests & linting
- ✅ Frontend tests & Angular build
- ✅ Docker image builds
- ✅ Docker Compose validation
- ✅ Code quality scanning
- 📊 Pipeline summary report

**Status Badges:**
```markdown
![CI/CD Pipeline](https://github.com/PradipPach/the-devops-deployment/workflows/CI%2FCD%20Pipeline/badge.svg)
```

---

### 2. **Pull Request Checks** (`pr-checks.yml`)
Comprehensive PR validation workflow.

**Triggers:**
- Pull request to `main` or `develop`

**Jobs:**
- 🔍 Code linting & formatting
- 📊 Test coverage analysis
- 🔒 Security vulnerability scanning
- 🐳 Docker build validation
- ✓ Docker Compose validation
- 💬 Automated PR summary comment

**Coverage:**
- Uploads to Codecov for coverage tracking
- Trivy security scanning
- Automated PR feedback

---

### 3. **Docker Build & Push** (`docker-push.yml`)
Builds and publishes Docker images to GitHub Container Registry.

**Triggers:**
- Push tags (v*)
- Push to `main` branch
- Manual workflow dispatch

**Jobs:**
- 🐳 Build backend image
- 🐳 Build frontend image
- 📦 Push to ghcr.io
- ✓ Docker Compose validation

**Image Naming:**
- `ghcr.io/PradipPach/the-devops-deployment/mean-app-backend:TAG`
- `ghcr.io/PradipPach/the-devops-deployment/mean-app-frontend:TAG`

**Tags Generated:**
- `latest` (main branch)
- Branch name (e.g., `main`)
- Semantic version (e.g., `v1.0.0`)
- Commit SHA (e.g., `main-abc1234`)

---

### 4. **Integration & Performance Tests** (`test-integration.yml`)
Daily scheduled tests and performance baselines.

**Triggers:**
- Daily at 2 AM UTC
- Push to `main` branch
- Manual workflow dispatch

**Jobs:**
- 🧪 Integration tests with MongoDB
- 📈 Bundle size analysis
- 📊 Performance baseline
- 🐳 Docker Compose integration test
- 🔌 API endpoint verification
- 📋 Test summary report

---

### 5. **Release Management** (`release.yml`)
Automated release and version management.

**Triggers:**
- Git tags matching `v*` (e.g., `v1.0.0`)
- Manual workflow dispatch

**Jobs:**
- 🏷️ Create GitHub Release
- 🐳 Tag Docker images for release
- 📝 Generate changelog
- 📢 Publish release notes

**Features:**
- Automatic semantic versioning
- Docker image retagging
- Changelog generation
- Release notes artifact

---

### 6. **Deployment** (`deploy.yml`)
Deployment notifications and instructions.

**Triggers:**
- After successful Docker push
- Manual workflow dispatch

**Provides:**
- Deployment instructions
- Health check endpoints
- Quick start commands

---

## 🔧 Dependency Management (`dependabot.yml`)

Automated dependency updates with scheduled pull requests.

**Configured for:**
- 📦 npm backend dependencies
- 📦 npm frontend dependencies
- 🐳 Docker images (all services)
- 🔄 GitHub Actions

**Schedule:** Weekly (Mondays 3 AM - 7 AM UTC)

---

## 🚀 Usage Guide

### Triggering Workflows

**Push to main:**
```bash
git push origin main
→ Triggers: CI/CD, Docker Push, Integration Tests
```

**Create a pull request:**
```bash
git push origin feature-branch
→ Triggers: PR Checks
```

**Create a release:**
```bash
git tag v1.0.0
git push origin v1.0.0
→ Triggers: Release, Docker Push
```

### Monitoring Workflows

1. **GitHub Actions Dashboard:**
   - Navigate to: https://github.com/PradipPach/the-devops-deployment/actions

2. **View specific workflow:**
   - CI/CD: https://github.com/PradipPach/the-devops-deployment/actions/workflows/ci-cd.yml
   - Docker Push: https://github.com/PradipPach/the-devops-deployment/actions/workflows/docker-push.yml
   - PR Checks: https://github.com/PradipPach/the-devops-deployment/actions/workflows/pr-checks.yml

3. **Check Docker images:**
   - Registry: https://github.com/PradipPach/the-devops-deployment/pkgs/container/

### Environment Variables & Secrets

No additional secrets required. Uses default `GITHUB_TOKEN` for:
- Docker image push
- Release creation
- PR comments

---

## 📊 Pipeline Status

| Workflow | File | Trigger | Status |
|----------|------|---------|--------|
| CI/CD | `ci-cd.yml` | Push, PR | ![Badge](https://github.com/PradipPach/the-devops-deployment/workflows/CI%2FCD%20Pipeline/badge.svg) |
| PR Checks | `pr-checks.yml` | PR | - |
| Docker Push | `docker-push.yml` | Tag, Main | - |
| Integration | `test-integration.yml` | Daily, Dispatch | - |
| Release | `release.yml` | Tag, Dispatch | - |
| Deploy | `deploy.yml` | Docker Push | - |

---

## 🔐 Security

- ✅ Automated secret scanning (Trivy)
- ✅ Vulnerability scanning in PRs
- ✅ Dependabot security updates
- ✅ Signed commits recommended
- ✅ Branch protection rules recommended

---

## 📝 Recommendations

### Enable Branch Protection:
1. Go to: Settings → Branches
2. Add rule for `main`
3. Enable: Require status checks before merging
4. Select all workflows

### Configure Notifications:
- Email notifications in GitHub Settings
- Slack integration (optional)
- Microsoft Teams integration (optional)

### Monitor Dashboard:
- Check workflow runs regularly
- Review dependency updates
- Monitor security alerts

---

## 🛠️ Troubleshooting

**Workflow fails on push:**
- Check workflow logs: Actions → Select workflow → Failed run
- Common issues:
  - Npm install failures → Update dependencies
  - Docker build failures → Check Dockerfile syntax
  - Test failures → Run locally first

**PR checks timing out:**
- Increase timeout in workflow
- Check service health
- Verify Docker daemon is running

**Docker images not pushing:**
- Verify GitHub token has packages:write permission
- Check registry credentials
- Review push workflow logs

---

## 📞 Quick Links

- **Main Repo**: https://github.com/PradipPach/the-devops-deployment
- **Actions**: https://github.com/PradipPach/the-devops-deployment/actions
- **Packages**: https://github.com/PradipPach/the-devops-deployment/pkgs
- **Issues**: https://github.com/PradipPach/the-devops-deployment/issues
- **Releases**: https://github.com/PradipPach/the-devops-deployment/releases

---

## 📚 Related Documentation

- [Docker Compose Setup](../README.md)
- [Application README](../mean-app/README.md)
- [Nginx Configuration](../mean-app/nginx/README.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

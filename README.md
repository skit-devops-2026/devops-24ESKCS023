# Digital_Library

> Replace every angle-bracket placeholder below. The hygiene check in CI will
> fail until you do.

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS023 | Aditya Soni | adityasoni1377272-ship-it |

## About

A digital library is an online collection of books, research papers, and media stored in computer formats instead of physical paper.Users can search and read these materials remotely from any device using an internet connection.It makes learning and sharing knowledge fast and easy without needing to visit a physical building

## Tech stack

- Frontend: Html ,css, javascript
- Backend: Node.js
- Database: MongoDB

## Running locally

```bash
make install
make run
```

## Live URL

 once M5 is done. Until then, leave as is.

## Health endpoint

`GET /health` returns the running commit SHA. See `Makefile` and the milestone
sheet for why this is required.

## DevOps Workflow

This project follows a DevOps workflow using Git and GitHub for
version control, GitHub Actions for continuous integration, and
Jenkins for CI/CD automation.

The project will later be containerized and deployed as part of
the remaining DevOps milestones.
## Project Structure

- `.github/workflows` - GitHub Actions workflow
- `docs` - Project documentation
- `k8s` - Kubernetes configuration
- `monitoring` - Monitoring configuration
- `scripts` - Project scripts

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/skit-devops-2026/devops-24ESKCS023.git
cd devops-24ESKCS023
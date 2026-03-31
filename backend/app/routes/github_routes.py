from fastapi import APIRouter
from app.models.schemas import IssueCreate
from app.services.github_service import fetch_repositories, fetch_issues, create_issue

router = APIRouter()

@router.get("/repos")
async def get_repos():
    return await fetch_repositories()

@router.get("/issues")
async def get_issues(owner: str, repo: str):
    return await fetch_issues(owner, repo)

@router.post("/create-issue")
async def post_issue(issue: IssueCreate):
    return await create_issue(
        owner=issue.owner,
        repo=issue.repo,
        title=issue.title,
        body=issue.body,
        labels=issue.labels
    )

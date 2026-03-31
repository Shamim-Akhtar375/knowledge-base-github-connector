import httpx
from fastapi import HTTPException
from app.utils.config import settings

GITHUB_API_URL = "https://api.github.com"

def get_headers():
    if not settings.github_pat:
        raise HTTPException(status_code=500, detail="GitHub PAT is not configured server-side.")
    return {
        "Authorization": f"Bearer {settings.github_pat}",
        "Accept": "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28"
    }

async def fetch_repositories():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{GITHUB_API_URL}/user/repos?sort=updated&per_page=100",
            headers=get_headers()
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

async def fetch_issues(owner: str, repo: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{GITHUB_API_URL}/repos/{owner}/{repo}/issues?state=open&per_page=100",
            headers=get_headers()
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

async def create_issue(owner: str, repo: str, title: str, body: str = None, labels: list = None):
    payload = {"title": title}
    if body:
        payload["body"] = body
    if labels:
        payload["labels"] = labels
        
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{GITHUB_API_URL}/repos/{owner}/{repo}/issues",
            json=payload,
            headers=get_headers()
        )
        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

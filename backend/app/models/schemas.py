from pydantic import BaseModel
from typing import Optional, List

class IssueCreate(BaseModel):
    owner: str
    repo: str
    title: str
    body: Optional[str] = None
    labels: Optional[List[str]] = None

class Repository(BaseModel):
    id: int
    name: str
    full_name: str
    description: Optional[str] = None
    html_url: str

class IssueResponse(BaseModel):
    id: int
    number: int
    title: str
    state: str
    html_url: str
    body: Optional[str] = None

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.github_routes import router as github_router

app = FastAPI(title="Knowledge Base + GitHub Connector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, configure this appropriately
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(github_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Knowledge Base + GitHub Connector API"}

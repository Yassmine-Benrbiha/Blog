from fastapi import FastAPI
from app.server.routes.blog import router as BlogRouter

app = FastAPI()

app.include_router(BlogRouter, tags=["Blog"], prefix="/blog")


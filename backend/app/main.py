from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.user import router as user_router
from app.api.ticket import router as ticket_router

app = FastAPI(
    title="Real-Time Ticketing System API",
    description="A help desk and ticket management system built with FastAPI.",
    version="1.0.0",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(ticket_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Real-Time Ticketing System API 🚀",
        "docs": "/docs",
        "redoc": "/redoc",
    }
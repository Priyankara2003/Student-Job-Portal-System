from fastapi import FastAPI

app = FastAPI(title="Job Portal API")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Portal API"}

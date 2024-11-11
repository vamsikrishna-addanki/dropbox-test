# main.py

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import SessionLocal, init_db, FileMetadata
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React frontend to make requests
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Initialize the database on startup
@app.on_event("startup")
def startup():
    init_db()

# Dependency to get a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Directory to save uploaded files
UPLOAD_DIRECTORY = "./uploaded_files"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# Upload File Endpoint
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Check if the file already exists
    existing_file = db.query(FileMetadata).filter(FileMetadata.filename == file.filename).first()
    if existing_file:
        raise HTTPException(status_code=400, detail="File already exists")

    # Save file to disk
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Add file metadata to the database
    file_metadata = FileMetadata(filename=file.filename, filetype=file.content_type, filepath=file_path)
    db.add(file_metadata)
    db.commit()
    db.refresh(file_metadata)

    # Make sure the response is a 200 OK
    return {"filename": file.filename, "filetype": file.content_type, "path": file_path}


# List Files Endpoint
@app.get("/files/")
def list_files(db: Session = Depends(get_db)):
    files = db.query(FileMetadata).all()
    return [{"id": file.id, "filename": file.filename, "filetype": file.filetype} for file in files]

# Download File Endpoint
@app.get("/download/{file_id}")
def download_file(file_id: int, db: Session = Depends(get_db)):
    # Get file metadata from the database
    file_metadata = db.query(FileMetadata).filter(FileMetadata.id == file_id).first()
    if not file_metadata:
        raise HTTPException(status_code=404, detail="File not found")

    # Return file as response
    return FileResponse(path=file_metadata.filepath, filename=file_metadata.filename)

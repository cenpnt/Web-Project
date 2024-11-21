from passlib.context import CryptContext

# Configuration constants
UPLOAD_DIR = "uploads"
BASE_URL_BACKEND = "http://10.66.6.48:8000"
BASE_URL_FRONTEND = "http://10.66.6.48:3000"

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
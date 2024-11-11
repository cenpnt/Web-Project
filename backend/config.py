from passlib.context import CryptContext

# Configuration constants
UPLOAD_DIR = "uploads"
BASE_URL_BACKEND = "http://192.168.1.34:8000/"
BASE_URL_FRONTEND = "http://192.168.1.34:3000/"

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
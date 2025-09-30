# exam/firebase_config.py
import firebase_admin
from firebase_admin import credentials, firestore, auth

# Path to your downloaded service account key
cred = credentials.Certificate("exam/serviceAccountKey.json")

# Initialize the Firebase app (only once)
default_app = firebase_admin.initialize_app(cred)

# Firestore database client
db = firestore.client()


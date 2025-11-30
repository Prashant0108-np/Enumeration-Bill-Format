# exam/firebase_config.py
import firebase_admin
from firebase_admin import credentials, firestore, auth
import base64
import json
import os

# Read Base64 encoded Firebase key from environment variable
firebase_base64 = os.environ.get("FIREBASE_KEY")

if not firebase_base64:
    raise Exception("FIREBASE_KEY environment variable is missing!")

# Decode Base64 → JSON
firebase_json = json.loads(base64.b64decode(firebase_base64))

# Use decoded JSON as credential
cred = credentials.Certificate(firebase_json)

# Initialize Firebase app (only once)
default_app = firebase_admin.initialize_app(cred)

# Firestore database client
db = firestore.client()

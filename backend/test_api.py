import requests

BASE_URL = "http://127.0.0.1:8000"

# Register a broker
reg_payload = {
    "name": "Test Python Broker",
    "email": "py_broker@example.com",
    "password": "password123",
    "contact_no": "0771122334",
    "role": "Broker"
}

r = requests.post(f"{BASE_URL}/auth/register", json=reg_payload)
print("Register Status:", r.status_code)
print("Register Response:", r.json())

# Login
login_payload = {
    "email": "py_broker@example.com",
    "password": "password123"
}
r = requests.post(f"{BASE_URL}/auth/login", json=login_payload)
print("Login Status:", r.status_code)
token_data = r.json()
print("Login Response:", token_data)
token = token_data.get("access_token")

# Post a job
headers = {
    "Authorization": f"Bearer {token}"
}
job_payload = {
    "title": "Python Developer",
    "category": "IT",
    "location": "Remote",
    "salary": 1500.00,
    "description": "Looking for Python backend developer."
}
r = requests.post(f"{BASE_URL}/jobs", json=job_payload, headers=headers)
print("Post Job Status:", r.status_code)
print("Post Job Response:", r.json())

from flask import Flask, request, jsonify
import time
import json

app = Flask(__name__)

DATABASE_FILE = "users.json"  # Archivo para simular la base de datos

def load_users():
    try:
        with open(DATABASE_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_users(users):
    with open(DATABASE_FILE, "w") as file:
        json.dump(users, file)

ACCESS_LIMIT = 30  # Tiempo de acceso en segundos

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    users = load_users()

    if username in users and users[username]["password"] == password:
        if users[username]["accessed"]:
            return jsonify({"access": False, "message": "El acceso ya fue utilizado."})
        else:
            # Registrar el acceso y el tiempo
            users[username]["accessed"] = True
            users[username]["timestamp"] = time.time()
            save_users(users)
            return jsonify({"access": True, "message": "Acceso concedido."})
    else:
        return jsonify({"access": False, "message": "Credenciales inválidas."})

@app.route("/check-access", methods=["POST"])
def check_access():
    data = request.json
    username = data.get("username")

    users = load_users()

    if username in users:
        user = users[username]
        if user["accessed"]:
            current_time = time.time()
            elapsed_time = current_time - user["timestamp"]
            if elapsed_time > ACCESS_LIMIT:
                return jsonify({"access": False, "message": "El tiempo de acceso ha expirado."})
            else:
                return jsonify({"access": True, "remaining_time": ACCESS_LIMIT - elapsed_time})
    return jsonify({"access": False, "message": "Acceso denegado."})

if __name__ == "__main__":
    users = {
        "user1": {"password": "password123", "accessed": False, "timestamp": 0},
        "user2": {"password": "mypassword", "accessed": False, "timestamp": 0}
    }
    save_users(users)
    app.run(debug=True)

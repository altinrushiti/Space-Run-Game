from flask import Flask, render_template, request, jsonify
from flask_bcrypt import Bcrypt, check_password_hash
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'dein_geheimer_schluessel'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.root_path, 'storage', 'data.db')
db = SQLAlchemy(app)
login_manager = LoginManager(app)
bcrypt = Bcrypt(app)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    highScore = db.Column(db.Integer, nullable=False, default=0)


with app.app_context():
    db.create_all()


@login_manager.user_loader
def user_loader(user_id):
    return User.query.get(int(user_id))


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200


@app.route('/register', methods=['POST'])
def regiser_user():
    username = request.form.get('username')
    password = request.form.get('password')
    repeat_password = request.form.get('repeat-password')
    exists_user = User.query.filter_by(name=username).first()
    if not exists_user and password == repeat_password:
        password_hash = bcrypt.generate_password_hash(password).decode('utf8')
        user = User(name=username, password=password_hash)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'registerd'}), 201
    else:
        return jsonify({'message': 'registering failed'}), 400


@app.route('/update_score', methods=['PUT'])
def update_score():
    user = current_user
    data = request.json
    new_score = data.get('score')

    if new_score > user.highScore:
        user.highScore = new_score
        db.session.commit()
        return jsonify({'message': 'Score updated successfully'}), 200
    else:
        return jsonify({'message': 'Score not updated'}), 200


@app.route('/get_current_user', methods=['GET'])
def get_current_user():
    user = current_user
    return jsonify({'username': user.name,
                    'highScore': user.highScore})


@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    user = User.query.filter_by(name=username).first()

    if user and check_password_hash(user.password, password):
        login_user(user)  # Verwende die Flask-Login-Funktion
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Login failed'}), 401


@app.route('/delete', methods=['DELETE'])
@login_required
def delete_user():
    user = current_user
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Delete successful'}), 200


@app.route('/')
def main():  # put application's code here
    return render_template("index.html")


app.run(host='0.0.0.0', port=5000)

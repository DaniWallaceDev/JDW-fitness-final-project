from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Diseases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.String(120), unique=True, nullable=False)
    sintoms = db.Column(db.String(80), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<Diseases {self.kind}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.kind,
            "sintoms": self.sintoms
            # do not serialize the password, its a security breach
        }
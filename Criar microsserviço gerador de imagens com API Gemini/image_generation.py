from src.models.user import db
from datetime import datetime
import uuid

class ImageGeneration(db.Model):
    __tablename__ = 'image_generations'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(db.String(36), nullable=False, index=True)
    prompt = db.Column(db.Text, nullable=False)
    style = db.Column(db.String(50), default='realista')
    aspect_ratio = db.Column(db.String(20), default='square')
    image_url = db.Column(db.String(255), nullable=False)
    thumbnail_url = db.Column(db.String(255))
    file_size = db.Column(db.Integer)
    dimensions = db.Column(db.String(20))
    model_used = db.Column(db.String(100), default='gemini-2.0-flash-preview-image-generation')
    generation_time = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<ImageGeneration {self.id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'session_id': self.session_id,
            'prompt': self.prompt,
            'style': self.style,
            'aspect_ratio': self.aspect_ratio,
            'image_url': self.image_url,
            'thumbnail_url': self.thumbnail_url,
            'file_size': self.file_size,
            'dimensions': self.dimensions,
            'model_used': self.model_used,
            'generation_time': self.generation_time,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Session(db.Model):
    __tablename__ = 'sessions'
    
    session_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_activity = db.Column(db.DateTime, default=datetime.utcnow)
    generation_count = db.Column(db.Integer, default=0)
    default_style = db.Column(db.String(50), default='realista')
    default_aspect_ratio = db.Column(db.String(20), default='square')
    
    def __repr__(self):
        return f'<Session {self.session_id}>'
    
    def to_dict(self):
        return {
            'session_id': self.session_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_activity': self.last_activity.isoformat() if self.last_activity else None,
            'generation_count': self.generation_count,
            'default_style': self.default_style,
            'default_aspect_ratio': self.default_aspect_ratio
        }


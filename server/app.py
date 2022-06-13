import os
import urllib.request
from flask import Flask, request, redirect, jsonify
from werkzeug.utils import secure_filename
import spacy

from model import open_file
from flask_cors import CORS, cross_origin


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

UPLOAD_FOLDER = 'H:\Flask\server\data'

app = Flask(__name__)
CORS(app)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

skills=[]
experience=[]
education=[]
data = {"NAME": " ",
        "SKILLS": skills,
        "EMAIL": " ",
        "LINKEDIN": " ",
        "GRADUATION YEAR": " ",
        "EXPERIENCE": experience,
        "EDUCATION": education,
        "GITHUB": " "
        }


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/file-upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp
    file = request.files['file']
    if file.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
        nlp_ner = spacy.load('H:\Flask\server\model-best')
        filename = secure_filename(file.filename)
        # print(filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        tx = open_file(f'H:\Flask\server\data\{filename}')
        # print(tx)

        doc = nlp_ner(tx)
        # print(doc.ents)
        for ent in doc.ents:
            global data
            # print(ent.label_,ent.text)
            if ent.label_=='EDUCATION':
                    education.append(ent.text)
            if ent.label_=='EXPERIENCE':
                    experience.append(ent.text)
            if ent.label_=='SKILLS':
                    skills.append(ent.text)
            else:
                    data[ent.label_]=ent.text

        resp = jsonify(
            { 'result': data})
        resp.headers.add('Access-Control-Allow-Origin', '*')
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(
            {'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
        resp.status_code = 400
        return resp


if __name__ == "__main__":
    app.run(debug=True, port=5000)

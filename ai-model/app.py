from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from feature_extraction import extract_features
import os

app = Flask(__name__)
CORS(app)   # 👈 VERY IMPORTANT for frontend

# Load trained model
model = joblib.load("phishing_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL not provided"}), 400

    features = extract_features(url)
    prediction = model.predict([features])[0]
    confidence = model.predict_proba([features])[0].max()

    result = "PHISHING" if prediction == 1 else "SAFE"

    return jsonify({
        "url": url,
        "result": result,
        "confidence": round(confidence * 100, 2)
    })

# 👇👇👇 DEPLOY SECTION (LAST LINE)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)

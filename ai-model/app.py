from flask import Flask, request, jsonify
import joblib
from feature_extraction import extract_features

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True, port=5000)

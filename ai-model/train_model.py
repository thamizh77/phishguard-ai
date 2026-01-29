import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report
from feature_extraction import extract_features
import joblib

print("🔹 Loading dataset...")
data = pd.read_csv("phishing_dataset.csv")

# Features & labels
X = data["url"].apply(extract_features).tolist()
y = data["label"]

X = np.array(X)

# Train-test split (IMPORTANT)
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.3,
    random_state=42,
    stratify=y
)

# Feature scaling (VERY IMPORTANT)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
model = LogisticRegression(max_iter=2000)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("\n✅ Model Accuracy:", round(accuracy, 4))
print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

# Save model + scaler
joblib.dump(model, "phishing_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("\n💾 Model saved as phishing_model.pkl")
print("💾 Scaler saved as scaler.pkl")

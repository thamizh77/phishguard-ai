import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
from feature_extraction import extract_features
import joblib

print("🔹 Loading dataset...")
data = pd.read_csv("phishing_dataset.csv")

# Convert URLs → numeric features
X = np.array(data["url"].apply(extract_features).tolist())
y = data["label"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train model
model = LogisticRegression(max_iter=3000)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

# Save
joblib.dump(model, "phishing_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Model & scaler saved")

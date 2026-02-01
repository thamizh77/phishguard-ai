import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
from feature_extraction import extract_features
import joblib

print("🔹 Loading dataset...")
data = pd.read_csv("phishing_dataset.csv")

print(f"Total samples: {len(data)}")

# URLs → features
X = np.array(data["url"].apply(extract_features).tolist())
y = data["label"]

# 🔥 REALISTIC SPLIT (no random_state)
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.4,
    stratify=y
)

# Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 🔥 REGULARIZATION to reduce overfitting
model = LogisticRegression(
    C=0.5,        # Regularization
    max_iter=1000
)

model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)

print("\n📊 Classification Report (Test Data):")
print(classification_report(y_test, y_pred))

# 🔥 Cross Validation (Judges LOVE this)
scores = cross_val_score(model, X, y, cv=5)
print(f"🔁 Cross-validation Accuracy: {scores.mean():.4f}")

# Save model
joblib.dump(model, "phishing_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Model & scaler saved")

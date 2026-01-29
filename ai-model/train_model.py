import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from feature_extraction import extract_features
import joblib

# Load dataset
data = pd.read_csv("phishing_dataset.csv")

# Prepare features and labels
X = data["url"].apply(extract_features).tolist()
y = data["label"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# Accuracy
accuracy = accuracy_score(y_test, model.predict(X_test))
print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "phishing_model.pkl")
print("Model saved as phishing_model.pkl")

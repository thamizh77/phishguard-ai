import re

def extract_features(url):
    features = []
    features.append(len(url))                     # URL length
    features.append(url.count('.'))               # dots
    features.append(url.count('-'))               # hyphens
    features.append(url.count('@'))               # @ symbol
    features.append(url.count('/'))               # slashes
    features.append(1 if url.startswith("https") else 0)  # https check
    features.append(
        1 if re.search(r"(login|verify|free|bank|kyc|refund|alert)", url.lower()) else 0
    )
    return features

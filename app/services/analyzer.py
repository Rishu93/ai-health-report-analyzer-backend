import re

def analyze_report(text: str) -> dict:
    analysis = {}

    # Hemoglobin
    hb_match = re.search(r"Hemoglobin[:\s]*([0-9.]+)", text, re.IGNORECASE)
    if hb_match:
        hb = float(hb_match.group(1))
        if hb < 13.5:
            analysis["Hemoglobin"] = "Low"
        elif hb > 18.0:
            analysis["Hemoglobin"] = "High"
        else:
            analysis["Hemoglobin"] = "Normal"

    # WBC
    wbc_match = re.search(r"WBC.*?([0-9.]+)", text, re.IGNORECASE)
    if wbc_match:
        wbc = float(wbc_match.group(1))
        if wbc < 4.0:
            analysis["WBC"] = "Low"
        elif wbc > 10.0:
            analysis["WBC"] = "High"
        else:
            analysis["WBC"] = "Normal"

    # Platelets
    platelet_match = re.search(r"Platelet.*?([0-9.]+)", text, re.IGNORECASE)
    if platelet_match:
        platelets = float(platelet_match.group(1))
        if platelets < 150:
            analysis["Platelets"] = "Low"
        elif platelets > 410:
            analysis["Platelets"] = "High"
        else:
            analysis["Platelets"] = "Normal"

    return analysis

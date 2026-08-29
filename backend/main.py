import io
import os

import numpy as np
from PIL import Image

import torch
import segmentation_models_pytorch as smp

import albumentations as A
from albumentations.pytorch import ToTensorV2

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware


# ============================================================
# FASTAPI
# ============================================================

app = FastAPI(
    title="Corneal Ulcer Detection API",
    version="1.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# CONFIGURATION
# ============================================================

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

IMG_SIZE = 256

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "unetpp_resnet50_best_final.pth"
)


# ============================================================
# MODEL
# ============================================================

print("=" * 60)
print("LOADING CORNEAL ULCER MODEL")
print("=" * 60)

print("Device:", DEVICE)
print("Model path:", MODEL_PATH)
print("Model exists:", os.path.exists(MODEL_PATH))


model = smp.UnetPlusPlus(
    encoder_name="resnet50",
    encoder_weights=None,
    in_channels=3,
    classes=1,
    activation=None
).to(DEVICE)


if not os.path.exists(MODEL_PATH):

    raise FileNotFoundError(
        f"""
Model weights not found!

Expected location:
{MODEL_PATH}

Please put:
unetpp_resnet50_best_final.pth

inside the backend folder.
"""
    )


state_dict = torch.load(
    MODEL_PATH,
    map_location=DEVICE
)

model.load_state_dict(state_dict)

model.eval()

print("✅ Model loaded successfully")
print("=" * 60)


# ============================================================
# PREPROCESSING
# ============================================================

transform = A.Compose([
    A.Resize(
        IMG_SIZE,
        IMG_SIZE
    ),

    A.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    ),

    ToTensorV2()
])


# ============================================================
# PREDICTION
# ============================================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # --------------------------------------------------------
    # Read image
    # --------------------------------------------------------

    contents = await file.read()

    image = np.array(
        Image.open(
            io.BytesIO(contents)
        ).convert("RGB")
    )


    # --------------------------------------------------------
    # Preprocess
    # --------------------------------------------------------

    tensor = transform(
        image=image
    )["image"]

    tensor = (
        tensor
        .unsqueeze(0)
        .to(DEVICE)
    )


    # --------------------------------------------------------
    # Inference
    # --------------------------------------------------------

    with torch.no_grad():

        output = model(tensor)

        probability_map = torch.sigmoid(
            output
        )

        probability = (
            probability_map
            .mean()
            .item()
        )

        pred_mask = (
            probability_map > 0.5
        ).float()


    # --------------------------------------------------------
    # Ulcer area
    # --------------------------------------------------------

    pred_mask_np = (
        pred_mask
        .squeeze()
        .cpu()
        .numpy()
    )

    ulcer_pixel_ratio = (
        float(pred_mask_np.sum())
        /
        (IMG_SIZE * IMG_SIZE)
    )


    ulcer_area_percent = (
        ulcer_pixel_ratio * 100
    )


    # --------------------------------------------------------
    # Result
    # --------------------------------------------------------

    prediction = (
        "Ulcer Detected"
        if probability > 0.3
        else
        "No Ulcer"
    )


    return {

        "prediction": prediction,

        "confidence": round(
            probability * 100,
            2
        ),

        "ulcer_area_percent": round(
            ulcer_area_percent,
            2
        )
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {

        "status": "ok",

        "model":
            "UNet++ ResNet-50",

        "model_available":
            os.path.exists(MODEL_PATH),

        "device":
            str(DEVICE)
    }
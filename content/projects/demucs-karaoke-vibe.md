## Demucs Windows
Because of that, a **stable, reproducible path** on Windows is:
- Python **3.10**
- PyTorch **2.8.0 + cu126**
- TorchAudio **2.8.0 + cu126**
- TorchVision **0.23.0 + cu126**
- Demucs **4.0.1**

Create and activate a virtual environment

```powershell
py -3.10 -m venv .venv  
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

Install the **matching CUDA 12.6 builds** from the official PyTorch wheel index:

```powershell
pip install torch==2.8.0+cu126 torchaudio==2.8.0+cu126 torchvision==0.23.0+cu126 --index-url https://download.pytorch.org/whl/cu126
```

Install Demucs and helpers
```
pip install demucs==4.0.1 soundfile
```

Verify the environment
```python
python -c "import torch, torchaudio; print(torch.__version__); print(torchaudio.__version__); print(torch.cuda.is_available())"
```
Expected result:
`2.8.0+cu126`  

### Usage
```powershell
demucs -n htdemucs --two-stems=vocals "song.mp3"
```
The song will be located in 
```
./separated/htdemucs/<song>
```
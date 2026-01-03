# SponsorBlock With AI/ML
This will be moved to documentation site once finished.

- [x] SponsorBlock ML
- [x] NeuralBlock
YouTube Transcript API and file structure
- [x] SML
- [x] NB

- [x] Using Whisper AI (WhisperX)
- [x] convert to yt transcript compatible structure

- [x] Modify SML to accept custom media
- [x] Modify NB to accept custom media
- [ ] Benchmark existing small, base, large models
- [ ] train SML with custom data
- [ ] train NB with custom data
## SponsorBlock-ML
https://github.com/xenova/sponsorblock-ml
Clone the repo and install
```shell
python3 -m venv venv
./venv/scripts/activate
pip install -r requirements
python -m streamlit run app.py
```
The models in the webapp are downloaded automatically.
`./models/model-name`
Models are located on Hugging Face

YouTube transcripts are saved in `./transcripts/auto/*.json`

Cli Usage
```bash
python src/predict.py --video_id <id> --model_name_or_path
```
The program will download models and transcripts first if not available

The app must be execute in the root directory of the project.
When in cli mode `predict.py` has no option to adjust transcript type so it defaults to `auto`
## NeuralBlock
https://github.com/andrewzlee/NeuralBlock
Clone repo
```shell
python3 -m venv venv
./venv/scripts/activate
pip install -r reqreuiments.txt
```
An updated requirements are added. The versions must be same otherwise app won't run.
Update folder structure of `app`, by default the models are located in `./data/models` and app does not run.
```python
.
├── algorithms
│   ├── ...
├── application.py
├── Dockerfile
├── models
│   ├── nb_spot.h5
│   ├── nb_stream_fasttext_10k.h5
│   ├── tokenizer_spot_10k.json
│   └── tokenizer_stream_10k.json
├── static
│   └── ...
└── templates
    ├── ...
```
The app must be in in `./app` directory.
Default port `5000`

The app must run in `./app` working directory.

Neural web server has an API that respond only to GET requests and URL parameters
`/api/getSponsorSegments`
```bash
curl "http://10.10.120.71:5000/api/getSponsorSegments?vid=123456"
```
- accept parameter `vid` which is the video ID
Returns list of predicted sponsor spots
```json
{ "sponsorSegments": [
    [0.5,10.753],
    [84.707,98.74]
  ] }
```
`api/checkSponsorsegments`
```bash
curl "http://10.10.120.71:5000/api/checkSponsorSegments?vid=B821HqH-dWI&segments=545,585;696,723"
```
- `vid` videoID from YouTube
- `segments`, list of of `start, end` times separated by `;`
Return a list of probabilities that the segment is sponsor
```json
{"probabilities":[0.9968680739402771,0.0051942747086286545]}
```

Both apps can be "hijacked" with a customized json transcript and will predict.

## Audio Transcription AI
Requirements
- works in Nvidia GPU and fast
- future, work with CPU or Intel QSV
- word by word
- provide srt/vtt format
https://www.reddit.com/r/LocalLLaMA/comments/1brqwun/i_compared_the_different_open_source_whisper/
Whisper original
Hugging Face Whisper 7x
Insanely fast whisper
Faster Whisper 4x
Whisper X
Whisper cpp
Whisper timestamped
Whisperfile

WhisperX is good starting point.
https://github.com/m-bain/whisperX
Create the environment in conda first.
```shell
conda create --name whisperx python=3.10
conda activate whisperx
```
Install dependencies
```shell
conda install pytorch==2.0.0 torchaudio==2.0.0 pytorch-cuda=11.8 -c pytorch -c nvidia
pip install git+https://github.com/m-bain/whisperx.git
```

It needs to download models, downloads them to `~/.cache/huggingface/hub`, unless specified
https://developer.download.nvidia.com/compute/cudnn/9.3.0/local_installers/cudnn_9.3.0_windows.exe Download if that fails
```python
pip install ctranslate2==4.4.0
```
Fix broken dependency

Whisper downloads a lot of data models from Hugging Face, to set a custom location, use command prompt
```sh
setx HF_HOME "E:\hf"
```

Additional Works needed for diarize
First create hugging face account/token with read permission
https://huggingface.co/settings/tokens
Agree the terms and services in
https://huggingface.co/pyannote/speaker-diarization-3.1
https://huggingface.co/pyannote/segmentation-3.0

Both alignment and not-aligned transcription can be diarized.
However, diarized transcriptions can no longer be aligned.

**Custom Transcript Parser**
- accept srt and vtt
- load from json directly
- modularize
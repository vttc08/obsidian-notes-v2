Home
Getting started
- Overview
- Docker (recommended)
- Linux
- Windows
- Demucs Microservice (optional)
- Client configuration
- Backup/Restore and Upgrade
Features
- Queue page
- Media page
- Stage display
- Media Editing
Configuration
- Environment Configuration
- Settings Page
	- include most recommended user configuration
- Karaoke Processing
- WhisperX Lyrics
- Application Paths
- Downloads
- Stage
- Tools
- Custom Lyrics Providers
Tasks
- For Users
	- use a curated list of links
- Karaoke Tasks
	- queue a premade karaoke video
	- queue a song as another user
	- control queue remotely
- Create AI Karaoke
	- create karaoke from lyrics video
	- create karaoke from music video
	- modify existing video to create karaoke
	- separate vocals from premade karaoke video
	- fastest/best-case karaoke
	- add vocals to premade karaoke
- Stage & Branding
	- display QR code for scanning
	- add lobby loop
	- add customized branding to your karaoke event
	- iPhone/iPad as stage dispaly
- Server Administration
	- using Cloudflare tunnel or Tailscale to expose remote Demucs service
	- restrict usage to only users connected to guest Wi-Fi
	- use proxy server for downloading
	- server monitoring
	- manage server and media externally
	- resynchronize inaccurate WhisperX lyrics
	- adjust video duration and metadata
	- modernize CDG formats
Troubleshooting > troubleshooting/index.md
- application bind port
- vocal separation very slow
- yt-dlp fails to download
- iOS playback issues
- WhisperX bad synchronization
- Cannot find lyrics
- Connectivity to Demucs failed
- Inconsistent lines in karaoke
Deployment
- Recommended Deployment

User facing readme
DMKaraoke
image
DMKaraoke is a lightweight web application for home karaoke. It uses machine learning to separate the vocals and create word-by-word synced lyrics. The application is **completely free**, with **no advertisements**, **zero cloud subscription fees** and it creates karaoke on your own device.  

Table of Content
- quick start
- features
- comparison
- contribution
- license

Quick Start
This section is meant to be a very quick guide to get it running fast for most people with mostly default settings, for detailed configuration and usage, please review the [detailed installation guide](https://vttc08.github.io/demucs-karaoke-app/getting-started/overview/)in the documentation.
Karaoke App Only
For a typical Linux home server setup, Docker installation is recommended and it's listed here.
1. download docker compose and .env.example
```bash
wget https://raw.githubusercontent.com/vttc08/demucs-karaoke-app/refs/heads/main/compose.yml
wget https://github.com/vttc08/demucs-karaoke-app/blob/main/.env.example
```
2. prepare the environment and folders
```bash
mkdir -p data
mv .env.example .env
```
- application runs as non-root user by default, therefore data folder must be made beforehand
- you can change the `user: uid:gid` to match your host permission
3. configure environments using a text editor `vim`, `nano`
- please review the both `environment` in `compose.yml` and `.env`, the default configuration should be sufficient for most use cases
> Note: Musixmatch and LastFM token is a requirement to use this application, otherwise lyrics functionality will be degraded.
- [LastFM Token](https://www.last.fm/api/authentication)
- Musixmatch Token (desktop app required): [follow this guide](https://spicetify.app/docs/faq#sometimes-popup-lyrics-andor-lyrics-plus-seem-to-not-work)
3. Start the application
```bash
docker compose up # -d to start in the background and use docker compose logs -f
```
5. configure admin user and default presets
```bash
docker compose exec -it karaoke python scripts/admin_user.py create --username admin # enter your password
docker compose exec -it karaoke python scripts/default_presets.py
```
Optional: [configure stage loop](link to be added later)
You should be able to search, download or queue existing karaoke songs.
Demucs/WhisperX Service
For advanced features such as vocal separation and karaoke lyrics timing, Demucs service is required. This service can be installed on different computer, however, Nvidia GPU is preferred for CUDA acceleration, CPU only mode will work but it's slower.
> Note: I do not have a Linux machine with Nvidia graphics, therefore the steps are only tested on Windows, if you have experience running GPU accelerated machine learning in Linux or Docker, feel free to test and contribute.

Collapsed section: installing Demucs service
1. Install Python [3.10](https://www.python.org/downloads/release/python-3100/)
- only Python 3.10 has been tested and it works with all ML dependencies, newer Python versions may not work
- you can also try using `uv` or `conda`, as long as you have a working virtual environment which can run `whisperx` and `demucs`, the application should run
1. Download the code
```powershell
git clone https://github.com/vttc08/demucs-karaoke-app
```
- if Git is not available, you can download and extract as zip, and open the resulting folder in PowerShell
3. Install dependencies
```powershell
py -3.10 -m venv .venv  
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```
Download [PyTorch](https://pytorch.org/get-started/locally/)
```powershell
pip install torch==2.8.0+cu126 torchaudio==2.8.0+cu126 torchvision==0.23.0+cu126 --index-url https://download.pytorch.org/whl/cu126
```
- choose CPU is your GPU doesn't support CUDA
Project dependencies
```powershell
cd demucs-karaoke-app # the location where you downloaded the code
cd demucs_svc
pip install -r requirements.txt
```
4. Run the application
```powershell
uvicorn.exe app:app --host 0.0.0.0 --port 800
```
5. Verify application health
PyTorch
```powershell
python -c "import torch, torchaudio; print(torch.__version__); print(torchaudio.__version__); print(torch.cuda.is_available())"
```
Webapp
```powershell
(curl.exe -fsSL http://localhost:8002/health | ConvertFrom-Json).status #ok
(curl.exe -fsSL http://localhost:8002/health | ConvertFrom-Json).supported_backends # demucs sherpa_spleeter
```

Using conda

Collapsed section: configuration web interface

Navigate to [http://application:8000/login](http://application:8000/login) or the IP address (and baseUrl if configured) of the server running the main app, login and then navigate to [/settings](http://application:8000/settings)

Under Karaoke Processing, enter the IP address of the server you just installed Demucs service on.
- the main app server must be able to reach Demucs, check [troubleshooting](link updated later) if it cannot
- if the Demucs service is running on another network, you can use [Tailscale or Cloudflare Tunnels](to be linked later) for reachability

Scroll down to the bottom and click `Check Demucs`.

For more Demucs related configuration, please refer to [configuration/Karaoke Processing](to be linked later)

Clients
You'll need preferably a Desktop computer that is capable of displaying HDMI out to a video display and output sound, the quickstart will not cover complex karaoke AV setup. Modern web browser such as Chrome, Edge, Firefox will work. 

Android is also supported, and can display the stage. For iOS devices, multi-track audio is not supported, therefore iDevices cannot playback instrumental and vocals simultaneously. For more [iOS device limitations and workarounds](to be linked later).

Feature
	User Queues: mobile friendly page for searching and adding songs with real-time updates
	Download Videos and Lyrics: powered by YouTube library, Musixmatch and more, choose any karaoke style
	Flexible Architecture: decouple heavy ML dependencies, keeping the main application lightweight and functional suitable for most deployments
	AI/ML Karaoke Processing: remove vocals from songs (Demucs) and generate word by word karaoke timing (WhisperX)
	Customizable Karaoke Display: change lyrics font, style and display on stage
	Bring Your Own Media: upload your own songs/videos for AI/ML karaoke processing
	Media Editor: basic video trimmer and subtitle editor for fixing minor karaoke inconsistencies
	Highly Configurable: preconfigured with sensible default with fine tuning and scripting options
	Multilingual: support English, Chinese and more for user interface and lyrics display 

		Table: standard YouTube karaoke, lyrics video + vocal removal, immersive (MV + lyrics)  

Comparison
Why not YouTube karaoke (Sing King, Musisi, Zoom)?
There are many applications which also uses YouTube to display Karaoke, the limitations of simple YouTube video 
not all songs have premade karaoke version, especially non-English songs
lyric styles and branding not customizable
turning on/off vocal backing tracks for practice
As long as there's an audio and lyrics, this app can make karaoke tracks out of it

Translation
Currently, the application is translated in English, simplified/traditional Chinese and French, while the documentation is translated to simplified Chinese only. You can help translating.
The translation files are located in `locales/` as `<language_code>.json`, containing JSON key value pairs of UI string and translated strings.
```json
  "lyrics.help_default": "Search or upload lyrics to continue.",
```
Create a new file and add your translated strings. Please ensure all keys are translating before creating a pull request.

When completed, run the following commands to validate all keys are translated.
```bash
uv run pytest tests/routes/pages.py::test_locale_catalogs_have_matching_keys
uv run python scripts/audit_i18n.py --check
```

Modifying translation strings are welcomed too.

Development
To add new features or fix bugs, please create a new branch.
```bash
git checkout -b feat/my-feature
```
The project uses `uv` for dependency management. Refer to [Setup](https://github.com/vttc08/demucs-karaoke-app/blob/dev/README.md#setup) for configuring the environment with dependencies.
- the above link links to the official README.md link you'll probably have to change it to README.dev.md
Run pytest before commit or pull request
```bash
uv run pytest
```
When making a pull request, select the base branch `dev` instead of `main`. 

For AI agents.
Please refer to the following files, the `README.md` is intended to be user-facing instructions.
- README.dev.md
- AGENTS.md
- ARCHITECTURE.md
- SCHEMA.md
- DEMUCS.md
- all relevant markdown files in docs/

License MIT
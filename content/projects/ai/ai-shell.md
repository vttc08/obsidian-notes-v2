https://gb-docs.snaily.top/
Gemini-Balance
Docker compose
```yaml
services:
  gemini-balance:
    image: ghcr.io/snailyp/gemini-balance:latest
    container_name: gemini-balance
    restart: unless-stopped
    ports:
      - "9001:8000"
    volumes:
      - ~/docker/gemini-balance/data:/app/data
    env_file:
      - .env
    healthcheck:
      test: ["CMD-SHELL", "python -c \"import requests; exit(0) if requests.get('http://localhost:8000/health').status_code == 200 else exit(1)\""]
      interval: 1800s
      timeout: 5s
      retries: 1
      start_period: 20s
```
Content of `.env` file
```
DATABASE_TYPE=sqlite
SQLITE_DATABASE=default_db
API_KEYS=[""]
ALLOWED_TOKENS=["sk-123456"]
```
- this is the MVP config 
OpenAI
```http
http://10.10.120.12:9001/v1/chat/completions
```

Python
https://github.com/mceck/shy-sh
```bash
python3 -m venv venv
. venv/bin/activate
pip install shy-sh
```
Configuration in `~/.config/shy/config.yaml`, similar all chat history are stored here
```yaml
language: ''
llm:
  agent_pattern: flow
  api_key: sk-123456
  base_url: http://10.10.120.12:9001/v1
  name: gemini-2.5-flash-lite
  provider: openai
  temperature: 0.0
sandbox_mode: false
```
- the `v1` is needed to add the the path to be compatible with gemini-balance
To execute
```bash
~/venv/bin/shy 
```
or add to `.bash_aliases`
```bash
alias shy="~/venv/bin/shy"
```

Pure Bash
https://github.com/Hezkore/bash-ai
```bash
curl -sS https://raw.githubusercontent.com/hezkore/bash-ai/main/install.sh | bash
```
The config is located at `~/.config/bai.cfg`
```
key=sk-
api=http://10.10.120.12:9001/v1/chat/completions
model=gemini-2.5-flash-lite
```
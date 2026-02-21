# Movie Renamer — Radarr Orchestrator

A small orchestration design to reliably move, rename, and post-process movies downloaded by Radarr/Nzbget. The goal is to perform IO-heavy operations on a fast NVMe scratch area, keep files hidden from media indexers (Jellyfin) until processing completes, and then atomically move the processed files to the main HDD with Radarr API updates.

## Goals
- Keep downloads on SSD (`/mnt/nvme/...`) for fast processing and low latency.
- Avoid exposing partial downloads to Jellyfin by keeping them off the `data*` mount until processing completes.
- Run heavy IO (MKVMerge, muxing, subtitle cleanup) during off-peak power rates and before SnapRAID sync windows.
- Use Radarr's API to update library paths after moving files to the HDD.

## High-level flow
1. Radarr/Nzbget downloads to an NVMe scratch folder (example: `/mnt/nvme/scratch`).
2. A scheduled process (systemd timer) or queue consumer picks up completed downloads and runs post-processing on SSD:
	- remove unused audio/commentary tracks
	- merge/mux MKV as needed (using MKVMerge)
	- add or replace QC'd subtitles
3. Once processed, the orchestrator requests Radarr to move/update the movie path (via Radarr API) to the final HDD location (e.g. `/mnt/data/Movies/...`).
4. The move is executed (Radarr's move or a safe copy/move), and the orchestrator polls Radarr's `/command` endpoint until the move completes successfully.

This approach minimizes HDD IO during peak power periods and prevents partially-processed files from appearing in Jellyfin.

## Current implementation notes
- Radarr and Nzbget are configured with path mappings so downloads land on the host NVMe share.
- Post-processing is performed inside a constrained Docker/webtop environment (scripts call into a small Python utility).
- The Python utility performs renaming and moves only when the final destination is on the `data*` mount; otherwise it accepts a path to process.

## Input handling and orchestration rules
- If the provided path is already under `/mnt/data*`, pass it directly to the Python mover which will perform an (almost) instant move and renaming.
- If the path is not under `/mnt/data*`, prompt for the intended `data` destination (e.g. `data/data2/...`) and generate a Radarr move request.
- A YAML manifest describing the move (id, qualityProfileId, target path) is written to a queue folder for sequential processing by a single worker to avoid concurrent moves.

## YAML manifest example
```yaml
id: 689
qualityProfileId: 1
path: "/mnt/data/Movies/Movie (2014)"
```

Worker behavior:
- Read manifests from the queue folder in FIFO order.
- For each manifest: build the Radarr move request, call the Radarr API, poll `/api/command` until `status: completed` and `result: successful` (or log/alert on failure), then delete the manifest.

## Queueing MKVMerge and other tasks
- Tasks that should run later (e.g., heavy MKVMerge) can be written to a `.queue` file with a simple format:
	1. Docker run command
	2. Files to delete after successful run
	3. Source folder
	4. Destination slug

An orchestrator consumes `.queue` files, executes commands, deletes originals as required, and emits Radarr YAML manifests for subsequent moves.

## Configuration & Path mappings
- Example Docker mounts:
	- Nzbget: `/mnt/nvme/share:/data`
	- Radarr: `/mnt/nvme/share:/ssd`
- Radarr path mapping example:
	- remote path: `/data/nzbget`
	- local path: `/ssd/nzbget`
	- backlog/staging: `/ssd/scratch` (host: `/mnt/nvme/share/scratch`)

When setting paths programmatically in Radarr, avoid trailing slashes.

## Edge cases & error handling
- Long-running moves: implement reasonable timeouts and manual review for stuck commands.
- Subtitles and related files: ensure all sidecar files (subtitles, covers) are moved together.

## Todos (status)
- Radarr/Nzbget wiring
	- [x] Add `/mnt/nvme/share/scratch` to Radarr
	- [x] Add the path to Nzbget
	- [x] Configure path mappings
	- [x] Configure Nzbget downloads

- Radarr API integration
	- [x] Environment + YAML output
	- [x] Query movies for a matching path and collect `movieId`, title, `qpid`
	- [x] Generate new destination path from final slug
	- [x] Send move request and poll `/api/command` until success

- Queue/MKVMerge orchestration
	- [x] Implement `.queue` consumer service (run commands, clean up files)
	- [x] Add optional scheduling for off-peak execution (respect BCHydro reduced rate and SnapRAID windows)

## How it runs
- A systemd timer triggers a small controller script periodically (or on demand) to scan the NVMe scratch folder for completed downloads and enqueue processing manifests.
- A single worker consumes manifests sequentially and performs Radarr API moves to ensure no conflicting updates.

## Next steps / Improvements
- Integrate Bazarr for subtitle automation during the SSD processing stage.

# A rtpMIDI and Web-based Remote Control for your Panasonic-Ramsa WR-DA7 Mixer

## Installation:

- Clone Repo
- Install Dependencies (Note: When using linux or OS X you need also cmake and cpp!)
> npm install
- Insert your local machines IP Address into config.json
- Aaand start
> nodejs main.js
- If this is not working for you use
> node main.js

## Usage:
- Start the application
> nodejs main.js
- Connect your DA7 via a physical MIDI Interface to an Mac or OS X Machine (i'm pretty sure there was also an rtpMIDI implementation for *nix, but i'm not sure)
- Open your Network MIDI settings
- Create a new session
- add the WR-Remote Device to your session (if it's not showing up add it manually, port is 5008)
- virtually crosswire RX (Network) -> TX (Physical) and TX (Physical) to RX (Network) (i'm using ableton live for this (monitoring the midi inputs to the midi outputs for each other) but there are other ways)
- open your webbrowser
- navigate to http://ip.of.the.machine.the.remotecontrol.script.runs.on/
- profit

### NOTE: If the software doesn't an existing or valid buffer file (like on the first startup) every Fader will be set to 0 and the channel will be turned off. So, when connecting you should probably take a Snapshot BEFORE you connect the remote and load it again AFTER the remote was successfully connected! otherwise the remote and the physical console will be out of sync, but once you touch a control on the physical console/remote control THIS control will be resynced - overwriting the previous setting.
## Non-functional requirements

- automate non-root udev priviledge for Linux distros
  - write high priority `/etc/udev/rules.d/99-vsconnect-{TELEMETRY_USER_ID}.rules` file
  - `sudo udevadm control --reload-rules`

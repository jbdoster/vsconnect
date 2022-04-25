export const Environment = {
  Environment: {
    permissions: {
      linux: {
        udev: {
          RULES_TEMPLATE_STRING: `SUBSYSTEM=="usb", MODE="0660", GROUP="plugdev"`,
        },
      },
    },
  },
};

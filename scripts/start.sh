#! /usr/bin/env bash

chmod +x "$(pwd)/scripts/setup.sh" && $TERMINAL -x  sudo bash -c "$(pwd)/scripts/setup.sh; exec bash"
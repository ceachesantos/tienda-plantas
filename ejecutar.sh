#!/bin/bash
xterm -e "cd /home/christian/grupoB-plantas/administrador/servidor ; npm run dev ; read" &
xterm -e "cd /home/christian/grupoB-plantas/administrador/cliente ; ng serve --port 3000 ; read" &
xterm -e "cd /home/christian/grupoB-plantas/compras/servidor ; npm run dev ; read" &
xterm -e "cd /home/christian/grupoB-plantas/compras/cliente ; ng serve --port 3001 ; read" &
xterm -e "cd /home/christian/grupoB-plantas/usuario/servidor ; npm run dev ; read" &
xterm -e "cd /home/christian/grupoB-plantas/usuario/cliente ; ng serve --port 3002 ; read" &

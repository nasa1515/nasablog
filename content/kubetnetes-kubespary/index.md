---
emoji: π€¦ββοΈ
title: "[Kubernetes] - Kubernetes νκ²½κ΅¬μ± on GCP Using KubeSpary"
date: "2021-06-29 00:07:10"
author: nasa1515
tags: DevOps CLOUD
categories: DevOps CLOUD
---


λ¨Έλ¦¬λ§  

μΏ λ²λ€ν°μ€ νκ²½μ κ΅¬μ±νλ λ°©λ²μ μ¬λ¬κ°μ§κ° μ‘΄μ¬ν©λλ€ μλ²λ₯Ό μ€λΉνλ λ°©λ²μ λν μ¬λ¬ κ°μ§κ° μκ² μ§λ§  
κ°μ₯ μ½κ² μκ°ν΄λ³Ό μ μλ κ±΄ ``VirtualBox`` μ ``Vagrant`` λ₯Ό μ΄μ©ν ``λ‘μ»¬ VM``λ‘ κ΅¬μ±νλ κ² μλλ€.   
νμ§λ§ μ΄λ² ν¬μ€νΈμμλ GCP STUDY + Kubernetes STUDY κ²Έ GCPλ‘ μ§ννμ΅λλ€.    
μ¬μ€ GCP λ¬΄λ£ ν¬λ λ§μ΄ μκΉμ΄ λ§μμ΄ λ ν¬κΈ΄ νμ΅λλ€.

   
---

## β μ¬μ μ€λΉ  

* μΏ λ²λ€ν°μ€λ 3κ°μ λ§λ€ μλ‘μ΄ λ²μ μ΄ λ¦΄λ¦¬μ¦ λκ³  ν΄λΉ λ²μ μ 9κ°μ λμ λ²κ·Έμ λ³΄μ μ΄μλ₯Ό μμ νλ ν¨μΉκ° μ΄λ£¨μ΄ μ§λλ€.  


* μ΄λ² ν¬μ€νΈμ κ΅¬μ±ν  λΈλλ ``Master λΈλ νλ``μ ``Worker λΈλ μΈ κ°``λ‘ μ΄ ``λ€ κ°``μ μλ²κ° νμν©λλ€.

* λΈλμ μ΅μ μκ΅¬ μ¬μμ λ€μκ³Ό κ°μ΅λλ€.


    |ν­λͺ©|μ¬μ|
    |---|-------|
    |CPU|	1 CPU μ΄μ
    |λ©λͺ¨λ¦¬|	2 GB μ΄μ
    |OS|	CentOS 7, RHEL 7, Ubuntu 16.04+ etc.

<br/>


λν κ° μλ²λ λ€μ μ‘°κ±΄μ λ§μ‘±ν΄μΌ ν©λλ€.

* κ° λΈλκ° μλ‘ ``λ€νΈμν¬ μ°κ²°``λμ΄ μμ΄μΌ ν©λλ€.
* κ° λΈλλ λ€μ ``μ λ³΄κ° κ²ΉμΉμ§ μμμΌ`` ν©λλ€.

    ```cs
    hostname: hostname
    MAC address: ip link λλ ifconfig -a
    product_uuid: sudo cat /sys/class/dmi/id/product_uuid
    ```

<br/>

* κ° λΈλκ° μ¬μ©νλ ``ν¬νΈ``μλλ€. ``κ° ν¬νΈλ λ°©νλ²½μμ λͺ¨λ νμ© λμ΄`` μμ΄μΌ ν©λλ€.

    |λΈλ	|νλ‘ν μ½|	λ°©ν₯|	ν¬νΈ λ²μ|	λͺ©μ |	λκ° μ¬μ©?|
    |--|--|--|--|:-----:|:-----:|
    |Master|	TCP|	Inbound|	6443|	Kubernetes API server|	All
    |Master|	TCP|	Inbound|	2379-2380|	etcd server client API|	kube-apiserver, etcd
    |Master|	TCP|	Inbound|	10250|	Kubelet API	|Self, Control plane
    |Master|	TCP|	Inbound|	10251|	kube-scheduler|	Self
    |Master|	TCP|	Inbound|	10252|	kube-controller-manager|	Self
    |Worker|	TCP|	Inbound|	10250|	Kubelet API	|Self, Control plane
    |Worker|	TCP|	Inbound|	30000-32767|	NodePort Services|	All|

<br/>

---

## β κ΅¬μ± (Install) 

**κ΅¬μ± μ  μλ΄**

 ``GCP``μλ μ΄λ―Έ ``Kubernetes Engine``λ μ΄λ¦μΌλ‘ μΏ λ²λ€ν°μ€λ₯Ό μ¬μ©ν  μ μλ μλΉμ€λ₯Ό μ κ³΅νκ³  μμ΅λλ€.

![μ€ν¬λ¦°μ·, 2020-08-20 12-34-57](https://user-images.githubusercontent.com/69498804/90713985-91cef580-e2e1-11ea-98f2-09c7e0f72c9f.png)

<br/>

μ€μ  ν΄λΉ λ©λ΄μ λ€μ΄κ°λ³΄λ©΄ μ΄λ κ² μ€μΉ μμ΄ λ°λ‘ ν΄λ¬μ€ν°λ₯Ό λ§λ€ μ μμ΅λλ€.

![μ€ν¬λ¦°μ·, 2020-08-20 12-36-07](https://user-images.githubusercontent.com/69498804/90714040-ba56ef80-e2e1-11ea-91a7-51616910e81e.png)

νμ§λ§ μ΄λ² ν¬μ€νΈμμλ μΏ λ²μ€νλ μ΄λ₯Ό μ΄μ©ν κ΅¬μ±λ°©λ²μ ν¬μ€ν ν  κ²μ΄κΈ° λλ¬Έμ ν΄λΉ μλΉμ€λ λκΈ°κ² μ΅λλ€.

<br/>

---

### Kubespray λ‘ νκ²½ μ€μ νκΈ°


<br/>

``GCP Console``μ μ μ ν μλ SpecμΌλ‘ 4κ°μ Instanceλ₯Ό μμ±ν©λλ€.  [μΈμ€ν΄μ€ κ΅¬μ± λ°©λ²] : ["GCPν¬μ€νΈ"!!!](https://nasa1515.tech/gcp-first/)  
  
![μ€ν¬λ¦°μ·, 2020-08-20 14-20-27](https://user-images.githubusercontent.com/69498804/90719826-4e2fb800-e2f0-11ea-94d4-b8f9dc1d31f4.png)

<br/>

μλμ²λΌ μΈμ€ν΄μ€ 4κ°λ₯Ό μμ±ν΄μΌ ν©λλ€.

![μ€ν¬λ¦°μ·, 2020-08-20 14-24-55](https://user-images.githubusercontent.com/69498804/90720126-eded4600-e2f0-11ea-963e-c7d5203642b8.png)

<br/>

---

### μ€μΉ μ  μ¬μ  μμ

μ¬μ  μμμ master, node1, node2, node3 λͺ¨λ λμΌνκ² μ§νν©λλ€.

<br/>

μ¬μ  μμμ λͺ¨λ  κ³Όμ μ ``root`` κΆνμΌλ‘ μ§νν©λλ€.

```cs
sudo su -
```

<br/>
<br/>

μ€μ λ©λͺ¨λ¦¬ μ¬μ© μ€μ§  

``Swap`` μ λμ€ν¬μ μΌλΆ κ³΅κ°μ λ©λͺ¨λ¦¬μ²λΌ μ¬μ©νλ κΈ°λ₯μλλ€.  
``Kubelet`` μ΄ μ μ λμν  μ μλλ‘ swap λλ°μ΄μ€μ νμΌ λͺ¨λ ``disable`` ν©λλ€.

```cs
swapoff -a
echo 0 > /proc/sys/vm/swappiness
sed -e '/swap/ s/^#*/#/' -i /etc/fstab
```

* ``swapoff -a``: paging κ³Ό swap κΈ°λ₯μ λλλ€.  
* ``/proc/sys/vm/swappiness``: μ»€λ μμ±μ λ³κ²½ν΄ swapμ disable ν©λλ€.  
* ``/etc/fastab``: Swapμ νλ νμΌ μμ€νμ μ°Ύμ disable ν©λλ€.

<br/>
<br/>

κ° λΈλμ ν΅μ μ μννκ² νκΈ° μν΄ ``λ°©νλ²½μ ν΄μ ``ν©λλ€.

```cs
systemctl disable firewalld
systemctl stop firewalld
```

<br/>
<br/>

``SELinux(Security-Enhanced Linux)`` μ’λ£. μ»¨νμ΄λκ° νΈμ€νΈμ νμΌμμ€νμ μ μν  μ μλλ‘ ν΄λΉ κΈ°λ₯μ κΊΌμΌ ν©λλ€.

```cs
setenforce 0
sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```

<br/>
<br/>

``RHEL`` κ³Ό ``CentOS 7``μμ ``iptables`` κ΄λ ¨ μ΄μκ° μμ΄ ``μ»€λ λ§€κ°λ³μ``λ₯Ό λ€μκ³Ό κ°μ΄ μμ νκ³  μ μ©ν©λλ€.

```cs
cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system
```

<br/>
<br/>

``br_netfilter λͺ¨λ``μ ``νμ±ν``ν©λλ€. ``modprobe br_netfilter λͺλ Ήμ΄``λ‘ ν΄λΉ λͺ¨λμ λͺμμ μΌλ‘ ``μΆκ°``ν©λλ€.

```cs
$ modprobe br_netfilter
$ lsmod | grep br_netfilter [νμΈ]
```
        
<br/>

---

### μ€μΉ μ§ν

μ€μλΈμ μΈλ²€ν λ¦¬λ SSH(RSA) κΈ°λ°μΌλ‘ λμνλ―λ‘ VMλΌλ¦¬μ κ³΅κ° ν€λ₯Ό κ³΅μ ν΄μ€μΌ ν©λλ€.

κ° μΈμ€ν΄μ€ λ³λ‘ ``νΈμ€νΈ λ€μ``μ μ€μ ν΄μ€λλ€.  
    μ¬μ€ GCPλ μλμ μΌλ‘ μΈμ€ν΄μ€μ μ΄λ¦μ λ°μμ€μ§λ§ GCPκ° μλ μ§μ  κ΅¬μ±μ ν  κ²½μ°μλ νΈμ€νΈλ€μμ λͺ¨λ λ°κΏμ£Όμ΄μΌ ν©λλ€.

```cs
[h43254@nasa-node3 ~]$ hostnamectl set-hostname nasa-node3
[h43254@nasa-node3 ~]$ hostname
nasa-node3
```

<br/>
<br/>

``MASTER`` μΈμ€ν΄μ€μ HOST μ λ³΄ λ° SSH κΆν μ€μ μ ν©λλ€. GCPμμλ ν  νμκ° μμ§λ§ μ§μ  κ΅¬μ±μμλ νμν©λλ€.


``/etc/hosts``μ κ° λΈλ λ±λ‘

```cs
[h43254@nasa-master ~]$ sudo cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.178.0.2      nasa-master
10.178.0.4      nasa-node1
10.178.0.5      nasa-node2
10.178.0.3      nasa-node3
```

<br/>
<br/>

``ssh μ μ  κΆν μ€μ ``μ μν΄ ``masterμλ²``μ ``/etc/sudoers`` νμΌμ λ΄μ©μ μΆκ° 

![μ€ν¬λ¦°μ·, 2020-08-21 09-49-17](https://user-images.githubusercontent.com/69498804/90839950-b5eb0f00-e393-11ea-94a3-b7dabd3c2d51.png)

h43254λΌλ μ μ μ λν΄μ ν¨μ€μλλ₯Ό λ¬Όμ΄λ³΄μ§ μκ² λ€λ μ€μ μλλ€.

<br/>
<br/>

``κ³΅κ°ν€ μ€μ ``μ μν΄μ SSH λ²νΌμ λλ¬μ ``nasa-master``μ μ μν΄ ``ssh-keygen -t rsa``λ₯Ό μλ ₯. κ³΅κ°ν€λ₯Ό μμ±ν©λλ€.  

(κ·Έ μΈμ μ΅μμ Enterλ₯Ό λλ¬μ κΈ°λ³Έκ°μ λ£μ΄μ€λλ€.)

```cs
[h43254@nasa-master ~]$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/h43254/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/h43254/.ssh/id_rsa.
Your public key has been saved in /home/h43254/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:sr6RS6MW/ESkXfbVBi9LTdRSfPm3a2F7VrC9K8e93mc h43254@nasa-master
The key's randomart image is:
+---[RSA 2048]----+
|            .+o+o|
|      . o   .++.+|
|     + o . .o.o.o|
|    . o   .. o. o|
|   . .. S   .  +o|
|    o .+      .+o|
|     +*       o B|
|    .+.+     . BE|
|   .. +.      =|
+----[SHA256]-----+
```

<br/>
<br/>

ν€κ° μ λ§λ€μ΄ μλμ§ νμΈνκΈ° μν΄μ μλ λͺλ Ήμ΄λ‘ νμΈν©λλ€. 

```cs
[h43254@nasa-master ~]$ cd .ssh
[h43254@nasa-master .ssh]$ ls -al
total 8
drwx------. 2 h43254 h43254   38 Aug 20 05:31 .
drwx------. 3 h43254 h43254   74 Aug 20 05:28 ..
-rw-------. 1 h43254 h43254 1679 Aug 20 05:30 id_rsa
-rw-r--r--. 1 h43254 h43254  400 Aug 20 05:30 id_rsa.pub       ## μ μ μμ±.
```

<br/>
<br/>
    
μλ λͺλ Ήμ΄λ₯Ό ν΅ν΄μ κ³΅κ°ν€λ₯Ό λ³΅μ¬νκ³ , λμ¨ λͺλ Ήμ΄λ₯Ό λ³΅μ¬ν©λλ€.  

```cs
[h43254@nasa-master .ssh]$ cat id_rsa.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDMcBYtD/NDrxGOyjPJ9DryBOWzoWlVszqI+jqSAUeAsZ+hwjTtyU60I3vuBn9Ge6HcgKfKUccUyGPickMyTXk2qzeMsa9iN0MOgLZ3GM//aFE5z6yoEvjPJ9KxQg9qRrLhUUWqYtBhyegBt26+YdSWF24ZNutp7CRLtVQpwT/opMkY9XTseaD1kaj1BZF8ls2V5WNCgC504JfPKuKBVKcbuOwBIBv6TyZhhGXRWfKTKpma3/L5Yhc4qNOZGDo913/kkwlMpqPb4JQAEasXELfFPMou9vPOaKEK7CDdcJ/EOkXct7d43vnMRa8360okA+BMP7vJ4c4ElW+T0op5rt h43254@nasa-master
```

<br/>
<br/>

GCPμ ``κ³΅κ°ν€λ₯Ό λ±λ‘``νκΈ° μν΄μ ``Compute Engine - λ©νλ°μ΄ν°- SSH`` μ  μ  κ³΅κ° ν€λ₯Ό μΆκ°ν©λλ€.  

![μ€ν¬λ¦°μ·, 2020-08-20 14-43-15](https://user-images.githubusercontent.com/69498804/90721321-7e2c8a80-e2f3-11ea-914e-8174cfc57d39.png)

λ³΅μ¬ν ν€λ₯Ό λ£μΌλ©΄ μλμΌλ‘ μΌμͺ½μ μμ΄λ(μ¬κΈ°μλ  h43254)μ΄ λνλ©λλ€.  
μμ΄λλ₯Ό νμΈ ν λ€μμ μ μ₯μ λλ¦λλ€. (λ§μ½μ λνλμ§ μμλ€λ©΄ κ³΅κ°ν€ μ½λμ λμ΄μ°κΈ° λλ¬Έμ΄λ νμΈν΄μΌ ν©λλ€)

<br/>
<br/>

λ©νλ°μ΄ν° μ μ νμΈμ μν΄ ``NODE1``μ μ μ ν νμΈν©λλ€.

```cs
[h43254@nasa-node1 ~]$ cat .ssh/authorized_keys 
# Added by Google
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCJjI66r5lO6y/3NVCDA9RZt98DCs1LDLL4rScU+scCDdIJmEHhqvOSU7bmK+a8BezaoqmlQgBWKt0Yj6FqxXyokAs2KBNEJMDA99yTAiyR1omopwsgD7Ce50iUDGs6jWvagPktuUznYyi75hQXoTQKt9FEhjBrpLBxoBZUoBgxa67mkc+rn1icoWoKRlAEt1UQzmT13Spx6ueTMYxC5CZIhPlWpTRpe5SthSvuOShv5KZy+0ByOycrTUrjDfqIY1zPiOJb5Q92UXbmSbsk2ZEMyD5JCC5kvD4poQBToE/mdFcdvfAkta/l9qh2qmI8FMHKkelLXM0m82yM0IRStR google-ssh {"userName":"h43254@gmail.com","expireOn":"2020-08-20T05:49:24+0000"}
# Added by Google
ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBFwFZIw8RvKf9xUVUx+NO3yzwCMFgqTRB2UxxnjqrxImnPWraBpEKdtY4m/VIxn9hL26OyF3fD+NRGMySo7xlnI= google-ssh{"userName":"h43254@gmail.com","expireOn":"2020-08-20T05:49:22+0000"}
# Added by Google         ###### μ μ λ±λ‘ νμΈ!!! ######
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDMcBYtD/NDrxGOyjPJ9DryBOWzoWlVszqI+jqSAUeAsZ+hwjTtyU60I3vuBn9Ge6HcgKfKUccUyGPickMyTXk2qzeMsa9iN0MOgLZ3GM//aFE5z6yoEvjPJ9KxQg9qRrLhUUWqYtBhyegBt26+YdSWF24ZNutp7CRLtVQpwT/opMkY9XTseaD1kaj1BZF8ls2V5WNCgC504JfPKuKBVKcbuOwBIBv6TyZhhGXRWfKTKpma3/L5Yhc4qNOZGDo913/kkwlMpqPb4JQAEasXELfFPMou9vPOaKEK7CDdcJ/EOkXct7d43vnMRa8360okA+BMP7vJ4c4ElW+T0op5rt h43254@nasa-master
[h43254@nasa-node1 ~]$ 
```

<br/>

ν°λ―Έλμμ ``cat .ssh/authorized_keys``λ₯Ό μ³λ³΄λ©΄ λ±λ‘λ ν€λ₯Ό νμΈν  μ μμ΅λλ€.  
μ μ΄μ  λ§μ€ν° <-> λΈλμ ν΅μ μ΄ μνν΄μ‘μΌλ λ³Έκ²©μ μΌλ‘ μ€μΉλ₯Ό μ§ννμ£ .

<br/>

---

## π Kubespray μ€μΉνκΈ°
![μ€ν¬λ¦°μ·, 2020-08-20 14-57-48](https://user-images.githubusercontent.com/69498804/90722288-85549800-e2f5-11ea-8eb9-aefa22c73f46.png)

μ΄μ  ``Kubespray``λ₯Ό μ€μΉν΄λ³΄λλ‘ νκ² μ΅λλ€. Kubesprayλ ``Ansibleμ κΈ°λ°``μΌλ‘ Kubernetesλ₯Ό μ€μΉνλ λκ΅¬ μλλ€.  


<br/>

μ°μ  ``Master`` μΈμ€ν΄μ€μΈ ``nasa-master``μμ ν¨ν€μ§λ₯Ό μλ°μ΄νΈ ν©λλ€.

```cs
[h43254@nasa-master .ssh]$ sudo yum update
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
* base: mirror.navercorp.com
* epel: d2lzkl7pfhq30w.cloudfront.net
* extras: mirror.navercorp.com
* updates: mirror.navercorp.com
Resolving Dependencies
--> Running transaction check
---> Package google-cloud-sdk.x86_64 0:304.0.0-1 will be updated
---> Package google-cloud-sdk.x86_64 0:306.0.0-1 will be an update
--> Finished Dependency Resolution
....
....(μ€λ΅)
Updated:
google-cloud-sdk.x86_64 0:306.0.0-1                                                                                                                                                        
Complete!
```

<br/>
<br/>

κ·Έλ¦¬κ³  ``pip``λ₯Ό μ€μΉν©λλ€.
    
```cs
[h43254@nasa-master /]$ sudo yum -y install python-pip
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
* base: mirror.navercorp.com
* epel: d2lzkl7pfhq30w.cloudfront.net
* extras: mirror.navercorp.com
* updates: mirror.navercorp.com
Resolving Dependencies
--> Running transaction check
...
...(μ€λ΅)
python-ipaddress.noarch 0:1.0.16-2.el7                                                       
python-setuptools.noarch 0:0.9.8-7.el7                                                       

Complete!
```

<br/>
<br/>

ν¨ν€μ§κ° μ μμ μΌλ‘ μ€μΉλμλμ§ νμΈν΄λ΄λλ€  

```cs
[h43254@nasa-master /]$ pip --version
pip 8.1.2 from /usr/lib/python2.7/site-packages (python 2.7)
```

<br/>
<br/>


``git clone`` λͺλ Ήμ΄λ₯Ό ν΅ν΄μ Kubespray Fileμ λ€μ΄λ‘λ ν©λλ€.  

```cs
$ git clone https://github.com/kubernetes-sigs/kubespray.git
```

<br/>
<br/>

λ€μ΄λ‘λ μλ£!!
```cs
[h43254@nasa-master /]$ sudo git clone https://github.com/kubernetes-sigs/kubespray.git
Cloning into 'kubespray'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 46404 (delta 2), reused 2 (delta 2), pack-reused 46401
Receiving objects: 100% (46404/46404), 13.45 MiB | 6.09 MiB/s, done.
Resolving deltas: 100% (25881/25881), done.
```


<br/>
<br/>

λ€μ΄λ°μ μ€μΉ νμΌμ μλμ κ°μ΅λλ€.

```cs
$ cd kubespray/
$ ls -alrt
```

<br/>

```cs
[h43254@nasa-master /]$ cd /kubespray/
[h43254@nasa-master kubespray]$ ls -alrt 
total 184
dr-xr-xr-x. 18 root root   241 Aug 20 06:26 ..
-rw-r--r--.  1 root root   285 Aug 20 06:26 .editorconfig
-rw-r--r--.  1 root root   832 Aug 20 06:26 .ansible-lint
-rw-r--r--.  1 root root     0 Aug 20 06:26 .nojekyll
-rw-r--r--.  1 root root    17 Aug 20 06:26 .markdownlint.yaml
-rw-r--r--.  1 root root     0 Aug 20 06:26 .gitmodules
-rw-r--r--.  1 root root  1980 Aug 20 06:26 .gitlab-ci.yml
drwxr-xr-x.  2 root root   102 Aug 20 06:26 .gitlab-ci
-rw-r--r--.  1 root root  1192 Aug 20 06:26 .gitignore
drwxr-xr-x.  3 root root    60 Aug 20 06:26 .github
-rw-r--r--.  1 root root   289 Aug 20 06:26 .yamllint
-rw-r--r--.  1 root root   531 Aug 20 06:26 SECURITY_CONTACTS
-rw-r--r--.  1 root root  3272 Aug 20 06:26 RELEASE.md
-rw-r--r--.  1 root root 12328 Aug 20 06:26 README.md
-rw-r--r--.  1 root root   283 Aug 20 06:26 OWNERS_ALIASES
-rw-r--r--.  1 root root   121 Aug 20 06:26 OWNERS
-rw-r--r--.  1 root root    85 Aug 20 06:26 Makefile
-rw-r--r--.  1 root root 11342 Aug 20 06:26 LICENSE
-rw-r--r--.  1 root root   969 Aug 20 06:26 Dockerfile
-rw-r--r--.  1 root root  1661 Aug 20 06:26 CONTRIBUTING.md
-rw-r--r--.  1 root root    12 Aug 20 06:26 CNAME
-rw-r--r--.  1 root root 10127 Aug 20 06:26 Vagrantfile
-rw-r--r--.  1 root root    30 Aug 20 06:26 _config.yml
-rw-r--r--.  1 root root   148 Aug 20 06:26 code-of-conduct.md
-rw-r--r--.  1 root root  4526 Aug 20 06:26 cluster.yml
-rw-r--r--.  1 root root   412 Aug 20 06:26 ansible_version.yml
-rw-r--r--.  1 root root   927 Aug 20 06:26 ansible.cfg
drwxr-xr-x. 13 root root   193 Aug 20 06:26 contrib
drwxr-xr-x.  4 root root    33 Aug 20 06:26 inventory
-rw-r--r--.  1 root root  1468 Aug 20 06:26 index.html
-rw-r--r--.  1 root root   484 Aug 20 06:26 facts.yml
drwxr-xr-x.  3 root root   115 Aug 20 06:26 extra_playbooks
drwxr-xr-x.  5 root root  4096 Aug 20 06:26 docs
drwxr-xr-x.  2 root root    21 Aug 20 06:26 library
-rw-r--r--.  1 root root    94 Aug 20 06:26 requirements.txt
-rw-r--r--.  1 root root  1705 Aug 20 06:26 remove-node.yml
-rw-r--r--.  1 root root   612 Aug 20 06:26 recover-control-plane.yml
-rw-r--r--.  1 root root  1172 Aug 20 06:26 mitogen.yml
drwxr-xr-x.  2 root root  4096 Aug 20 06:26 logo
-rw-r--r--.  1 root root   726 Aug 20 06:26 reset.yml
-rw-r--r--.  1 root root  2608 Aug 20 06:26 scale.yml
drwxr-xr-x. 17 root root  4096 Aug 20 06:26 roles
-rw-r--r--.  1 root root   693 Aug 20 06:26 setup.py
-rw-r--r--.  1 root root  1663 Aug 20 06:26 setup.cfg
```

<br/>
<br/>

``requirements.txt``μ νμν ν¨ν€μ§λ€μ΄ λͺμλμ΄ μλλ° μ΄λ₯Ό μ΄μ©ν΄ ν¨ν€μ§ μ€μΉλ₯Ό μ§νν©λλ€.

```cs
[h43254@nasa-master kubespray]$ sudo pip install -r requirements.txt
Collecting ansible==2.9.6 (from -r requirements.txt (line 1))
Downloading https://files.pythonhosted.org/packages/ae/b7/c717363f767f7af33d90af9458d5f1e0960
db9c2393a6c221c2ce97ad1aa/ansible-2.9.6.tar.gz (14.2MB)
    100% |ββββββββββββββββββββββββββββββββ| 14.2MB 75kB/s 
Collecting jinja2==2.11.1 (from -r requirements.txt (line 2))
Downloading https://files.pythonhosted.org/packages/27/24/4f35961e5c669e96f6559760042a55b9bcf
...
...(μ€λ΅)
8e2a0ecf73d21d6b85865da11/MarkupSafe-1.1.1-cp27-cp27mu-manylinux1_x86_64.whl
Collecting ruamel.ordereddict; platform_python_implementation == "CPython" and python_version <
= "2.7" (from ruamel.yaml==0.16.10->-r requirements.txt (line 6))
Downloading https://files.pythonhosted.org/packages/8c/d6/4971e55c60b972160b911368fa4cd756d68
739b6616b0cb57d09d8a6ee18/ruamel.ordereddict-0.4.14-cp27-cp27mu-manylinux1_x86_64.whl (93kB)
    100% |ββββββββββββββββββββββββββββββββ| 102kB 9.2MB/s 
```

<br/>
<br/>

μ΄ ν μ μμ μΌλ‘ ``ansible``μ΄ μ€μΉλ κ²μ νμΈ ν  μ μμ΅λλ€.

```cs
[h43254@nasa-master kubespray]$ ansible --version
/usr/lib64/python2.7/site-packages/cryptography/__init__.py:39: CryptographyDeprecationWarning: Python 2 is no longer supported by the Python core team. Support for it is now deprecated incryptography, and will be removed in a future release.
CryptographyDeprecationWarning,
ansible 2.9.6
config file = /kubespray/ansible.cfg
configured module search path = [u'/kubespray/library']
ansible python module location = /usr/lib/python2.7/site-packages/ansible
executable location = /usr/bin/ansible
python version = 2.7.5 (default, Apr  2 2020, 13:16:51) [GCC 4.8.5 20150623 (Red Hat 4.8.5-39)]
```

<br/>
<br/>

μ΄μ΄μ κΈ°λ³Έ ``inventory/sample``μ ``inventory/mycluster`` λ‘ λ³΅μ¬ν©λλ€.

```cs
[h43254@nasa-master kubespray]$ cp -rfp inventory/sample inventory/cluster
cp: cannot create directory βinventory/myclusterβ: Permission denied
[h43254@nasa-master kubespray]$ sudo cp -rfp inventory/sample inventory/mycluster
[h43254@nasa-master kubespray]$ ls -alrt inventory/mycluster/
total 4
drwxr-xr-x. 4 root root  52 Aug 20 06:26 group_vars
-rw-r--r--. 1 root root 994 Aug 20 06:26 inventory.ini
drwxr-xr-x. 3 root root  45 Aug 20 06:26 .
drwxr-xr-x. 5 root root  50 Aug 20 06:45 ..
```

inventoryλ₯Ό λ³΅μ¬ν  λλ ν λ¦¬ μ΄λ¦μ μλ¬΄μ΄λ¦μ΄λ μ€μ ν΄λ λ©λλ€.

<br/>
<br/>

λλ ν λ¦¬μ ``tree κ΅¬μ‘°``λ₯Ό λ³΄κΈ° μν΄μ tree ν¨ν€μ§λ₯Ό μ€μΉν©λλ€.

```cs
[h43254@nasa-master kubespray]$ 
[h43254@nasa-master kubespray]$ sudo yum -y install tree
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
* base: mirror.navercorp.com
* epel: d2lzkl7pfhq30w.cloudfront.net
* extras: mirror.navercorp.com
* updates: mirror.navercorp.com
Resolving Dependencies
...
...(μ€λ΅)
Transaction test succeeded
Running transaction
Installing : tree-1.6.0-10.el7.x86_64                                                    1/1 
Verifying  : tree-1.6.0-10.el7.x86_64                                                    1/1 
Installed:
tree.x86_64 0:1.6.0-10.el7                                                                   
Complete!
```

<br/>
<br/>

``tree``λ‘ ``group_vars λλ ν λ¦¬``λ₯Ό λ³΄λ©΄ μ€μΉμ νμν ``yml νμΌ``μ΄ μλκ±Έ λ³Ό μ μμ΅λλ€.

```cs
[h43254@nasa-master kubespray]$ tree inventory/cluster/group_vars
inventory/mycluster/group_vars
βββ all
β   βββ all.yml
β   βββ aws.yml
β   βββ azure.yml
β   βββ containerd.yml
β   βββ coreos.yml
β   βββ docker.yml
β   βββ gcp.yml
β   βββ oci.yml
β   βββ openstack.yml
β   βββ vsphere.yml
βββ etcd.yml
βββ k8s-cluster
    βββ addons.yml
    βββ k8s-cluster.yml
    βββ k8s-net-calico.yml
    βββ k8s-net-canal.yml
    βββ k8s-net-cilium.yml
    βββ k8s-net-contiv.yml
    βββ k8s-net-flannel.yml
    βββ k8s-net-kube-router.yml
    βββ k8s-net-macvlan.yml
    βββ k8s-net-weave.yml
2 directories, 21 files
```

<br/>
<br/>

μ€μΉλ₯Ό μν΄ ``inventory.ini``λ₯Ό μμ ν©λλ€.

```cs
vi inventory/mycluster/inventory.ini
```


![μ€ν¬λ¦°μ·, 2020-08-21 10-18-49](https://user-images.githubusercontent.com/69498804/90841465-b7b6d180-e397-11ea-9c8b-a129f1e9b5ce.png)

* ``[all]`` κ·Έλ£Ήμλ μΈμ€ν΄μ€μ λ΄λΆ μμ΄νΌλ₯Ό μλ ₯ν©λλ€  
* ``[kube-master]`` κ·Έλ£Ήμλ λ§μ€ν°λ‘ μ¬μ©ν  μΈμ€ν΄μ€ λͺμ λ£μ΅λλ€.
* ``[etcd]`` κ·Έλ£Ήμλ etcdλ₯Ό μ¬μ©ν  μΈμ€ν΄μ€λ₯Ό μλ ₯ν©λλ€ (νμ)
* ``[kube-node]`` κ·Έλ£Ήμλ λΈλλ‘ μ¬μ© ν  μΈμ€ν΄μ€ λͺμ λ£μ΅λλ€.

<br/>
<br/>

``SSH KEY``λ₯Ό νλ² μ¬μ©ν΄μ λ§μ€ν°μ λκΈ°ν μμΌμ€λλ€

```cs
[h43254@nasa-master ~]$ ssh h43254@nasa-node1
Last login: Thu Aug 20 09:12:40 2020 from nasa-master.asia-northeast3-a.c.nasa1515.internal
[h43254@nasa-node1 ~]$ exit
logout
Connection to nasa-node1 closed.
[h43254@nasa-master ~]$ ssh h43254@nasa-node2
The authenticity of host 'nasa-node2 (10.178.0.5)' can't be established.
ECDSA key fingerprint is SHA256:+Pcsu6s4ImB0kob1TZ41ieS8wz2drCalVIVzBawpRlk.
ECDSA key fingerprint is MD5:26:6a:41:28:c8:5a:77:3e:04:7d:88:1e:14:44:d8:14.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'nasa-node2' (ECDSA) to the list of known hosts.
Last login: Thu Aug 20 09:12:40 2020 from nasa-master.asia-northeast3-a.c.nasa1515.internal
[h43254@nasa-node2 ~]$ exit
logout
Connection to nasa-node2 closed.
[h43254@nasa-master ~]$ ssh h43254@nasa-node3
Last login: Fri Aug 21 00:43:40 2020 from 35.235.240.229
[h43254@nasa-node3 ~]$ exit
logout
Connection to nasa-node3 closed.
[h43254@nasa-master ~]$ 
```

μμ κ°μ΄ ``ssh``λ‘ νλ²μ© μ μλ§ ν΄μ£Όλ©΄ λ©λλ€.


<br/>
<br/>

λͺ¨λ μλ£ λμμΌλ©΄ νμλ‘ νλ ``μμ‘΄μ± λ° μ€μ ``μ μΈνν©λλ€.

```cs
$ ansible-playbook -i kubespray/inventory/cluster/inventory.ini -v --become --become-user=root kubespray/cluster.yml
```

![μ€ν¬λ¦°μ·, 2020-08-21 11-11-23](https://user-images.githubusercontent.com/69498804/90844636-5692fc00-e39f-11ea-9bce-2d1bea280a1c.png)
``skipped``μ΄ λ§κΈ΄νμ§λ§ μ¬λ¬ νμ€νΈλ₯Ό νλ©° μ€μΉλ₯Ό ν΄μ μκ΄μμ΅λλ€

<br/>
<br/>

κ°νΉκ°λ€ λ€μκ³Ό κ°μ μλ¬κ° λ°μν  κ²½μ°μλ λλ ν λ¦¬λ₯Ό μλμΌλ‘ μμ±ν΄μ£Όλ©΄ λ©λλ€

![μ€ν¬λ¦°μ·, 2020-08-21 10-42-48](https://user-images.githubusercontent.com/69498804/90846348-e71f0b80-e3a2-11ea-91c9-ffecd03462cb.png)

```cs
sudo mkdir credentials
```

<br/>
<br/>

μ€μΉκ° μλ£λκ³  ``root κΆν``μΌλ‘ ``λΈλ μ λ³΄``λ₯Ό μ μμ μΌλ‘ λ°μμ΄μ νμΈν©λλ€  

![μ€ν¬λ¦°μ·, 2020-08-21 11-36-30](https://user-images.githubusercontent.com/69498804/90846161-91e2fa00-e3a2-11ea-86e4-cbaf96a90258.png)

---


```toc
```
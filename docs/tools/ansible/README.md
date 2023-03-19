---
sidebar: auto
pageClass: custom-code-auto-break-line
---


# Ansible 使用指南


[[toc]]

该使用指南只作为快速参考手册，更多详细信息请参考
[官方文档](https://docs.ansible.com/ansible/2.9/index.html)

## 1. 安装

``` shell
yum install epel-release
yum install ansible
```

## 2. 配置

默认配置主目录为

/etc/ansible

基础配置文件参考如下

### ansible.cfg

``` shell
#/etc/ansible/ansible.cfg
```

### hosts
``` ini
#/etc/ansible/hosts

app01
app02
app03
app04
app05
db01
db02
db03
ng01
ng02

[apps]
app[01:05]

[dbs]
db[01:03]

[ngs]
ng[01:02]

```







## 3. 使用

``` shell
ansible <主机选择表达式> -m <模块名称> -a "<模块参数>"
```



### 3.1 主机选择


更详细的信息请参考[官方文档](https://docs.ansible.com/ansible/2.9/user_guide/intro_patterns.html)


通用主机表达式

|  描述  |       表达式        | 目标主机|
|--------|--------------------|-------------------------|
| 全部主机| all (或者 *)       |                         |
| 某台主机| host1             |                          |
| 多台主机| host1:host2(或者host1,host2)|               |
| 某个小组| apps              |                         |
| 多个小组| apps:dbs          |  apps和dbs组的全部主机   |
| 例外小组| apps:!ngs         |  apps组里面不在dbs的主机   |
| 交集小组| apps:&ngs         |  同时在apps组和dbs组的主机 |


也可以将其组合起来使用
``` ini
webservers:dbservers:&staging:!phoenix
```

也可以使用通配符进行匹配
``` ini
192.0.\*
\*.example.com
\*.com
app*
db*
```

	
使用示例

+ 选择全部服务器
  
``` shell
ansible all -m ping
```
+ 选择app01服务器
  
``` shell
ansible app01 -m ping
```
+ 选择所有应用服务器
``` shell
ansible apps -m ping
#或者
ansible app* -m ping
```
+ 选择所有应用服务器和数据库服务器
``` shell
ansible apps,dbs -m ping
```





### 3.2 模块使用

使用ansible-doc命令可以查看模块手册
如想查看shell模块的使用方法可允许如下命令
``` shell
ansible-doc shell
```
按q退出手册

常用模块使用示例如下：

### 3.2.1  ping

ping 测试
``` shell
ansible localhost -m ping
```

### 3.2.2  shell

+ 查看主机情况
``` shell
ansible localhost -m shell -a "hostnamectl"
```
+ 查看cpu情况
``` shell
ansible localhost -m shell -a "lscpu"
```
+ 查看内存情况
``` shell
ansible localhost -m shell -a "free -g"
```
+ 查看磁盘情况
``` shell
ansible localhost -m shell -a "df -Th"
```
+ 查看网络情况
``` shell
ansible localhost -m shell -a "ip addr"
#或者
ansible localhost -m shell -a "ifconfig"
```
+ 查看tcp端口情况
``` shell
ansible localhost -m shell -a "netstat -nltp"
```
+ 查看udp端口情况
``` shell
ansible localhost -m shell -a "netstat -nlup"
```
+ 查看Java进程情况
``` shell
ansible localhost -m shell -a "jps -l"
```
+ 查看nginx进程情况
``` shell
ansible localhost -m shell -a "systemctl status nginx"
#或者
ansible localhost -m shell -a "ps -ef|grep nginx"
```
+ 查看mysql进程情况
``` shell
ansible localhost -m shell -a "systemctl status mysqld"
```


+ 查看/data/pkgs/目录里面的文件
``` shell
ansible localhost -m shell -a "ls -al chdir=/data/pkgs/"
```



### 3.2.3 file


+ 创建目录
``` shell
ansible localhost -m file -a "path=/data/pkgs/testdir state=directory mode=0755"
```

+ 修改目录权限和用户组
``` shell
ansible localhost -m file -a "path=/data/pkgs/testdir state=directory mode=0644 owner=root group=root recurse=yes"
```
+ 创建文件
``` shell
ansible localhost -m file -a "path=/data/pkgs/testdir/test.txt state=touch"
```
+ 修改文件权限和用户组
``` shell
ansible localhost -m file -a "path=/data/pkgs/testdir/test.txt owner=root group=root mode=0644 "
```
+ 创建链接文件
``` shell
ansible localhost -m file -a "src=/data/pkgs/testdir/test.txt dest=/data/pkgs/testdir/test.link  state=link"
```
+ 删除文件
``` shell
ansible localhost -m file -a "path=/data/pkgs/testdir/test.txt state=absent"
```
+ 删除目录
``` shell
ansible localhost -m file -a "path=/data/pkgs/testdir state=absent"
```



### 3.2.4 copy

+ 复制本地文件到主机
``` shell
ansible localhost -m copy -a "src=/etc/resolv.conf dest=/data/pkgs/test.txt"
```
+ 复制本地文件到主机并备份目标文件
``` shell
ansible localhost -m copy -a "src=/etc/resolv.conf dest=/data/pkgs/test.txt backup=yes"
```

+ 复制本地文件到主机并设置权限和用户组
``` shell
ansible localhost -m copy -a "src=/etc/resolv.conf dest=/data/pkgs/test.txt owner=root group=root mode=0644"
```


### 3.2.5 synchronize

+ 同步本机文件夹到远程主机
``` shell
ansible localhost -m synchronize -a "src=/data/pkgs/testdir/ dest=/data/pkgs/testdir1/"
```
+ 同步远程主机文件夹到本机
``` shell
ansible localhost -m synchronize -a "src=/data/pkgs/testdir/ dest=/data/pkgs/testdir3/ mode=pull"
```


### 3.2.6  script

::: tip 先创建本地测试脚本文件
``` shell
echo "ps -ef |grep ssh" > /data/pkgs/localscript.sh
echo "print('hello python')" > /data/pkgs/localscript.py
```
:::

+ 在目标主机上执行本机shell脚本

``` shell
ansible localhost -m script -a "/data/pkgs/localscript.sh --some-argument 1234"
```
+ 在目标主机上执行本机python脚本
``` shell
ansible localhost -m script -a "/data/pkgs/localscript.py executable=python3"
```

### 3.2.7 service

+ 启动服务
``` shell
ansible localhost -m service -a "name=httpd state=started"
```
+ 停止服务
``` shell
ansible localhost -m service -a "name=httpd state=stopped"
```
+ 重启服务
``` shell
ansible localhost -m service -a "name=httpd state=restarted"
```
+ 重新加载服务
``` shell
ansible localhost -m service -a "name=httpd state=reloaded"
```
+ 设置为开机启动
``` shell
ansible localhost -m service -a "name=httpd enabled=yes"
```
+ 取消开机启动
``` shell
ansible localhost -m service -a "name=httpd enabled=no"
```


### 3.2.8  yum


+ 使用yum安装软件
``` shell
ansible localhost -m yum -a "name=sl"
```

+ 使用yum安装本地rpm包
``` shell
ansible localhost -m yum -a "name=/data/pkgs/sl-5.02-1.el7.x86_64.rpm"
```

+ 使用yum安装在线rpm包
``` shell
ansible localhost -m yum -a "name=http://nginx.org/packages/centos/8/x86_64/RPMS/nginx-1.22.1-1.el8.ngx.x86_64.rpm"
```

+ 仅下载安装包
``` shell

ansible localhost -m yum -a "name=sl state=latest download_only=true"

ansible localhost -m yum -a "name=http://nginx.org/packages/centos/8/x86_64/RPMS/nginx-1.22.1-1.el8.ngx.x86_64.rpm download_only=true"
```

+ 指定包安装器

``` shell
#使用yum安装
ansible localhost -m yum -a "name=sl use_backend=yum"

#使用dnf安装
ansible localhost -m yum -a "name=sl use_backend=dnf"
```

+ 使用yum卸载软件
``` shell
ansible localhost -m yum -a "name=sl state=absent"
```
.
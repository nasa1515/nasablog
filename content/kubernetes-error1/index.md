---
emoji: 🤦‍♂️
title: "[Error Report] - length is not divisibleby 2"
date: "2021-06-29 00:07:12"
author: nasa1515
tags: DevOps Error-Report
categories: DevOps Error-Report
---

## ✔ 발생 에러

상황 : kubespray로 ``ansible-playbook`` 명령어 구동 중 "assertion: groups.etcd | length is not divisibleby 2" 에러 발생"


<br/>

* kubespray로 ``ansible-playbook`` 명령어 진행 시 ``"assertion: groups.etcd | length is not divisibleby 2"`` 에러가 발생할 수 있습니다.

    ![스크린샷, 2020-08-21 10-10-28](https://user-images.githubusercontent.com/69498804/90841029-8db0df80-e396-11ea-9580-2521ddd039ff.png)

    캡쳐 이미지를 보면 특정노드는 성공했는데 특정노드는 실패했습니다


<br/>

---

## ✌ 원인

* 해당 에러는 아래 이미지와 같이 ``inventory.ini`` 파일에 지정한 ``etcd``가 ``짝수``인 경우에 발생합니다.

    ![스크린샷, 2020-08-21 10-12-18](https://user-images.githubusercontent.com/69498804/90841122-d10b4e00-e396-11ea-9848-425e4215a799.png)


<br/>

* kubespray/roles/kubernetes/preinstall/tasks/0020-verify-settings.yml 코드 확인


    ![스크린샷, 2020-08-21 10-14-45](https://user-images.githubusercontent.com/69498804/90841237-25aec900-e397-11ea-9519-93ec3550d18a.png)

    해당 코드가 ``etcd``의 갯수가 짝수일 경우에 에러를 표출합니다

<br/>

---


## 👍해결

* 문제해결하기 위해선 ``etcd를 홀수``로 설정하거나 ``-e ignore_assert_errors=yes`` 옵션을 추가하여 해결 할 수 있습니다.

    ```
    # ex
    ansible-playbook -i kubespray/inventory/cluster/inventory.ini \
    -v --become --become-user=root kubespray/cluster.yml -e ignore_assert_errors=yes
    ```

<br/>

* 저같은 경우 테스트용이라서 특정 노드를 ``etcd``로 하나 추가해 해결 후 설치까지 확인 했습니다.

<br/>

* ``설정파일``
 ![스크린샷, 2020-08-21 10-18-49](https://user-images.githubusercontent.com/69498804/90841465-b7b6d180-e397-11ea-9c8b-a129f1e9b5ce.png)


<br/>

* 정상적으로 설치가 되었습니다.

    ![스크린샷, 2020-08-21 11-11-23](https://user-images.githubusercontent.com/69498804/90844636-5692fc00-e39f-11ea-9bce-2d1bea280a1c.png)
    ``skipped``이 많긴하지만 여러 테스트를 하며 설치를 해서 상관없습니다


<br/>

*   ``root 권한``으로 ``노드 정보``를 정상적으로 받아옴을 확인합니다

    ![스크린샷, 2020-08-21 11-36-30](https://user-images.githubusercontent.com/69498804/90846161-91e2fa00-e3a2-11ea-86e4-cbaf96a90258.png)


<br/>

---

## 👏권장

### etcd는 홀수로 사용하는것을 권장 합니다.

짝수로 사용할 경우 ``스플릿 브레인(Split Brain)`` 현상이 발생하여 네트워크 단절로 인한 통신 장애 등 문제가 발생 할 여지가 존재합니다.  
이러한 이유로 실제 서비스 환경에서는 etcd 클러스터를 홀수로 사용하는 것이 좋습니다.

<br/>

* ``스플릿 브레인(Split Brain)``

    일반적으로 클러스터로 구성된 두 시스템 그룹간 네트워크의 일시적 동시 단절현상이 발생 시 나타나는 현상.

    클러스터 상의 모든 노드들은 노드 각자가 자신을 ``primary``라고 인식하게 되는 상황을 말합니다.  
    즉, 어느 특정 리소스에 대한 두 시스템 그룹 간의 모든 네트워크 연결이 동시에 실패하면 네트워크 파티션이 발생합니다.  
이러한 상태가 발생하면 파티션 양쪽의 시스템이 각각 반대쪽에서 응용 프로그램을 재시작하여  
``중복 서비스 또는 "스플릿 브레인(split-brain)"``을 유발합니다.  

    ``스플릿 브레인(split-brain)``은 클러스터로 구성된 독립적인 두 시스템이  
``특정 리소스(일반적으로 파일 시스템 또는 볼륨)``에 대한 ``배타적 액세스`` 권한이 있다고 가정할 경우에 발생합니다.  

    네트워크 파티션으로 인해 발생하는 가장 심각한 문제는 ``공유 디스크의 데이터``에 ``영향``을 준다는 점입니다.

```toc
```
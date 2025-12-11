---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ 클라우드

## Cloud는 무엇입니까?

가장 간단한 정의는 로컬 서버가 아닙니다. 이것은 매우 넓고 많은 다른 설정을 의미 할 수 있습니다. 예를 들어, 데이터 센터의 전용 물리적 서버가 될 수 있습니다. Virtual Private Server, 공유 서버, 서버리스 또는 다른 것.

### 왜 클라우드

클라우드로 이동하려는 많은 이유가 있습니다. 가장 중요한 것은 물리적 하드웨어를 구입과 비교하여 compute/storage 요구에 적합한 유연성입니다.

datacenter/server 방을 유지해야 합니다. 그것은 또한 당신의 현재 필요에 따라 계산 리소스를 스케일링 할 수 있습니다. 클라우드와 같은 많은 다른 것들을 의미 할 수 있습니다, 당신의 리소스를 확장 할 수 있습니다. 그것은 더 많은 것을 위해 지불을 의미할 수 있었습니다 (또는 더 적은) serverless 자원. 공유 서버에서 개인 서버로 이동할 수 있습니다. 더 큰 전용 물리적 서버로 업그레이드 할 수 있습니다.

## 수 있습니다. ERDDAP™ 구름에서 실행?

예.

 ERDDAP™ 로컬 또는 클라우드 환경에서 실행할 수 있는 Tomcat 내에서 실행하도록 설계되었습니다. Docker에서 실행하는 커뮤니티 지원이 있습니다. [- 한국어 Docker 지원 곧](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) ·

그는 말했다. ERDDAP™ 전용 서버가 norm되었을 때 시간에 설계되었습니다. 서버가 없어서 서버가 없는 경우 매우 어렵습니다.

### 수 있습니다. ERDDAP™ 규모?

관련 상품 ERDDAP™ Serverless 리소스를 사용하는 것보다 더 복잡합니다. 우리는 몇 가지 훌륭한 문서가 있습니다 [확장 방법 ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) · 확장하기 쉬운 ERDDAP™ 우리가 관심이있는 무언가입니다.

### Autoscaling은 무엇입니까?

 ERDDAP™ datasets를 최신 상태로 유지하고, datasets, 캐싱 데이터, 사용자 요청을 처리하는 캐싱 데이터에 대한 변경의 가입자를 통지하고 더 많은 것을 포함하여 많은 것을하고 있습니다. 충분히 큰 ERDDAP™ 서버 같은 [코스트워치](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , 이것은 연속적으로 무언가를하는 것을 의미합니다. Continual 사용법은 실제로 serverless 선택권을 위한 극단적으로 비싼 상황입니다 (서버가 없게 할 때 큰 프리미엄을 지불하므로 주요 장점은 때때로 전화를 만들 때입니다.) · 또한, 모두 이동하려고 ERDDAP™ Serverless 버전의 다양한 기능은 관리자에 필요한 훨씬 더 복잡한 설정으로 종료됩니다.

### 수 있습니다. ERDDAP™ Cloud Storage 사용?

예.

 ERDDAP™ 클라우드 스토리지 (AWS S3를 포함하여) 이 지원 개선 (예를 들면 non-AWS S3) 높은 우선 순위 ERDDAP™ 개발 로드맵. ERDDAP™ 또한 많은 기존 온라인 서비스에서 데이터를 끌어낼 수 있습니다. 더 많은 정보를 원하시면, [Dataset 유형 문서](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) ·
